import { AppInput, AppPrice, AppSelect, AppTextArea } from '@/Components'
import { useForm, usePage } from '@inertiajs/react';
import { Button, Group, SegmentedControl, Stack, Text } from '@mantine/core'
import React from 'react'

export default function ClaimDeniedForm({ claim, closeModal }: any) {

    const { settings, claim_items, claim_items_select, vehicle_models, claim_denied_statuses }: any = usePage().props;

    const { data, setData, post, put, reset, errors } = useForm({
        status_code: 'denied',
        reason_code: '',
        remarks: '',
        claim_id: claim.id,
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        put(route('claim.update_status', claim.id), {
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

                    <AppSelect label='Reasons' required data={claim_denied_statuses} value={data.reason_code} onChange={(e: any) => { setData('reason_code', e) }} searchable />
                    <AppTextArea label='Remarks' value={data.remarks} onChange={(e: any) => setData('remarks', e.target.value)} />

                    <Group justify='flex-end' mt={'md'}>
                        <Button type='submit' color='green'>Submit</Button>
                    </Group>
                </Stack>
            </form>
        </>
    )
}
