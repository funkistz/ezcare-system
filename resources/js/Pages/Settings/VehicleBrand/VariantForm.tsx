import React from 'react'
import { AppInput, ConfigCodeInput } from '@/Components';
import { useForm } from '@inertiajs/react'
import { Group, Button } from '@mantine/core';

export default function VariantForm({ values, brandCode, closeModal }: { values?: any, brandCode: any, closeModal?: any }) {

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        brand_code: brandCode ? brandCode : '',
        name: values ? values.name : '',
        code: values ? values.code : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('vehicle-variants.store'), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal()
                },
            });
        } else {
            put(route('vehicle-variants.update', id), {
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

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
