import React, { useState } from 'react';
import { AppInput, AppSegmentControl, ConfigCodeInput } from '@/Components';
import { useForm, usePage } from '@inertiajs/react'
import { Group, Button, TagsInput } from '@mantine/core';

export default function OilTypeForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const { service_types }: any = usePage().props;

    console.log('values', values)

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        description: values ? values.description : '',
        service_type_id: values ? '' + values.service_type_id : service_types[0].value,
        month_cycle: (values && values.month_cycle) ? values.month_cycle?.map((month_cycle: any) => { return '' + month_cycle }) : [],
        mileage_cycle: (values && values.mileage_cycle) ? values.mileage_cycle?.map((mileage_cycle: any) => { return '' + mileage_cycle }) : [],
    });

    console.log('data', data)

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('oil-types.store'), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        } else {
            put(route('oil-types.update', id), {
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

                <AppSegmentControl label='Type' required id='service_type_id' data={service_types} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('service_type_id', e)} />
                <AppInput label='Name' required id='name' value={data.name} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppInput label='Description' required id='description' value={data.description} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />

                <TagsInput label='Month Cycles' description='This value will rotate after first mileage' value={data.month_cycle} onChange={(e: any) => {
                    setData('month_cycle', e);
                    console.log('month_cycle', e)
                }} />
                <TagsInput label='Mileage Cycles (KM)' description='This value will rotate after first mileage' value={data.mileage_cycle} onChange={(e: any) => setData('mileage_cycle', e)} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
