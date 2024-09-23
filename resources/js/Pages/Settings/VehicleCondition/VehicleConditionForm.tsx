import React, { useState } from 'react';
import { AppInput, ConfigCodeInput } from '@/Components';
import { useForm } from '@inertiajs/react'
import { Group, Button } from '@mantine/core';

export default function VehicleConditionForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        description: (values && values.description) ? values.description : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('vehicle-conditions.store'), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        } else {
            put(route('vehicle-conditions.update', id), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppInput label='Name' required id='name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppInput label='Description' id='description' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
