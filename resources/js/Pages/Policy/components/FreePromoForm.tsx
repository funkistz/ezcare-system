import { AppSelect } from '@/Components'
import { useForm, usePage } from '@inertiajs/react';
import { Button, Group, Stack } from '@mantine/core'
import React, { useState } from 'react'

export default function FreePromoForm({ policy, closeModal }: any) {

    const { discountsSelect, freePromosSelect }: any = usePage().props;

    const { data, setData, post, put, reset, errors } = useForm({
        free_promo_id: '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        post(route('policy.addFreePromo', policy.id), {
            data,
            onSuccess: () => {
                closeModal && closeModal()
            },
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <AppSelect searchable label='Add Free Promo' data={freePromosSelect} value={data.free_promo_id} onChange={(e: any) => setData('free_promo_id', e)} />

            <Group justify="flex-end" mt={'md'}>
                <Button type='submit' color='green'>Submit</Button>
            </Group>
        </form>
    )
}
