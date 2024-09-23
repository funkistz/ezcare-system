import { AppTable, AppPrice, AddButtonModal, AppDate, UpdateButtonModal, DeleteButton } from '@/Components'
import { router, usePage } from '@inertiajs/react';
import moment from 'moment';
import React from 'react'
import { Alert, Badge, Button, Card, Divider, Group, Stack, Text } from '@mantine/core';
import { IconFileInvoice, IconInfoCircle } from '@tabler/icons-react';
import ServiceForm from './ServiceForm';
import ServiceReminder from './ServiceReminder';

export default function ServiceList({ policy }: { policy: any }) {

    const { settings }: any = usePage().props;

    const onDelete = (id: any) => {
        router.delete(route('policy.deleteService', id));
    }

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'type': <Text tt='uppercase' fz={14}>{value.oil_type_name}</Text>,
                'invoice no': <Text tt='uppercase' fz={14}>{value.invoice_no}</Text>,
                'invoice date': <AppDate format='D/MM/YYYY' with_tz={false}>{value.invoice_date}</AppDate>,
                'expected service': <Stack gap='xs'>
                    <Text tt='uppercase' fz={14}>{value.expected_mileage} km</Text>
                    <Text tt='uppercase' fz={14}> {<AppDate format='D/MM/YYYY h:mm a'>{value.expected_date}</AppDate>}</Text>
                </Stack>,
                'service on': <Stack gap='xs'>
                    <Text tt='uppercase' fz={14}>{value.current_mileage} km</Text>
                    <Text tt='uppercase' fz={14}><AppDate format='D/MM/YYYY h:mm a'>{value.current_date}</AppDate></Text>
                </Stack>,
                'next service': <Stack gap='xs'>
                    <Text tt='uppercase' fz={14}>{value.next_mileage} km</Text>
                    <Text tt='uppercase' fz={14}><AppDate format='D/MM/YYYY h:mm a'>{value.next_date}</AppDate></Text>
                </Stack>,
                'status': <Text tt='uppercase' fz={14}>{value.status}</Text>,
                'created': <Stack gap={0}>
                    <Group gap={5}>
                        <Text fz={14}>At: </Text>
                        <AppDate format='D/MM/YYYY h:mm a'>{value.created_at}</AppDate>
                    </Group>
                    <Text fz={14} tt='capitalize'>By: {value.created_by_name}</Text>
                </Stack>,
                'action': <>
                    <Group justify='end' gap={'xs'}>
                        <UpdateButtonModal title={'Update Service'}>
                            <ServiceForm policy={policy} values={value} />
                        </UpdateButtonModal>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                    </Group>
                    
                </>,
            });
        })
        return values;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    return (
        <>
            {/* <>{JSON.stringify(policy.next_service)}</> */}
            {!!policy.next_service.message && <Alert m='xl' variant='outline' color="red" title="Alert title" icon={<IconInfoCircle />}>
                {policy.next_service?.message}
            </Alert>}
            {!policy.next_service.message && <>
                <Group justify='space-between' mb='xs' align='end'>
                    <ServiceReminder policy={policy} />
                    {policy.status_code == 'activated' && <AddButtonModal title='Add Service' label='Add Service'><ServiceForm policy={policy} /></AddButtonModal>}
                </Group>
                <Divider />
                {policy.services && policy.services.length > 0 && <AppTable headerOptions={headerOptions} data={tableData(policy.services)} />}
                {policy.services && policy.services.length == 0 && <Text ta='center' m={50}>No Service Record</Text>}
            </>}
        </>
    )
}
