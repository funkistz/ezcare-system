import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, TableColCapitalize, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import VechilePowerForm from './VehiclePowerForm';

export default function Index() {

    const { vehicle_powers }: any = usePage().props;
    const [activeTax, setActiveTax] = useState<any>();

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'name': <TableColCapitalize text={value.name} />,
                'description': value.description,
                'power': <Group gap={'xs'}>
                    <Text fz={12}>{value.min_power + ' ' + value.type + ' - ' + value.max_power + ' ' + value.type}</Text>
                </Group>,
                'action':
                    <Group justify='right'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Edit' >
                            <VechilePowerForm values={value} />
                        </UpdateButtonModal>
                    </Group>
            });
        })
        return values;
    }

    const onDelete = (id: any) => {
        router.delete(route('vehicle-powers.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={2}>
                <AppCard title='Vehicle Power Capacities' rightComponent={
                    <AddButtonModal title='Add New' >
                        <VechilePowerForm />
                    </AddButtonModal>
                }>
                    <AppTable data={tableData(vehicle_powers.data)} />
                </AppCard>

            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Vehicle Power Capacity' />;