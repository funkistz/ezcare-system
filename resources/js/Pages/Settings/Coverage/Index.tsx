import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import CoverageForm from './CoverageForm';
// import FreePromoForm from './FreePromoForm';

export default function Index() {

    const { coverages }: any = usePage().props;
    const [activeTax, setActiveTax] = useState<any>();

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {

            values.push({
                'name': value.name,
                'description': value.description,
                'price': value.price,
                'dealer price': value.dealer_price,
                'action':
                    <Group justify='right'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Edit Coverage' >
                            <CoverageForm values={value} isEdit={true}/>
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
        router.delete(route('coverages.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={1}>
                <AppCard title='Coverages' rightComponent={
                    <AddButtonModal title='Add Coverage' >
                        <CoverageForm />
                    </AddButtonModal>
                }>
                    <AppTable headerOptions={headerOptions} data={tableData(coverages.data)} />
                </AppCard>

            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Coverage' />;