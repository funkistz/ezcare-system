import { AddButton, AddButtonModal, AppCard, AppSegmentControl, AppSelect, AppTable, ButtonModal, DeleteButton, HasPermission } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { usePage, router, useForm } from '@inertiajs/react';
import { Badge, Card, Divider, Flex, Group, SegmentedControl, Stack, Text } from '@mantine/core';
import moment, { Moment } from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import InspectionFilter from './components/InspectionFilter';
import AddSceduleInspection from './components/AddScheduleInspection';
import ViewScheduleInspection from './components/ViewScheduleInspection';
import AddInspection from './components/AddInspection';
import ViewInspection from './components/VIewInspection';

export default function Index() {

    const { permissions, data, log }: any = usePage().props;
    const types = [
        { label: 'Mine', value: 'mine' },
        { label: 'All', value: 'all' },
    ]

    console.log('log', log)
    console.log('data', data)

    const changeTab = (e: any) => {
        console.log('e', e)
    }

    const onDelete = (id: any) => {
        router.delete(route('inspection.destroy', id));
    }


    const tableData = (policies: any) => {

        return policies.map((value: any) => {
            return {
                'Name': value.title,
                'Status': <Badge variant='filled' color={value.status_color} size='xs'>{value.status_code}</Badge>,
                'MO': value.marketing_officer_name,
                'Created By': value.created_by_name,
                'Time': value.time,
                'action': <Group justify='end'>
                    <HasPermission permission='inspection.delete' author={value.created_by}>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                    </HasPermission>
                    <ButtonModal buttonOptions={{ children: 'View' }} modalOptions={{ title: 'View Inspection', size: 'xl' }}>
                        <ViewInspection id={value.id} type={'inspection'} />
                    </ButtonModal>
                    <ButtonModal buttonOptions={{ children: 'Edit' }} modalOptions={{ title: 'Edit Inspection', size: 'xl' }}>
                        <AddInspection values={value} type={'inspection'} />
                    </ButtonModal>
                </Group>,
            };
        })
    }

    const headerOptions = {
        'action': { ta: 'right' }
    }

    return (
        <div>
            <AppCard title='Inspection List' rightComponent={
                permissions.includes('policy.add') && <AddButtonModal title='Add Inspection'>
                    <AddInspection />
                </AddButtonModal>
            }>
                <InspectionFilter types={types} />
                <Divider color='gray.2' my={20} />
                <AppTable headerOptions={headerOptions} data={tableData(data.data)} meta={data.meta} />
            </AppCard>
        </div>
    )
}

Index.layout = (page: any) => <AdminLayout children={page} title='Manage Inspection' />;
