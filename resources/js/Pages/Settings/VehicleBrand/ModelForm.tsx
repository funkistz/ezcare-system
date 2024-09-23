import React from 'react';
import { AppInput, AppSegmentControl, ConfigCodeInput } from '@/Components';
import { useForm } from '@inertiajs/react'
import { Group, Button } from '@mantine/core';

export default function ModelForm({ values, brandCode, closeModal }: { values?: any, brandCode: any, closeModal?: any }) {

    const id = values ? values.id : null;
    // const variantIds = values ? values.variants.map((variant: any) => variant.id) : [];

    const { data, setData, post, put, reset, errors } = useForm({
        brand_code: brandCode ? brandCode : '',
        name: values ? values.name : '',
        code: values ? values.code : '',
        type: values ? values.type : '',
    });

    const type = [
        {
            label: 'Car',
            value: 'car',
        },
        {
            label: 'Bike',
            value: 'bike',
        }
    ]

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('vehicle-models.store'), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal()
                },
            });
        } else {
            put(route('vehicle-models.update', id), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal()
                },
            });
        }

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <ConfigCodeInput values={data} setData={setData} errors={errors} isEdit={id} />
                <AppSegmentControl label='Type' id='type' values={data} data={type} errors={errors ? errors : null} onChange={(e: any) => setData('type', e)} />

                <Group justify="flex-end" mt={'xl'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
