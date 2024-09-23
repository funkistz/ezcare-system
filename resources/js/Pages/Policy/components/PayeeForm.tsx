import { AppInput, AppPrice } from '@/Components'
import { useForm } from '@inertiajs/react';
import { Button, Group, SegmentedControl, Stack, Text } from '@mantine/core'
import React from 'react'

export default function PayeeForm({ policy, closeModal }: any) {

    const types = [
        { 'label': 'Dealer', 'value': 'dealer' },
        { 'label': 'Customer', 'value': 'customer' },
    ]

    const { data, setData, post, put, reset, errors } = useForm({
        payee_type: 'dealer',
        amount: 0,
        policy_id: policy.id,
        invoice_id: policy.active_invoice.id,
    });

    console.log('active_invoice', policy.active_invoice)

    const onSubmit = (e: any) => {
        e.preventDefault();

        post(route('invoicePayee.store'), {
            data,
            onSuccess: () => {
                closeModal && closeModal()
            },
        });

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <Stack gap={'xs'}>
                    <Stack gap={0}>
                        <Text>Invoice Amount:</Text>
                        <Text tt='uppercase' fz={24} fw='bolder'><AppPrice price={policy.active_invoice.total} /></Text>
                    </Stack>
                    <SegmentedControl data={types} color='primary' value={data.payee_type} onChange={(e: any) => setData('payee_type', e)} />
                    <AppInput required type='Number' label='Amount' id='amount' value={data.amount} onChange={(e: any) => setData('amount', e.target.value)} />

                    <Group justify='flex-end' mt={'md'}>
                        <Button type='submit' color='green'>Submit</Button>
                    </Group>
                </Stack>
            </form>
        </>
    )
}
