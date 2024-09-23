import React, { useEffect, useState } from 'react';
import { AppInput, ConfigCodeInput, AppSelect } from '@/Components';
import { useForm, usePage } from '@inertiajs/react'
import { Group, Button } from '@mantine/core';

export default function PlanPricingForm({ values, closeModal, defaultValue = {} }: { values?: any, closeModal?: any, defaultValue?: any }) {

    const { brands, warranty_plans, vehicle_groups, vehicle_power_capacities, vehicle_conditions }: any = usePage().props;

    console.log('values', values);

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        description: (values && values.description) ? values.description : '',
        vehicle_group_id: values ? values.vehicle_group_id : (defaultValue.vehicle_group_id ? defaultValue.vehicle_group_id : ''),
        warranty_plan_id: values ? values.warranty_plan_id : (defaultValue.warranty_plan_id ? defaultValue.warranty_plan_id : ''),
        vehicle_condition_id: values ? values.vehicle_condition_id : (defaultValue.vehicle_condition_id ? defaultValue.vehicle_condition_id : ''),
        vehicle_power_capacity_id: values ? values.vehicle_power_capacity_id : (defaultValue.vehicle_power_capacity_id ? defaultValue.vehicle_power_capacity_id : ''),
        price: values ? values.price : '',
        addon_price: values ? values.addon_price : '',
        dealer_price: values ? values.dealer_price : '',
        dealer_addon_price: values ? values.dealer_addon_price : '',
        power_type: values ? values.power_type : '',
        min_power: values ? values.min_power : '',
        max_power: values ? values.max_power : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('plan-pricing.store'), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        } else {
            put(route('plan-pricing.update', id), {
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

                <AppSelect label='Vehicle Group' id='vehicle_group_id' data={vehicle_groups} values={data} onChange={(e: any) => setData('vehicle_group_id', e)} />
                <AppSelect label='Warranty Plan' id='warranty_plan_id' data={warranty_plans} values={data} onChange={(e: any) => setData('warranty_plan_id', e)} />
                <AppSelect label='Vehicle Power' id='vehicle_power_capacity_id' data={vehicle_power_capacities} values={data} onChange={(e: any) => setData('vehicle_power_capacity_id', e)} />
                <AppSelect label='Vehicle Condition' id='vehicle_condition_id' data={vehicle_conditions} values={data} onChange={(e: any) => setData('vehicle_condition_id', e)} />

                <AppInput label='Price' description="tax inclusive" required id='price' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('price', e.target.value)} />
                <AppInput label='Addon Price' description="tax inclusive" required id='addon_price' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('addon_price', e.target.value)} />

                <AppInput label='Dealer Price' description="tax inclusive" required id='dealer_price' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('dealer_price', e.target.value)} />
                <AppInput label='Dealer Addon Price' description="tax inclusive" required id='dealer_addon_price' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('dealer_addon_price', e.target.value)} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
