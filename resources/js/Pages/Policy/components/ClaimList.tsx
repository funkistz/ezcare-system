import { AppTable, AppPrice, AddButtonModal, UpdateButtonModal, AppDate, ButtonModal, TableColCapitalize } from '@/Components'
import { usePage } from '@inertiajs/react';
import moment from 'moment';
import React from 'react'
import { Badge, Button, Group, Stack, Text } from '@mantine/core';
import { IconFileInvoice, IconPlus } from '@tabler/icons-react';
import ServiceForm from './ServiceForm';
import ClaimForm from './ClaimForm';
import ClaimFormSimple from './ClaimFormSimple';
import PolicyClaimForm from './PolicyClaimForm';

export default function ClaimList({ policy }: { policy: any }) {

    const { settings }: any = usePage().props;

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'technician': value.technician_name,
                'location': <Stack gap={0}>
                    <Text tt='capitalize'>{value.location_name}</Text>
                    {value.location_name == 'workshop' && <>
                        <Text tt='capitalize'>Name: {value.workshop_name}</Text>
                        <Text tt='capitalize'>Phone No: {value.workshop_phone_no}</Text>
                    </>}
                </Stack>,
                'status': <Text tt='uppercase' fz={14}>{value.status_code}</Text>,
                'created': <Stack gap={0}>
                    <Group gap={5}>
                        <Text fz={14}>At: </Text>
                        <AppDate format='D/MM/YYYY h:mm a'>{value.created_at}</AppDate>
                    </Group>
                    <Text fz={14} tt='capitalize'>By: {value.created_by_name}</Text>
                </Stack>,
                'action': <>
                    <UpdateButtonModal size='70%' title={value.type == 'claim' ? 'Edit Claim' : 'Edit Towing'}>
                        <PolicyClaimForm policy={policy} values={value} />
                    </UpdateButtonModal>
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
            <Group justify='flex-end' mb='xs'>
                {policy.status_code == 'activated' && <AddButtonModal size='lg' title='Add Claim' label='Create Claim'><ClaimFormSimple policy={policy} type='claim' /></AddButtonModal>}
            </Group>
            <AppTable headerOptions={headerOptions} data={tableData(policy.claims)} />
        </>
    )
}
