import { AppSelect } from '@/Components'
import { useForm, usePage } from '@inertiajs/react';
import { Button, Group, Stack } from '@mantine/core'
import React, { useState } from 'react'

export default function DiscountForm({ policy, closeModal }: any) {

    const { discountsSelect, freePromosSelect }: any = usePage().props;
    const [discounts, setDiscounts] = useState([])

    const { data, setData, post, put, reset, errors } = useForm({
        discount_id: '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        post(route('policy.addDiscount', policy.id), {
            data,
            onSuccess: () => {
                closeModal && closeModal()
            },
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <AppSelect searchable label='Add Discount / Loading' data={discountsSelect} value={data.discount_id} onChange={(e: any) => setData('discount_id', e)} />

            <Group justify="flex-end" mt={'md'}>
                <Button type='submit' color='green'>Submit</Button>
            </Group>
        </form>
    )
}
