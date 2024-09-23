import AdminLayout from '@/Components/layout/AdminLayout';
import React from 'react'
import { Card, Group, Text, Button } from '@mantine/core';
import { AppInput, AppSelect } from '@/Components';
import { usePage, useForm } from '@inertiajs/react';

export default function Index() {

    const { taxes, settings, currency_symbols, phone_country_codes }: any = usePage().props;
    const { data, setData, post, put, reset, errors } = useForm({
        tax: settings.tax ? String(settings.tax.value) : '',
        currency_symbol: settings.currency_symbol ? settings.currency_symbol.value : '',
        phone_country_code: settings.phone_country_code ? settings.phone_country_code.value : '',
        vehicle_max_year: settings.vehicle_max_year ? Number(settings.vehicle_max_year.value) : null,
    });

    const onSubmit = () => {
        post(route('general-settings.store'), {
            data,
            onSuccess: () => {
                console.log('success')
                // closeModal && closeModal()
            },
        });
    }

    return (
        <>
            <Card withBorder shadow="sm" radius="md" maw={500}>
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <Text fw={500}>Settings</Text>
                        <Button color='green' onClick={onSubmit}>Save</Button>
                    </Group>
                </Card.Section>

                <AppSelect label='Default Tax' data={taxes} id='tax' values={data} onChange={(e: any) => setData('tax', e)} />
                <AppSelect label='Currency Symbol' data={currency_symbols} id='currency_symbol' values={data} onChange={(e: any) => setData('currency_symbol', e)} />
                <AppSelect label='Phone Country Code' data={phone_country_codes} id='phone_country_code' values={data} onChange={(e: any) => setData('phone_country_code', e)} />
                <AppInput type='number' label='Vehicle Max Year' id='vehicle_max_year' values={data} onChange={(e: any) => setData('vehicle_max_year', e)} />

                <Card.Section withBorder inheritPadding py="xs" mt={40}>
                    <Group justify="flex-end">
                        <Button color='green' onClick={onSubmit}>Save</Button>
                    </Group>
                </Card.Section>
            </Card>
        </>
    )
}

Index.layout = (page: any) => <AdminLayout children={page} title='Manage Setting' />;
