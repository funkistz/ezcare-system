import { usePage, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AddButton, UpdateButton, AppSelect, DeleteButton, HasPermission } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, TextInput, Stack, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { DateInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import PolicyStatusBadge from './components/PolicyStatusBadge';
import { useDebouncedState, useDebouncedValue, useDidUpdate } from '@mantine/hooks';
import moment from 'moment';
import BalanceStatus from './components/BalanceStatus';

export default function Index() {

    const { policies, permissions, settings }: any = usePage().props;
    let query: any = usePage().props.ziggy;
    query = query.query;

    const statuses = [
        { label: 'Draft', value: 'draft' },
        { label: 'Activated', value: 'activated' },
        { label: 'Deactivated', value: 'deactivated' },
        { label: 'Void', value: 'void' },
    ];

    const payment_statuses = [
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Paid', value: 'paid' },
        { label: 'Partial', value: 'partial' },
        { label: 'FOC', value: 'foc' },
    ]

    const { data, setData, post, put, reset, errors } = useForm({
        customer_search: query ? query.customer_search : '',
        document_search: query ? query.document_search : '',
        date_created_from: query.date_created_from ? moment(query.date_created_from) : '',
        date_created_to: query.date_created_to ? moment(query.date_created_to) : '',
        date_activated_from: query.date_activated_from ? moment(query.date_activated_from) : '',
        date_activated_to: query.date_activated_to ? moment(query.date_activated_to) : '',
        date_expired_from: query.date_expired_from ? moment(query.date_expired_from) : '',
        date_expired_to: query.date_expired_to ? moment(query.date_expired_to) : '',
        date_payment_from: query.date_payment_from ? moment(query.date_payment_from) : null,
        date_payment_to: query.date_payment_to ? moment(query.date_payment_to) : null,
        status: query ? query.status : '',
        payment_status: query ? query.payment_status : '',
    });

    console.log('data', data)

    const [customerSearchDebounced] = useDebouncedValue(data.customer_search, 300);
    const [documentSearchDebounced] = useDebouncedValue(data.document_search, 300);

    // useEffect(() => {
    //     setData('customer_search', customerSearch);
    // }, [customerSearch]);
    // useEffect(() => {
    //     setData('document_search', documentSearch);
    // }, [documentSearch])

    useDidUpdate(() => {

        const newData: any = { ...data };
        newData.date_created_from = data.date_created_from ? moment(data.date_created_from).format('YYYY-MM-DD') : null;
        newData.date_created_to = data.date_created_to ? moment(data.date_created_to).format('YYYY-MM-DD') : null;
        newData.date_activated_from = data.date_activated_from ? moment(data.date_activated_from).format('YYYY-MM-DD') : null;
        newData.date_activated_to = data.date_activated_to ? moment(data.date_activated_to).format('YYYY-MM-DD') : null;
        newData.date_expired_from = data.date_expired_from ? moment(data.date_expired_from).format('YYYY-MM-DD') : null;
        newData.date_expired_to = data.date_expired_to ? moment(data.date_expired_to).format('YYYY-MM-DD') : null;
        newData.date_payment_from = data.date_payment_from ? moment(data.date_payment_from).format('YYYY-MM-DD') : null;
        newData.date_payment_to = data.date_payment_to ? moment(data.date_payment_to).format('YYYY-MM-DD') : null;

        router.reload({
            data: newData,
            preserveState: true
        });

    }, [customerSearchDebounced, documentSearchDebounced, data.date_created_from, data.date_created_to,
        data.date_activated_from, data.date_activated_to, data.date_expired_from, data.date_expired_to, data.date_payment_from, data.date_payment_to,
        data.status, data.payment_status]);

    const goToAddPage = () => {
        router.get(route('policy.create'));
    }

    const tableData = (policies: any) => {

        return policies.map((value: any) => {
            return {
                'Policy No': <Stack gap={0}>
                    <Text fz='sm'>Policy No: {value.policy_no}</Text>
                    <Group gap='xs'>
                        <Text fz='sm'>Invoice No:</Text>
                        <Text fz='sm' tt='uppercase'>{value.active_invoice?.invoice_no}</Text>
                    </Group>
                </Stack>,
                'Customer': <Stack gap={0}>
                    <Text fz='sm'>{value.customer.full_name}</Text>
                    <Text fz='sm'>Phone: {value.customer.phone_no}</Text>
                </Stack>,
                'Vehicle': <Stack gap={0}>
                    <Text fz='sm' tt='uppercase'>{value.vehicle?.name}</Text>
                    <Text fz='sm'>{value.vehicle?.registration_no}</Text>
                </Stack>,
                'Status': <Group gap='xs'>
                    <PolicyStatusBadge size='sm' status={value.status_code} />
                </Group>,
                'Payment': <Group gap='xs'>
                    <PolicyStatusBadge size='sm' status={value.payment_status_code} />
                    {!value.is_foc && <BalanceStatus balance={value.balance_payment} currency={settings.currency_symbol?.value} />}
                </Group>,
                'Created': <Stack gap={0}>
                    <Text fz='sm'>At: {moment(value.created_at).format('DD MMM yyy')}</Text>
                    <Text fz='sm'>By: {value.created_by_name}</Text>
                </Stack>,
                'Activated At': moment(value.activated_at).format('DD MMM yyy'),
                'Expired At': moment(value.expired_at).format('DD MMM yyy'),
                'action':
                    <Group justify='right'>
                        <HasPermission permission='policy.delete' author={value.created_by}>
                            <DeleteButton onDelete={() => onDelete(value.id)} />
                        </HasPermission>
                        <UpdateButton label='View' onClick={() => router.get(route('policy.show', value.id))} />
                    </Group>
            };
        })
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    const onDelete = (id: any) => {
        router.delete(route('policy.destroy', id));
    }

    return (
        <div>
            <AppCard title='Policy List' rightComponent={
                permissions.includes('policy.add') && <AddButton onClick={goToAddPage} />
            }>
                <Box p={'md'} mb={'md'}>
                    <Text fw={'bold'} mb={5}>Filter:</Text>
                    <Group gap={10}>
                        <TextInput mt={8} label="Document:" placeholder='Search by Policy, Invoice, Reg, Chassis No' my={0} w={350} value={data.document_search} onChange={(e) => setData('document_search', e.target.value)} />
                        <TextInput mt={8} label="Customer:" placeholder='Search by KPT or Name' my={0} w={350} value={data.customer_search} onChange={(e) => setData('customer_search', e.target.value)} />
                        <AppSelect label='Status:' my={0} data={statuses} value={data.status} onChange={(e: any) => setData('status', e)} />
                        <AppSelect label='Payment Status:' my={0} data={payment_statuses} value={data.payment_status} onChange={(e: any) => setData('payment_status', e)} />
                    </Group>
                    <Stack gap={10} mt={10}>
                        <Group>
                            <DateInput
                                label='Date Created:'
                                w={140}
                                valueFormat="DD/MM/YYYY"
                                placeholder="from"
                                clearable
                                value={data.date_created_from} onChange={(e) => setData('date_created_from', e)}
                            />
                            <DateInput
                                label=' '
                                w={140}
                                valueFormat="DD/MM/YYYY"
                                placeholder="to"
                                clearable
                                value={data.date_created_to} onChange={(e) => setData('date_created_to', e)}
                            />
                        </Group>
                        <Group>
                            <Group>
                                <DateInput
                                    label='Date Activation:'
                                    w={140}
                                    valueFormat="DD/MM/YYYY"
                                    placeholder="from"
                                    clearable
                                    value={data.date_activated_from} onChange={(e) => setData('date_activated_from', e)}
                                />
                                <DateInput
                                    label=' '
                                    w={140}
                                    valueFormat="DD/MM/YYYY"
                                    placeholder="to"
                                    clearable
                                    value={data.date_activated_to} onChange={(e) => setData('date_activated_to', e)}
                                />
                            </Group>
                            {/* <Group>
                                <DateInput
                                    label='Date Expiry:'
                                    w={140}
                                    valueFormat="DD/MM/YYYY"
                                    placeholder="from"
                                    clearable
                                />
                                <DateInput
                                    label=' '
                                    w={140}
                                    valueFormat="DD/MM/YYYY"
                                    placeholder="to"
                                    clearable
                                />
                            </Group> */}
                            <Group>
                                <DateInput
                                    label='Date Payment:'
                                    w={140}
                                    valueFormat="DD/MM/YYYY"
                                    placeholder="from"
                                    clearable
                                    value={data.date_payment_from}
                                    onChange={(e) => setData('date_payment_from', e)}
                                />
                                <DateInput
                                    label=' '
                                    w={140}
                                    valueFormat="DD/MM/YYYY"
                                    placeholder="to"
                                    clearable
                                    value={data.date_payment_to}
                                    onChange={(e) => setData('date_payment_to', e)}
                                />
                            </Group>
                        </Group>
                    </Stack>
                </Box>
                <Divider color='gray.2' />
                <AppTable headerOptions={headerOptions} data={tableData(policies.data)} meta={policies.meta} />
            </AppCard>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Policy' />;