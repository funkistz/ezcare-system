import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, DeleteButton, HasPermission, ButtonModal } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import DealerForm from './DealerForm';
import DealerView from './DealerView';


export default function Index() {

    const { dealers }: any = usePage().props;
    const [activeWarrantyPlan, setActiveWarrantyPlan] = useState<any>();

    console.log('dealers', dealers)

    const tableData = (dealers: any) => {

        const data = { ...dealers };
        const values: any = [];

        dealers.data.map((value: any) => {
            values.push({
                'name': value.name,
                'description': value.description,
                'action':
                    <Group justify='right' gap='xs'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Update Dealer'>
                            <DealerForm values={value} />
                        </UpdateButtonModal>
                        <UpdateButtonModal title='View Dealer' label="View">
                            <DealerView values={value} />
                        </UpdateButtonModal>
                    </Group>
            });
        })
        data.data = values;

        console.log('data xx', data)

        return data;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    const onDelete = (id: any) => {
        router.delete(route('dealers.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={1}>
                <AppCard title='Vehicle Dealers' rightComponent={
                    <AddButtonModal title='Add Dealer' >
                        <DealerForm />
                    </AddButtonModal>
                }>
                    <AppTable headerOptions={headerOptions} data={tableData(dealers)} meta={dealers.meta} withSearch />
                </AppCard>
            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Dealer' />;