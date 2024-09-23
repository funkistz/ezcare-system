import { AppInput, AppSelect } from '@/Components';
import { useForm } from '@inertiajs/react';
import { Stack, Group, Button } from '@mantine/core';
import React from 'react'

export default function InvoiceForm({ invoice, closeModal }: any) {

    const { data, setData, post, put, reset, errors } = useForm({
        invoice_no: invoice.invoice_no,
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        put(route('policy.update_invoice', invoice.id), {
            data,
            onSuccess: () => {
                closeModal()
            },
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <Stack gap='xs' p='sm'>

                <AppInput values={data} required id='invoice_no' errors={errors ? errors : null} onChange={(e: any) => setData('invoice_no', e.target.value)} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </Stack>
        </form>
    )
}
