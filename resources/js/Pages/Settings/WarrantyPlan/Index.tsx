import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider, Badge } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import WarrantyPlanForm from './WarrantyPlanForm';
import SubPlanForm from './SubPlanForm';
import { IconList } from '@tabler/icons-react';
import PDFForm from './PDFForm';
import ItemsForm from './ItemsForm';
import ClaimLimitForm from './ClaimLimitForm';

export default function Index() {

    const { warranty_plans }: any = usePage().props;

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'name': value.name,
                'description': value.description,
                'Covered Item': <Group gap={4}>
                    {value.covered_items.map((item: any, index: any) => {
                        return <Badge key={index} radius={2} size='xs' color='gray'>{item.name}</Badge>
                    })}
                </Group>,
                'Addon Item': <Group gap={4}>
                    {value.addon_items.map((item: any, index: any) => {
                        return <Badge key={index} radius={2} size='xs' color='gray'>{item.name}</Badge>
                    })}
                </Group>,
                'action':
                    <Group justify='right' gap='xs'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <AddButtonModal title={'Update ' + value.name + ' PDF'} label='Update PDF'>
                            <PDFForm values={value} />
                        </AddButtonModal>
                        <UpdateButtonModal title='Update Claim Limit' label='Edit Claim Limit'>
                            <ClaimLimitForm values={value} />
                        </UpdateButtonModal>
                        <UpdateButtonModal title='Update Item' label='Edit Item'>
                            <ItemsForm values={value} />
                        </UpdateButtonModal>
                        <UpdateButtonModal title='Update Warranty Plan' label='Edit Plan'>
                            <WarrantyPlanForm values={value} />
                        </UpdateButtonModal>
                        {/* <AddButtonModal title='Booklet' label='Booklet'>
                            <WarrantyPlanForm values={value} />
                        </AddButtonModal> */}
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
        router.delete(route('warranty-plans.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={1}>
                <AppCard title='Warranty Plans' rightComponent={
                    <AddButtonModal title='Add Warranty Plan' >
                        <WarrantyPlanForm />
                    </AddButtonModal>
                }>
                    <AppTable headerOptions={headerOptions} data={tableData(warranty_plans.data)} />
                </AppCard>
            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Warranty Plan' />;