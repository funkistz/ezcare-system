import React, { useState } from 'react';
import { AppInput, ConfigCodeInput, AppSelect, AppSegmentControl } from '@/Components';
import { useForm } from '@inertiajs/react'
import { Group, Button, Tabs } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';

export default function BrandForm({ type = '', values, closeModal }: { type?: any, values?: any, closeModal?: any }) {

    const id = values ? values.id : null;
    const modelIds = values ? values.models.map((model: any) => model.id) : [];
    const brandType = [
        { value: 'japanese', label: 'Japanese' },
        { value: 'continental', label: 'Continental' },
        { value: 'local', label: 'Local' },
        { value: 'korean', label: 'korean' },
    ];

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        type: (values) ? values.type : type,
        code: values ? values.code : '',
        models: values ? modelIds : [],
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('vehicle-brands.store'), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        } else {
            put(route('vehicle-brands.update', id), {
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
                <AppSegmentControl label='Brand Type' id='type' onChange={(e: any) => setData('type', e)} data={brandType} value={data.type} />

                <ConfigCodeInput values={data} setData={setData} errors={errors} isEdit={id} />


                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
