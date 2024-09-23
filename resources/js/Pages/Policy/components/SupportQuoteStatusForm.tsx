import { AppInput, AppSelect } from '@/Components'
import { useForm, usePage } from '@inertiajs/react';
import { Button, Group, Stack } from '@mantine/core'
import React, { useState } from 'react'

export default function SupportQuoteStatusForm({ values, closeModal }: any) {

    const { coverageSelect }: any = usePage().props;
    const [loading, setLoading] = useState(false)

    const { data, setData, post, put, reset, errors } = useForm({
        status: values ? values.status.status : '',
        support_quote_id: values.id
    });

    console.log('open modal with ... ', data, values.status.status);

    const onSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);

        put(route('support_quotation.updateStatus',), {
            data,
            onSuccess: () => {
                setLoading(false);
                closeModal && closeModal();
            },
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <AppSelect required searchable label='Status' data={['Incoming', 'Processing', 'Completed']} value={data.status} onChange={(e: any) => setData('status', e)} />

            <Group justify="flex-end" mt={'md'}>
                <Button type='submit' color='green' disabled={loading}>Submit</Button>
            </Group>
        </form>
    )
}
