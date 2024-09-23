import { AppDataShow, AppInput, AppYearPicker, AppDatePicker, AppSelect } from '@/Components';
import { useForm, usePage } from '@inertiajs/react';
import { Stack, Group, Button } from '@mantine/core';
import React from 'react'

export default function StaffDetailsForm({ policy, closeModal }: { policy: any, closeModal?: any }) {

    const { technicals, mos, dealers }: any = usePage().props;

    const { data, setData, post, put, reset, errors } = useForm({
        // id: vehicle.id,
        salesman: policy ? policy.salesman : '',
        dealer_id: policy ? policy.dealer_id : '',
        marketing_officer_id: policy ? policy.marketing_officer_id : '',
        technical_staff_id: policy ? policy.technical_staff_id : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        put(route('policy.update', policy.id), {
            data,
            onSuccess: () => {
                closeModal()
            },
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <Stack gap='xs' p='sm'>
                <AppInput required label='Salesman' id='salesman' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('salesman', e.target.value)} />
                <AppSelect required searchable label='Dealer' id='dealer_id' data={dealers} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('dealer_id', e)} />
                <AppSelect required searchable label='Marketing Officer' id='marketing_officer_id' data={mos} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('marketing_officer_id', e)} />
                <AppSelect required searchable label='Technical In Charge' id='technical_staff_id' data={technicals} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('technical_staff_id', e)} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </Stack>
        </form>
    )
}