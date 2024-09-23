import { AppDataShow, AppDatePicker, AppInput, AppYearPicker } from '@/Components'
import { useForm } from '@inertiajs/react';
import { Button, Group, Stack } from '@mantine/core'
import moment from 'moment'
import React from 'react'

export default function VehicleForm({ vehicle, closeModal }: { vehicle: any, closeModal?: any }) {

    const { data, setData, post, put, reset, errors } = useForm({
        id: vehicle.id,
        registration_no: vehicle ? vehicle.registration_no : '',
        chassis_no: vehicle ? vehicle.chassis_no : '',
        engine_no: vehicle ? vehicle.engine_no : '',
        year: vehicle ? new Date(vehicle.year) : '',
        registration_date: vehicle ? new Date(vehicle.registration_date) : '',
        mileage: vehicle ? vehicle.mileage : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        put(route('vehicle.update', vehicle.id), {
            data,
            onSuccess: () => {
                closeModal()
            },
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <Stack gap='xs' p='sm'>
                {/* <AppDataShow label='Registration No' uppercase value={vehicle?.registration_no} /> */}
                <AppInput label='Registration No' id='registration_no' required values={data} onChange={(e: any) => setData('registration_no', e.target.value)} errors={errors} />

                <AppInput label='Chassis No' id='chassis_no' required values={data} onChange={(e: any) => setData('chassis_no', e.target.value)} errors={errors} />
                <AppInput label='Engine No' id='engine_no' required values={data} onChange={(e: any) => setData('engine_no', e.target.value)} errors={errors} />

                <AppDataShow uppercase label='Brand' value={vehicle?.brand_name} />
                <AppDataShow uppercase label='Model' value={vehicle?.model_name} />
                <AppDataShow label='Power Capacity' value={vehicle?.power} />
                <AppDataShow label='Condition' value={vehicle?.condition_name} />

                <AppYearPicker label='Year' id='year' required values={data} onChange={(e: any) => setData('year', e)} errors={errors} />
                <AppDatePicker label='Registration Date' id='registration_date' required values={data} onChange={(e: any) => setData('registration_date', e)} errors={errors} />
                <AppInput type='number' label='Mileage' id='mileage' required values={data} onChange={(e: any) => setData('mileage', e)} errors={errors} rightSection='KM' />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </Stack>
        </form>
    )
}
