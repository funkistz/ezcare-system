import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import TaxForm from './TaxForm';

export default function Index() {

    const { taxes }: any = usePage().props;
    const [activeTax, setActiveTax] = useState<any>();

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'name': value.name,
                'rate': value.rate + ' %',
                'description': value.description,
                'action':
                    <Group justify='right'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Edit Tax' >
                            <TaxForm values={value} />
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
        router.delete(route('taxes.destroy', id));
    }

    // useEffect(() => {
    //     if (warranty_plans) {
    //         const findWarranty = activeWarrantyPlan ? warranty_plans.data.find((brand: any) => brand.id == activeWarrantyPlan.id) : null;
    //         if (findWarranty) {
    //             setActiveSubPlan(findWarranty);
    //         }
    //     }
    // }, [warranty_plans])

    return (
        <div>
            <SimpleGrid cols={2}>
                <AppCard title='Taxes' rightComponent={
                    <AddButtonModal title='Add Tax' >
                        <TaxForm />
                    </AddButtonModal>
                }>
                    <AppTable headerOptions={headerOptions} data={tableData(taxes.data)} />
                </AppCard>

            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Taxes' />;