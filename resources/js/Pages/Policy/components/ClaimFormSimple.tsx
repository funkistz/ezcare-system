import { AddButtonModal, AppDataShow, AppDatePicker, AppDateTimePicker, AppInput, AppSegmentControl, AppSelect, AppTable, AppTextArea, ButtonModal, ConfirmButton } from '@/Components';
import { router, useForm, usePage } from '@inertiajs/react';
import { Badge, Box, Button, Card, Divider, Group, Paper, Select, SimpleGrid, Stack, Stepper, Table, Text } from '@mantine/core';
import moment from 'moment';
import React, { useState } from 'react';
import { AppDate } from '@/Components'
import PolicyStatusBadge from './PolicyStatusBadge';
import BalanceStatus from './BalanceStatus';
import ServiceList from './ServiceList';

export default function ClaimFormSimple({ values, closeModal, policy }: { values?: any, closeModal?: any, policy: any, type?: any }) {

    const { data, setData, post, put, reset, errors } = useForm({
        customer_phone_no: values ? values.customer_phone_no : (policy && policy.customer.phone_no) ? policy.customer.phone_no : '',
        location: values ? values.location : '1',
        workshop_name: values ? values.workshop_name : '',
        workshop_phone_no: values ? values.workshop_phone_no : '',
        technician_id: values ? values.technician_id : '',
        remarks: values ? values.remarks : '',
        policy_id: policy.id,
    });

    console.log('policy.customer.phone_no', policy.customer.phone_no)
    console.log('policy.customer.phone_no', values)

    const { settings, technicals }: any = usePage().props;
    const locations = [
        {
            label: 'Home',
            value: '1'
        },
        {
            label: 'Office',
            value: '2'
        }
    ];

    const onSubmit = (e: any) => {
        console.log('onSubmit', data)
        e.preventDefault();
        post(route('claim.store'), {
            data,
            onSuccess: () => {
                closeModal && closeModal()
            },
        });
    }

    return (
        <Box p={'md'}>
            <Stack mb={20} gap='xs'>
                <Group gap={'xs'}>
                    <Text fz={16}>Policy Status: </Text>
                    <PolicyStatusBadge status={policy.status_code} />
                </Group>
                <Group gap={'xs'}>
                    <Text fz={16}>Payment Status:</Text>
                    <PolicyStatusBadge status={policy.payment_status_code} />
                    {!policy.is_foc && <BalanceStatus balance={policy.balance_payment} currency={settings.currency_symbol?.value} />}
                </Group>
            </Stack>
            <form onSubmit={onSubmit} id='claim-form'>
                <Card withBorder miw={500} maw={800} p='lg'>
                    <Text mb={20} fz={20}>Claim Details</Text>

                    <Stack gap={0}>
                        <AppInput label='Customer Phone No' required id='customer_phone_no' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('customer_phone_no', e.target.value)} />
                        <AppSegmentControl label='Type:' value={data.location} onChange={(e: any) => setData('location', e)} data={locations} w={300} />

                        {data.location == 2 &&
                            <>
                                <AppInput label='Workshop Name' required id='workshop_name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('workshop_name', e.target.value)} />
                                <AppInput label='Workshop Phone No' required id='workshop_phone_no' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('workshop_phone_no', e.target.value)} />
                            </>
                        }
                        <AppSelect required searchable label='Technical' id='technician_id' data={technicals} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('technician_id', e)} />
                        <AppTextArea rows={4} label='Remarks' id='remarks' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('remarks', e.target.value)} />
                    </Stack>
                    <Button mt={20} color='green' type='submit' form='claim-form'>Submit</Button>
                </Card>
            </form >
        </Box>
    )
}
