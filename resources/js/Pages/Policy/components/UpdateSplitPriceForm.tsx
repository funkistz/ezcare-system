import { AppInput } from '@/Components';
import { useForm, usePage } from '@inertiajs/react';
import { Group, Button } from '@mantine/core';
import React from 'react'

export default function UpdateSplitPriceForm({ policy, closeModal }: any) {
    const { discountsSelect, freePromosSelect }: any = usePage().props;

    const { data, setData, post, put, reset, errors } = useForm({
        customer_payment: 0,
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        put(route('policy.updateCustomerPayment', policy.id), {
            data,
            onSuccess: () => {
                closeModal && closeModal()
            },
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <AppInput type='number' label='Customer Price' value={data.customer_payment} onChange={(e: any) => setData('customer_payment', e)} />

            <Group justify="flex-end" mt={'md'}>
                <Button type='submit' color='green'>Submit</Button>
            </Group>
        </form>
    )
}
