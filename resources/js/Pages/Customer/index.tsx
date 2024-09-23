import { router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, TextInput } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import CustomerForm from './CustomerForm';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';

export default function Index() {

    const { customers, countries }: any = usePage().props;
    const [activeTax, setActiveTax] = useState<any>();

    console.log('countries', countries)

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'First Name': value.first_name,
                'Last Name': value.last_name,
                'IC': value.ic,
                'Phone No': value.phone_no,
                'action':
                    <Group justify='right'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Edit Tax' >
                            <CustomerForm values={value} />
                        </UpdateButtonModal>
                    </Group>
            });
        })
        return values;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    const onDelete = (id: any) => {
        router.delete(route('customers.destroy', id));
    }

    let query: any = usePage().props.ziggy;
    query = query.query;
    const { data, setData, post, put, reset, errors } = useForm({
        search: query ? query.search : '',
    });
    const [searchDebounced] = useDebouncedValue(data.search, 300);

    useDidUpdate(() => {

        const newData = { ...data };

        router.reload({
            data: newData,
            preserveState: true
        });

    }, [searchDebounced]);

    return (
        <div>
            <SimpleGrid cols={1}>
                <AppCard title='Customers' rightComponent={
                    <AddButtonModal title='Add Customer' >
                        <CustomerForm />
                    </AddButtonModal>
                }>
                    <TextInput mt={8} placeholder='Search by Name or IC' my={20} w={350} value={data.search} onChange={(e) => setData('search', e.target.value)} />
                    <AppTable headerOptions={headerOptions} data={tableData(customers.data)} meta={customers.meta} />
                </AppCard>

            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Customers' />;