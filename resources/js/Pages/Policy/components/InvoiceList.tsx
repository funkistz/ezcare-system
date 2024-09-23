import { AppTable, AppPrice, UpdateButtonModal, ConfirmButton } from '@/Components'
import { router, usePage } from '@inertiajs/react';
import moment from 'moment';
import React, { useState } from 'react'
import { Alert, Badge, Box, Button, Card, Divider, Flex, Group, Modal, Paper, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { IconFileInvoice, IconInfoCircle, IconInfoCircleFilled, IconRotate } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import InvoicePreview from './InvoicePreview';
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import InvoiceForm from './InvoiceForm';
import { PieChart } from '@mantine/charts';
import UpdateSplitPriceForm from './UpdateSplitPriceForm';
import PayeeForm from './PayeeForm';
import BalanceStatusPayee from './BalanceStatusPayee';

export default function InvoiceList({ policy }: { policy: any }) {

    const { settings }: any = usePage().props;
    const [opened, { open, close }] = useDisclosure(false);
    const [openEditPrice, setOpenEditPrice] = useState(false)

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            value.policy = policy;
            values.push({
                'type': <Text tt='uppercase' fz={14}>{value.invoice_type}</Text>,
                'invoice no': <Group><Text tt='uppercase' fz={14}>{value.invoice_no}</Text>{value.is_main && <Badge color='green'>main</Badge>}</Group>,
                'date': moment(value.date).format('D/MM/YYYY'),
                'subtotal': <Text tt='uppercase' fz={14}><AppPrice price={value.subtotal} /></Text>,
                'tax': <Text tt='uppercase' fz={14}><AppPrice price={value.tax} /></Text>,
                'total': <Text tt='uppercase' fz={14}><AppPrice price={value.total} /></Text>,
                'action': <Group>
                    <UpdateButtonModal title={'Edit User Credentials'} children={<InvoiceForm invoice={value} />} />
                    <InvoicePreview data={value} name='xxxx' />
                </Group>,
            });
        })
        return values;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    const onRegenerate = (e: any) => {

        router.put(route('policy.regenerate_invoice', policy.id), { invoice_date: null }, {
            onSuccess: () => {
                // setModalInvoice(false);
            },
        });
    }

    return (
        <>
            <Stack>
                <Stack gap={'md'}>
                    <Alert variant='light' color="red" radius="lg" title="Warning" >
                        Payee will be reset after every action that will regenerating invoice to 100% dealer.
                    </Alert>
                    <Group>
                        <Text fw='bolder'>Payee:</Text>
                        <UpdateButtonModal label='Edit Payee' title={'Edit Payee'} children={<PayeeForm policy={policy} />} />
                    </Group>
                    <Stack w={'40%'} gap={'xs'}>
                        {policy.payees && policy.payees.map((payee: any) => {
                            return <Card withBorder p='md'>
                                <Group align='center'>
                                    <Text w={125} fz={18} fw='bold'>{payee.type_name}</Text>
                                </Group>
                                <Group align='center' mt={10}>
                                    <Text w={125}>Amount:</Text>
                                    <Badge bg='orange'>
                                        <AppPrice price={payee.total_amount} />
                                    </Badge>
                                </Group>
                                <Group align='center' mt={5}>
                                    <Text w={120}>Payment Status:</Text>
                                    <BalanceStatusPayee status={payee.status_code} amount={payee.total_unpaid} currency={settings.currency_symbol?.value} />
                                </Group>
                            </Card>
                        })}
                    </Stack>

                </Stack>

                <Group justify='end'>
                    <ConfirmButton color='pink' label='Regenerate Invoice' title={'Regenerate Invoice'} leftSection={<IconRotate size={16} />} onConfirm={onRegenerate} />
                </Group>
                {/* <PDFViewer key={Date.now()} width={1000} height={1000}>
                <PolicyInvoicePDF data={{ ...policy.invoices[1], policy: policy }} title={Date.now()} key={Date.now()} />
            </PDFViewer> */}
                <AppTable headerOptions={headerOptions} data={tableData(policy.invoices)} />
            </Stack>
        </>
    )
}
