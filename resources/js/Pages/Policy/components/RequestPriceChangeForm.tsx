import { AppInput, AppPrice, AppTextArea } from '@/Components'
import { useForm } from '@inertiajs/react';
import { Button, Group, SegmentedControl, Stack, Text } from '@mantine/core'
import React from 'react'

export default function RequestPriceChangeForm({ policy, closeModal }: any) {

    const types = [
        { 'label': 'Dealer', 'value': 'dealer' },
        { 'label': 'Customer', 'value': 'customer' },
    ]

    const { data, setData, post, put, reset, errors } = useForm({
        policy_id: policy.id,
        amount: 0,
        remarks: '',
        field: 'warranty_price',
        code: 'warranty_price_change',
    });

    // 'policy_id',
    //     'field',
    //     'amount',
    //     'value',
    //     'remarks',
    //     'is_active',
    //     'created_by',

    console.log('active_invoice', policy.active_invoice)

    const onSubmit = (e: any) => {
        e.preventDefault();

        post(route('policyOverwrite.store'), {
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
                    <AppInput required type='Number' label='Warranty Plan Price' id='amount' value={data.amount} onChange={(e: any) => setData('amount', e.target.value)} />
                    <AppTextArea required placeholder='Remarks' id='remarks' value={data.remarks} onChange={(e: any) => setData('remarks', e.target.value)} />
                    <Group justify='flex-end' mt={'md'}>
                        <Button type='submit' color='green'>Submit</Button>
                    </Group>
                </Stack>
            </form>
        </>
    )
}
