import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import BranchForm from './BranchForm';


export default function Index() {

    const { branches }: any = usePage().props;
    const [activeWarrantyPlan, setActiveWarrantyPlan] = useState<any>();

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'code': value.code,
                'name': value.name,
                'description': value.description,
                'action':
                    <Group justify='right' gap='xs'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Update Branch'>
                            <BranchForm values={value} />
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
        router.delete(route('branches.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={2}>
                <AppCard title='Vehicle Branch' rightComponent={
                    <AddButtonModal title='Add Branch' >
                        <BranchForm />
                    </AddButtonModal>
                }>
                    <AppTable headerOptions={headerOptions} data={tableData(branches.data)} />
                </AppCard>
            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Branch' />;