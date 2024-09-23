import React, { useState } from 'react';
import { AppInput, ConfigCodeInput } from '@/Components';
import { useForm } from '@inertiajs/react'
import { Group, Button } from '@mantine/core';

export default function TaxForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        rate: values ? values.rate : '',
        description: values ? values.description : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('taxes.store'), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        } else {
            put(route('taxes.update', id), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppInput label='Name' required id='name' value={data.name} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppInput type='number' label='Rate' required id='rate' value={data.rate} errors={errors ? errors : null} onChange={(e: any) => setData('rate', e)} />
                <AppInput label='Description' required id='description' value={data.description} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
