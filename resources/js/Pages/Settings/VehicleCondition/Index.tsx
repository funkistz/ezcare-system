import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import VehicleConditionForm from './VehicleConditionForm';


export default function Index() {

    const { vehicle_conditions }: any = usePage().props;
    const [activeWarrantyPlan, setActiveWarrantyPlan] = useState<any>();

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'name': value.name,
                'description': value.description,
                'action':
                    <Group justify='right' gap='xs'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Update Vehicle Condition'>
                            <VehicleConditionForm values={value} />
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
        router.delete(route('vehicle-conditions.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={2}>
                <AppCard title='Vehicle Conditions' rightComponent={
                    <AddButtonModal title='Add Vehicle Condition' >
                        <VehicleConditionForm />
                    </AddButtonModal>
                }>
                    <AppTable headerOptions={headerOptions} data={tableData(vehicle_conditions.data)} />
                </AppCard>
            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Vehicle Condition' />;