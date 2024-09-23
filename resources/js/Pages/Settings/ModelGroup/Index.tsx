import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButton, UpdateButtonModal, AppButton, TableColCapitalize, DeleteButton } from '@/Components';
import { Group, Button, Paper, Box, SimpleGrid, Stack, Text, Badge } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { IconList, IconPhoto } from '@tabler/icons-react';
import GroupForm from './GroupForm';

export default function Index() {

    const { groups }: any = usePage().props;



    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'name': <TableColCapitalize text={value.name} />,
                'description': value.description,
                'brand': <Badge color="primary">{value.vehicle_brand.name}</Badge>,
                'models': <Group>
                    {value.vehicle_models && value.vehicle_models.map((model: any, index: number) => { return <Badge key={index} color="cyan">{model.name}</Badge> })}
                </Group>,
                'action':
                    <Group justify='right' gap='xs'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Update Group'>
                            <GroupForm values={value} />
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
        router.delete(route('vehicle-groups.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={1}>
                <AppCard title='Vehicle Groups' rightComponent={
                    <AddButtonModal title='Add Group' >
                        <GroupForm />
                    </AddButtonModal>
                }>
                    <></>
                    <AppTable headerOptions={headerOptions} data={tableData(groups.data)} />
                </AppCard>

            </SimpleGrid>

        </div >
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Vehicle Model Group' />;