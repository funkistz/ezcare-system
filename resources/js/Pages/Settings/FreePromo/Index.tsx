import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import FreePromoForm from './FreePromoForm';

export default function Index() {

    const { taxes }: any = usePage().props;
    const [activeTax, setActiveTax] = useState<any>();

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {

            let total: any = parseInt(value.amount) + ' months';

            values.push({
                'name': value.name,
                'description': value.description,
                'amount': total,
                'action':
                    <Group justify='right'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Edit Tax' >
                            <FreePromoForm values={value} />
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
        router.delete(route('free-promos.destroy', id));
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
                <AppCard title='Free Promos' rightComponent={
                    <AddButtonModal title='Add Free Promo' >
                        <FreePromoForm />
                    </AddButtonModal>
                }>
                    <AppTable headerOptions={headerOptions} data={tableData(taxes.data)} />
                </AppCard>

            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Free Promo' />;