import React, { useEffect, useRef, useState } from 'react'
import moment, { Moment } from 'moment'
import { Box, Button, Group, Text, ActionIcon, Stack, Flex, Card, Divider, SimpleGrid, Center, SegmentedControl, Select, Badge, TextInput, Textarea } from '@mantine/core';
import { IconArrowLeft, IconBuildingStore, IconCalendar, IconCar, IconCarCrash, IconCertificate2, IconChevronLeft, IconChevronRight, IconClipboardText, IconDiscount2, IconMap2, IconMinus, IconPlus, IconRoad, IconUserCog, IconUserDollar } from '@tabler/icons-react';
import { useForm, usePage } from '@inertiajs/react';
import { AppDateTimePicker, AppInput, AppSelect, AppTextArea } from '@/Components';

const AddInspection = ({ closeModal, claim, values }: any) => {

    const { permissions, branches, mos, technicals, dealers, free_promos, warranty_plans, periods }: any = usePage().props;

    const types = [
        { 'label': 'New', 'value': 'new' },
        { 'label': 'Renewal', 'value': 'renewal' },
        { 'label': 'Claim Case', 'value': 'claim' }
    ]

    console.log('claim', claim)

    const { data, setData, post, put, reset, errors } = useForm({
        type: values ? values.type : (claim ? 'claim' : 'new'),
        branch_id: values ? values.branch_id : (claim ? String(claim.policy.branch_id) : ''),
        policy_no: values ? values.policy_no : (claim ? String(claim.policy.policy_no) : ''),
        period: values ? values.period : '',
        technician_id: values ? values.technician_id : (claim ? String(claim.technician_id) : ''),
        technician_branch_id: values ? values.technician_branch_id : '',
        marketing_officer_id: values ? values.marketing_officer_id : (claim ? String(claim.policy.marketing_officer_id) : ''),
        warranty_plan_id: values ? values.warranty_plan_id : '',
        dealer_id: values ? values.dealer_id : '',
        free_promo_id: values ? values.free_promo_id : '',
        vehicle: values ? values.vehicle : '',
        chassis: values ? values.chassis : '',
        mileage: values ? values.mileage : '',
        remarks: values ? values.remarks : '',
        claim_id: values ? values.claim_id : (claim ? claim.id : ''),
    });

    useEffect(() => {
    }, [])


    console.log('errors', errors)

    const onSubmit = async (e: any) => {
        e.preventDefault();

        if (values) {
            put(route('inspection.update', values.id), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal()
                },
            });
        } else {
            post(route('inspection.store'), {
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

                    <AppSelect searchable leftSection={<IconBuildingStore color='black' />} placeholder='Branch*' id='branch_id' readOnly={!!claim} errors={errors} value={data.branch_id} onChange={(e: any) => setData('branch_id', e)} data={branches} />

                    {data.type == 'claim' && <AppInput required label='Policy No*' id='policy_no' errors={errors} value={data.policy_no} readOnly={!!claim} onChange={(e: any) => setData('policy_no', e.target.value)} />}

                    <Divider my={10} label="Staff & Dealer" />

                    {data.type != 'claim' && <>
                        <AppSelect leftSection={<IconUserDollar color='black' />} placeholder='Dealer*' id='dealer_id' errors={errors} value={data.dealer_id} onChange={(e: any) => setData('dealer_id', e)} data={dealers} />
                    </>}

                    <AppSelect
                        searchable
                        leftSection={<Text fz={14} fw='bolder' c='black'>MO</Text>}
                        id='marketing_officer_id' errors={errors} value={data.marketing_officer_id} onChange={(e: any) => setData('marketing_officer_id', e)}
                        data={mos}
                        readOnly={!!claim}
                    />
                    <AppSelect searchable leftSection={<IconUserCog color='black' />} placeholder='Technician*' data={technicals} id='technician_id' errors={errors}
                        value={data.technician_id} onChange={(e: any) => setData('technician_id', e)}
                        readOnly={!!claim}
                    />

                    <Divider my={10} label="Inspection Details" />

                    {data.type != 'claim' && <>
                        <AppSelect searchable leftSection={<IconCertificate2 color='black' />} placeholder='Warranty Plan*' data={warranty_plans} id='warranty_plan_id' errors={errors} value={data.warranty_plan_id} onChange={(e: any) => setData('warranty_plan_id', e)} />
                        <AppSelect leftSection={<IconCalendar color='black' />} placeholder='Period*' data={periods} id='period' errors={errors} value={data.period} onChange={(e: any) => setData('period', e)} />
                        <AppSelect leftSection={<IconDiscount2 color='black' />} placeholder='Promo*' data={free_promos} id='free_promo_id' errors={errors} value={data.free_promo_id} onChange={(e: any) => setData('free_promo_id', e)} />
                        <Divider my={10} label="Vehicle Details" />
                        <AppInput leftSection={<IconCar color='black' />} placeholder='Vehicle*' id='vehicle' errors={errors} value={data.vehicle} onChange={(e: any) => setData('vehicle', e.target.value)} />
                        <AppInput leftSection={<IconCarCrash color='black' />} placeholder='Chassis*' id='chassis' errors={errors} value={data.chassis} onChange={(e: any) => setData('chassis', e.target.value)} />
                    </>
                    }
                    <AppInput leftSection={<IconRoad color='black' />} placeholder='Mileage*' id='mileage' errors={errors} value={data.mileage} onChange={(e: any) => setData('mileage', e.target.value)} />

                    <AppTextArea placeholder='Remarks' id='remarks' errors={errors} value={data.remarks} onChange={(e: any) => setData('remarks', e.target.value)} />

                    <Divider my={10} variant="dashed" />

                    <Button type='submit' size='sm' radius='md' color='primary'>Add Inspection</Button>
                </Stack>
            </form>
        </Box>
    );
};

export default AddInspection;