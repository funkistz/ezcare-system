import { AppTable, AppPrice, AppDate, HasPermission, DeleteButton, UpdateButtonModal } from '@/Components'
import { router, usePage } from '@inertiajs/react';
import moment from 'moment';
import React from 'react'
import { Button, Group, Stack, Text } from '@mantine/core';
import GoodsReceipt from './GoodsReceipt';
import PaymentForm from './PaymentForm';

export default function PaymentList({ policy }: { policy: any }) {

    const { settings }: any = usePage().props;

    console.log('policy active_invoice', policy.active_invoice)

    const onDelete = (id: any) => {
        router.delete(route('payment.destroy', id));
    }

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'type': <Text tt='capitalize' fz={14}>{value.type} from {value.from ? value.from : ' -'}</Text>,
                'amount': <Text tt='uppercase' fz={14}><AppPrice price={value.amount} /></Text>,
                'reference': value.reference,
                // 'balance': <Text tt='uppercase' fz={14}><AppPrice price={value.balance} /></Text>,
                'payment date': <AppDate format='D/MM/YYYY h:mm a'>{value.date}</AppDate>,
                'reason': value.reason,
                'remarks': value.remarks,
                'created': <Stack gap={0}>
                    <Group gap={5}>
                        <Text fz={14}>At: </Text>
                        <AppDate format='D/MM/YYYY h:mm a'>{value.created_at}</AppDate>
                    </Group>
                    <Text fz={14} tt='capitalize'>By: {value.created_by_name}</Text>
                </Stack>,
                'action': <Group justify='end'>
                    {policy.invoices.map((invoice: any) => {
                        return <GoodsReceipt data={invoice} label={'Goods Receipt ' + invoice.invoice_type} amount={value.amount} date={value.date} />;
                    })}
                    <HasPermission permission='policy.edit' author={policy.created_by}>
                        <UpdateButtonModal title={'Edit Payment'} children={
                            <PaymentForm policy={policy} payment={value} />
                        } />
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                    </HasPermission>
                </Group>
            });
        })
        return values;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    return (
        <>
            {/* <Group justify='flex-end' mb={20}>
                {policy.invoices.map((invoice: any) => {
                    return <GoodsReceipt data={invoice} name='xxxx' label={'Goods Receipt ' + invoice.invoice_type} />;
                })}
            </Group> */}
            <AppTable headerOptions={headerOptions} data={tableData(policy.payments)} />
        </>
    )
}
