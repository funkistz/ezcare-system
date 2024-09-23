import React, { useState } from 'react';
import { AppInput, AppSegmentControl, ConfigCodeInput } from '@/Components';
import { useForm } from '@inertiajs/react'
import { Group, Button } from '@mantine/core';

export default function FreePromoForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        description: values ? values.description : '',
        type: values ? values.type : 'month',
        amount: values ? values.amount : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('free-promos.store'), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        } else {
            put(route('free-promos.update', id), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        }
    }

    const types = [
        {
            label: 'Free Month',
            value: 'month',
        },
    ];

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppInput label='Name' required id='name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppInput label='Description' id='description' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />

                <AppSegmentControl required label='Type' id='type' data={types} values={data} errors={errors} onChange={(e: any) => setData('type', e)} />

                <AppInput type='number' label='Duration (Month)' required id='amount' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('amount', e)} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
