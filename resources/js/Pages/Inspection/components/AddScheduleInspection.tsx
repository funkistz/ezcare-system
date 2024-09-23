import React, { useEffect, useRef, useState } from 'react'
import moment, { Moment } from 'moment'
import { Box, Button, Group, Text, ActionIcon, Stack, Flex, Card, Divider, SimpleGrid, Center, SegmentedControl, Select, Badge, TextInput, Textarea } from '@mantine/core';
import { IconArrowLeft, IconCalendar, IconCar, IconCertificate2, IconChevronLeft, IconChevronRight, IconClipboardText, IconDiscount2, IconMap2, IconMinus, IconPlus, IconUserCog, IconUserDollar } from '@tabler/icons-react';
import { useForm, usePage } from '@inertiajs/react';
import { AppDateTimePicker, AppInput, AppSelect, AppTextArea } from '@/Components';

const AddSceduleInspection = ({ closeModal, claim, values }: any) => {

    const { permissions, branches, mos, technicals, dealers, free_promos, warranty_plans, periods }: any = usePage().props;

    const types = [
        { 'label': 'New', 'value': 'new' },
        { 'label': 'Renewal', 'value': 'renewal' },
        { 'label': 'Claim Case', 'value': 'claim' }
    ]

    const { data, setData, post, put, reset, errors } = useForm({
        type: values ? values.type : (claim ? 'claim' : 'new'),
        branch_id: values ? values.branch_id : (claim ? String(claim.policy.branch_id) : ''),
        policy_no: values ? values.policy_no : (claim ? String(claim.policy.policy_no) : ''),
        policy_id: values ? values.policy_id : (claim ? String(claim.policy.id) : ''),
        date: values ? new Date(values.date) : null,
        technician_id: values ? values.technician_id : (claim ? String(claim.technician_id) : ''),
        technician_branch_id: values ? values.technician_branch_id : (claim ? String(claim.policy.branch_id) : ''),
        marketing_officer_id: values ? values.marketing_officer_id : (claim ? String(claim.policy.marketing_officer_id) : ''),
        warranty_plan_id: values ? values.warranty_plan_id : '',
        dealer_id: values ? values.dealer_id : '',
        period: values ? values.period : '',
        free_promo_id: values ? values.free_promo_id : '',
        vehicle_total: values ? values.vehicle_total : '',
        location: values ? values.location : '',
        remarks: values ? values.remarks : '',
        claim_id: values ? values.claim_id : (claim ? claim.id : ''),
    });


    const onChangeVehicleTotal = (type: any) => {

        let total = 1;
        if (type == 'add') {
            total = Number(data.vehicle_total) + 1;
        } else {
            total = Number(data.vehicle_total) - 1;
        }

        setData('vehicle_total', String(total));
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();

        if (values) {
            put(route('schedule-inspection.update', values.id), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal()
                },
            });
        } else {
            post(route('schedule-inspection.store'), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal()
                },
            });
        }

    }

    return (
        <Box bg='white' h='100%'>
            <form onSubmit={onSubmit}>
                <Stack pb={30} gap={10}>
                    <Stack mt={10} mb={10}>
                        <SegmentedControl data={types} size='sm' color='primary' radius='md' bg='primary.0' value={data.type} readOnly={!!claim} onChange={(e) => setData('type', e)} />
                    </Stack>

                    <AppDateTimePicker required leftSection={<IconCalendar color='black' />} placeholder='Appointment Date*' id='date' errors={errors} value={data.date} onChange={(e: any) => setData('date', e)} />

                    {data.type == 'claim' && <AppInput required label='Policy No*' id='policy_no' errors={errors} value={data.policy_no} readOnly={!!claim} onChange={(e: any) => setData('policy_no', e.target.value)} />}

                    {data.type != 'claim' && <>
                        <Divider my={10} label="Staff & Dealer" />
                        <AppSelect required searchable leftSection={<IconUserCog color='black' />} placeholder='Technician*' id='technician_id' errors={errors} data={technicals} value={data.technician_id} onChange={(e: any) => setData('technician_id', e)} />
                        <AppSelect
                            required
                            searchable
                            leftSection={<Text fz={14} fw='bolder' c='black'>MO</Text>}
                            placeholder='Marketing Officer*'
                            data={mos}
                            id='marketing_officer_id' errors={errors}
                            value={data.marketing_officer_id} onChange={(e: any) => setData('marketing_officer_id', e)}
                        />
                        <AppSelect required searchable leftSection={<IconUserDollar color='black' />} placeholder='Dealer*' id='dealer_id' errors={errors} data={dealers} value={data.dealer_id} onChange={(e: any) => setData('dealer_id', e)} />
                    </>}

                    {data.type == 'claim' && <>
                        <AppSelect
                            searchable
                            leftSection={<Text fz={16} fw='bolder' c='black'>MO</Text>}
                            placeholder='Marketing Officer'
                            id='marketing_officer_id' errors={errors}
                            value={data.marketing_officer_id} onChange={(e: any) => setData('marketing_officer_id', e.target.value)}
                            data={mos}
                            readOnly={!!claim}
                        />
                        <AppSelect required searchable leftSection={<IconUserCog color='black' />} placeholder='Technician Branch*' id='technician_branch_id' errors={errors}
                            value={data.technician_branch_id}
                            onChange={(e: any) => setData('technician_branch_id', e)} data={branches}
                            readOnly={!!claim}
                        />
                    </>}

                    {data.type != 'claim' && <Divider my={10} label="Inspection Details" />}

                    {data.type != 'claim' && <>
                        <AppSelect required searchable leftSection={<IconCertificate2 color='black' />} placeholder='Warranty Plan*' data={warranty_plans} id='warranty_plan_id' errors={errors} value={data.warranty_plan_id} onChange={(e: any) => setData('warranty_plan_id', e)} />
                        <AppSelect required leftSection={<IconCalendar color='black' />} placeholder='Period*' data={periods} id='period' errors={errors} value={data.period} onChange={(e: any) => setData('period', e)} />
                        <Group gap={10} grow>
                            <AppInput type='number' required leftSection={<IconCar color='black' />} placeholder='No Of Vehicles*' id='vehicle_total' errors={errors} value={data.vehicle_total} onChange={(e: any) => setData('vehicle_total', e)} maw={1000} ta='right' />
                            <ActionIcon variant="filled" color="primary.4" size='lg' radius='md' maw={45} onClick={() => onChangeVehicleTotal('minus')}>
                                <IconMinus style={{ width: '50%', height: '50%' }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon variant="filled" color="primary.4" size='lg' radius='md' maw={45} onClick={() => onChangeVehicleTotal('add')}>
                                <IconPlus style={{ width: '50%', height: '50%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                        <AppSelect leftSection={<IconDiscount2 color='black' />} placeholder='Promo' id='free_promo_id' errors={errors} data={free_promos} value={data.free_promo_id} onChange={(e: any) => setData('free_promo_id', e)} />
                    </>
                    }

                    {data.type == 'claim' && <AppInput leftSection={<IconMap2 color='black' />} placeholder='Location*' id='location' errors={errors} value={data.location} onChange={(e: any) => setData('location', e.target.value)} />}

                    <AppTextArea placeholder='Remarks' id='remarks' errors={errors} value={data.remarks} onChange={(e: any) => setData('remarks', e.target.value)} />

                    <Divider my={10} variant="dashed" />

                    <Button type='submit' size='sm' radius='md' color='primary'>Add Schedule</Button>
                </Stack>
            </form>
        </Box>
    );
};

export default AddSceduleInspection;