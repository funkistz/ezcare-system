import { Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, DeleteButton, UpdateButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider, Stack } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import AddInspection from '../Inspection/components/AddInspection';
import AddSceduleInspection from '../Inspection/components/AddScheduleInspection';
// import ApproveForm from './ApproveForm';
// import RejectForm from './RejectForm';
// import WorkshopForm from './WorkshopForm';


export default function Index() {

    const { claims }: any = usePage().props;
    const [activeWarrantyPlan, setActiveWarrantyPlan] = useState<any>();

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'policy': <Link href={route('policy.show', value.policy_id)}>{value.policy.policy_no}</Link>,
                'location': <Stack gap={0}>
                    <Text tt='capitalize'>{value.location_name}</Text>
                    {value.location_name == 'workshop' && <>
                        <Text tt='capitalize'>Name: {value.workshop_name}</Text>
                        <Text tt='capitalize'>Phone No: {value.workshop_phone_no}</Text>
                    </>}
                </Stack>,
                'by': value.technician_name,
                'status': value.status_code,
                'remarks': value.remarks,
                'action':
                    <Group justify='right' gap='xs'>
                        {value.status_code == 'pending' && !value.inspection_status_code && <>
                            <UpdateButtonModal title='Accept Claim' label='Approve'>
                                <AddSceduleInspection claim={value} />
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
                <AppCard title='Claims' >
                    <AppTable headerOptions={headerOptions} data={tableData(claims.data)} />
                </AppCard>
            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Claim' />;