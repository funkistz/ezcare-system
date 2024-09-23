import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider, Stack, Select, Badge } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import SupportQuotationForm from './Form';
import SupportQuoteStatusForm from '@/Pages/Policy/components/SupportQuoteStatusForm';
import moment from 'moment';


export default function Index() {

    const { support_quotations }: any = usePage().props;

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            const content = JSON.parse(value.content);
            const status = value.status?.status;
            const created_at = moment(value.created_at).format('MM/DD/YYYY h:mm:ss A');

            values.push({
                'Contact': <Stack gap={0}>
                    <Text>{content.name}</Text>
                    <Text>{content.email}</Text>
                    <Text>{content.phone_no}</Text>
                </Stack>,
                'created date': <Text>{created_at}</Text>,
                'vehicle': <Stack gap={0}>
                    <Text>Model: {content.vehicle_model}</Text>
                    <Text>Year: {content.vehicle_year}</Text>
                </Stack>,
                'message': content.message,
                'status':  status == 'Processing' ? <Badge color="yellow">processing</Badge> : status == 'Completed' ? <Badge color="green">completed</Badge> : <Badge color="orange">incoming</Badge>,
                'action' :
                <UpdateButtonModal title='Update Status' >
                            <SupportQuoteStatusForm values={value} isEdit={true}/>
                </UpdateButtonModal>
            });
        })
        return values;
    }
    const headerOptions = {
        'created date': { w: 130 },
        'image': { w: 200 },
        'message': { w: 300 },
        'status': { w:40 },
        'action': { ta: 'right', w:100 }
    }

    return (
        <div>
            <SimpleGrid cols={1}>
                <AppCard title='Support Quotations'>
                    <AppTable headerOptions={headerOptions} data={tableData(support_quotations.data)} />
                </AppCard>
            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Support Quotations' />;