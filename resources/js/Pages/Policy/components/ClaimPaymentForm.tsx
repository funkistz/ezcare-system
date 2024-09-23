import { AppDatePicker, AppInput, AppPrice, AppSelect, AppTextArea } from '@/Components'
import { useForm, usePage } from '@inertiajs/react';
import { Button, Group, SegmentedControl, Stack, Text } from '@mantine/core'
import React from 'react'

export default function ClaimPaymentForm({ claim, closeModal }: any) {

    const { settings, claim_items, claim_items_select, vehicle_models, claim_denied_statuses }: any = usePage().props;

    const { data, setData, post, put, reset, errors } = useForm({
        date: 'denied',
        reference_no: '',
        amount: '',
        remarks: '',
        claim_id: claim.id,
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        post(route('claim-payment.store'), {
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
                    <AppInput required type='number' label='Payment Amount' value={data.amount} onChange={(e: any) => setData('amount', e)} />
                    <AppDatePicker required label='Payment Date' values={data} onChange={(e: any) => setData('date', e)} />
                    <AppInput required label='Payment Reference No' value={data.reference_no} onChange={(e: any) => setData('reference_no', e.target.value)} />
                    <AppTextArea label='Remarks' value={data.remarks} onChange={(e: any) => setData('remarks', e.target.value)} />

                    <Group justify='flex-end' mt={'md'}>
                        <Button type='submit' color='green'>Submit</Button>
                    </Group>
                </Stack>
            </form>
        </>
    )
}
