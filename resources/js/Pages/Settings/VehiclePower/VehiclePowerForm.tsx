import React, { useState } from 'react';
import { AppInput, AppSegmentControl } from '@/Components';
import { useForm } from '@inertiajs/react'
import { Group, Button } from '@mantine/core';

export default function VechilePowerForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        description: (values && values.description) ? values.description : '',
        type: values ? values.type : 'cc',
        min_power: values ? values.min_power : '',
        max_power: values ? values.max_power : '',
    });

    console.log('values', values)

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('vehicle-powers.store'), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        } else {
            put(route('vehicle-powers.update', id), {
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
                <AppInput label='Name' required id='name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppInput label='Description' id='description' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />

                <AppSegmentControl label='Power Type' id='type' values={data} onChange={(e: any) => setData('type', e)} data={[
                    { label: 'CC', value: 'cc' },
                    { label: 'kW', value: 'kw' }
                ]} />
                <Group>
                    <AppInput type='number' label='Min Power' placeholder={data.type} required id='min_power' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('min_power', e)} />
                    <AppInput type='number' label='Max Power' placeholder={data.type} required id='max_power' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('max_power', e)} />

                </Group>

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
