import { Badge, Button, Group, Modal, Stack } from '@mantine/core'
import { IconBolt, IconBoltOff, IconCurrencyDollar, IconPower, IconReceipt } from '@tabler/icons-react'
import React, { useState } from 'react'
import PolicyStatusBadge from './PolicyStatusBadge'
import { router, useForm, usePage } from '@inertiajs/react'
import { AppDatePicker, AppDateTimePicker, AppTextArea, ConfirmButton } from '@/Components'
import PaymentForm from './PaymentForm';
import BalanceStatus from './BalanceStatus'
import BalanceStatusPayee from './BalanceStatusPayee'
import moment from 'moment'

export default function PolicyActionBar({ policy }: { policy: any }) {

    const { timezone, settings }: any = usePage().props;

    const [modalActivate, setModalActivate] = useState(false);
    const [activateRemark, setActivateRemark] = useState('');
    const [modalDeactivate, setModalDeactivate] = useState(false);
    const [deactivateRemark, setDeactivateRemark] = useState('');
    const [modalVoid, setModalVoid] = useState(false);
    const [voidRemark, setVoidRemark] = useState('');

    const [modalInvoice, setModalInvoice] = useState(false);
    const [invoiceDate, setInvoiceDate] = useState(new Date(policy.activated_at));
    const [readOnly, setReadOnly] = useState(true);

    const [modalPayment, setModalPayment] = useState(false);

    const activatePolicy = () => {
        router.put(route('policy.activate', policy.id), { remarks: activateRemark }, {
            onSuccess: () => {
                setModalActivate(false);
            },
        });
    }
    const deactivatePolicy = () => {
        router.put(route('policy.deactivate', policy.id), { remarks: deactivateRemark }, {
            onSuccess: () => {
                setModalDeactivate(false);
            },
        });
    }
    const voidPolicy = () => {
        router.put(route('policy.void', policy.id), { remarks: voidRemark }, {
            onSuccess: () => {
                setModalVoid(false);
            },
        });
    }

    const [onGenerated, setOnGenerated] = useState(false);

    const generatePolicy = (e: any) => {

        e.preventDefault();
        setOnGenerated(true);

        router.put(route('policy.generate_invoice', policy.id), { invoice_date: invoiceDate }, {
            onSuccess: () => {
                setModalInvoice(false);
            },
        });
    }

    const resetDate = () => {
        setReadOnly(true);
        setInvoiceDate(new Date(policy.activated_at));
    }

    return (
        <>
            <Modal opened={modalInvoice} onClose={() => setModalInvoice(false)} title="Generate Invoice">
                <Stack>
                    <form onSubmit={generatePolicy}>
                        <Group>
                            <AppDatePicker required label='Invoice Date' value={invoiceDate} onChange={(e: any) => setInvoiceDate(e)} readOnly={readOnly} />
                            {readOnly && <Button size='sm' color='black' mt={30} onClick={() => setReadOnly(false)}>Change Date</Button>}
                            {!readOnly && <Button size='sm' color='orange' mt={30} onClick={() => resetDate()}>Reset</Button>}
                        </Group>
                        <Group justify='flex-end' mt={'sm'}>
                            <Button disabled={onGenerated} type='submit' size='xs' color='green'>Submit</Button>
                        </Group>
                    </form>
                </Stack>
            </Modal>
            <Modal opened={modalPayment} onClose={() => setModalPayment(false)} title="Add Payment">
                <PaymentForm policy={policy} closeModal={() => setModalPayment(false)} />
            </Modal>

            <Modal opened={modalActivate} onClose={() => setModalActivate(false)} title="Activate Policy">
                <Stack>
                    <AppTextArea label='Remarks' value={activateRemark} onChange={(e: any) => setActivateRemark(e.target.value)} />
                    <Group justify='flex-end'>
                        <ConfirmButton onConfirm={activatePolicy} />
                    </Group>
                </Stack>
            </Modal>
            <Modal opened={modalDeactivate} onClose={() => setModalDeactivate(false)} title="Deactivate Policy">
                <Stack>
                    <AppTextArea label='Remarks' value={deactivateRemark} onChange={(e: any) => setDeactivateRemark(e.target.value)} />
                    <Group justify='flex-end'>
                        <ConfirmButton onConfirm={deactivatePolicy} />
                    </Group>
                </Stack>
            </Modal>
            <Modal opened={modalVoid} onClose={() => setModalVoid(false)} title="Void Policy">
                <Stack>
                    <AppTextArea label='Remarks' value={voidRemark} onChange={(e: any) => setVoidRemark(e.target.value)} />
                    <Group justify='flex-end'>
                        <ConfirmButton onConfirm={voidPolicy} />
                    </Group>
                </Stack>
            </Modal>

            <Group justify='space-between' align='start'>
                <Group justify='flex-end' align='start' mb='md' gap={5}>
                    <Stack>
                        <Group>
                            <Group gap={8}>Status: <PolicyStatusBadge status={policy.status_code} /></Group>

                            <Group gap={8}>
                                Payment Status:
                                <PolicyStatusBadge status={policy.payment_status_code} />
                            </Group>
                        </Group>

                        <Group>
                            {policy.payees.map((payee: any, index: any) => {
                                return <BalanceStatusPayee key={index} payee_name={payee.type_name} status={payee.status_code} amount={payee.total_unpaid} currency={settings.currency_symbol?.value} />
                            })}
                        </Group>
                    </Stack>

                </Group>
                <Group justify='flex-end' align='start' mb='md'>

                    {['draft', 'deactivated'].includes(policy.status_code) && <Button size='xs' color='green' leftSection={<IconBolt size={16} />} onClick={() => setModalActivate(true)}>Activate</Button>}
                    {policy.status_code === 'activated' && <Button size='xs' color='orange' leftSection={<IconBoltOff size={16} />} onClick={() => setModalDeactivate(true)}>Deactivate</Button>}
                    {policy.status_code === 'activated' && <Button size='xs' color='red' leftSection={<IconPower size={16} />} onClick={() => setModalVoid(true)}>Void</Button>}
                    {policy.status_code === 'activated' && policy.active_invoice && <Button size='xs' color='lime' leftSection={<IconCurrencyDollar size={16} />} onClick={() => setModalPayment(true)}>Add Payment</Button>}
                    {policy.status_code === 'activated' && !policy.active_invoice && <Button size='xs' color='lime.8' leftSection={<IconReceipt size={16} />} onClick={() => setModalInvoice(true)}>Generate Invoice</Button>}
                </Group>
            </Group>
        </>
    )
}
