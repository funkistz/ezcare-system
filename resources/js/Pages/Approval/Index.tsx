import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, DeleteButton, UpdateButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import ApproveForm from './ApproveForm';
import RejectForm from './RejectForm';
// import WorkshopForm from './WorkshopForm';


export default function Index() {

    const { requests }: any = usePage().props;
    const [activeWarrantyPlan, setActiveWarrantyPlan] = useState<any>();
    console.log('requests', requests)

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'data': <UpdateButton label='View' onClick={() => router.get(route('policy.show', value.real_model_id))} />,
                'description': value.description,
                'by': value.user.name,
                'status': value.status_code,
                'remarks': value.remarks,
                'action':
                    <Group justify='right' gap='xs'>
                        {value.status_code == 'pending' && <>
                            <UpdateButtonModal title='Reject' label='Reject' options={{ color: 'red' }}>
                                <RejectForm transaction={value} />
                            </UpdateButtonModal>
                            <UpdateButtonModal title='Approve' label='Approve'>
                                <ApproveForm transaction={value} />
                            </UpdateButtonModal>
                        </>}
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
        router.delete(route('workshops.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={1}>
                <AppCard title='Approvals' >
                    <AppTable headerOptions={headerOptions} data={tableData(requests.data)} />
                </AppCard>
            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Approval' />;