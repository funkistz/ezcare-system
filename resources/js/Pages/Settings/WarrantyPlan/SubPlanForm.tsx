import React from 'react';
import { AppInput, ConfigCodeInput } from '@/Components';
import { useForm } from '@inertiajs/react'
import { Group, Button } from '@mantine/core';

export default function SubPlanForm({ values, warrantyPlanCode, closeModal }: { values?: any, warrantyPlanCode: any, closeModal?: any }) {

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        warranty_plan_code: warrantyPlanCode ? warrantyPlanCode : '',
        name: values ? values.name : '',
        code: values ? values.code : '',
        description: values ? values.description : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('warranty-subplans.store'), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal()
                },
            });
        } else {
            put(route('warranty-subplans.update', id), {
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

                <AppInput label='Description' required id='description' value={data.description} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />

                <Group justify="flex-end" mt={'xl'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
