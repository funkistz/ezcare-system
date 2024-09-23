import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import OilTypeForm from './OilTypeForm';

export default function Index() {

    const { oil_types }: any = usePage().props;
    const [activeTax, setActiveTax] = useState<any>();

    console.log('oil_types', oil_types)

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'type': value.service_type?.name,
                'name': value.name,
                'description': value.description,
                'month cycles': value.month_cycle.toString(),
                'mileage cycles': value.mileage_cycle.toString(),
                'action':
                    <Group justify='right'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Edit Oil Type' >
                            <OilTypeForm values={value} />
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
        router.delete(route('oil-types.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={1}>
                <AppCard title='Service Types' rightComponent={
                    <AddButtonModal title='Add Service Type' >
                        <OilTypeForm />
                    </AddButtonModal>
                }>
                    <AppTable headerOptions={headerOptions} data={tableData(oil_types.data)} />
                </AppCard>

            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Service Types' />;