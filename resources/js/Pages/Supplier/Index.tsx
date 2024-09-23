import { AddButtonModal, AppCard, AppTable, DeleteButton, UpdateButtonModal } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { router, usePage } from '@inertiajs/react';
import { Group, SimpleGrid } from '@mantine/core';
import React from 'react'
import SupplierForm from './SupplierForm';
import SupplierView from './SupplierView';

export default function SupplierPage() {

    const { suppliers }: any = usePage().props;

    const onDelete = (id: any) => {
        router.delete(route('supplier.destroy', id));
    }

    const tableData = (suppliers: any) => {

        const data = { ...suppliers };
        const values: any = [];

        suppliers.data.map((value: any) => {
            values.push({
                'name': value.name,
                'description': value.description,
                'action':
                    <Group justify='right' gap='xs'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Update Supplier'>
                            <SupplierForm values={value} />
                        </UpdateButtonModal>
                        <UpdateButtonModal title='View Supplier' label="View">
                            <SupplierView values={value} />
                        </UpdateButtonModal>
                    </Group>
            });
        })
        data.data = values;

        return data;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }
    
    return <>
        <SimpleGrid cols={1}>
            <AppCard title='Suppliers' rightComponent={
                <AddButtonModal title='Add Supplier' >
                    <SupplierForm />
                </AddButtonModal>
            }>
                <AppTable headerOptions={headerOptions} data={tableData(suppliers)} meta={suppliers.meta} withSearch />
            </AppCard>
        </SimpleGrid>
    </> 
}

SupplierPage.layout = (page: any) => <AdminLayout children={page} title='Manage Suppliers' />;
