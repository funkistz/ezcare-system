import AdminLayout from '@/Components/layout/AdminLayout';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { ReportViewer } from '@/features/app-report';
import { AppCard, AppDatePicker, AppSelect } from '@/Components';
import { Box, Group, Text } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';
import moment from 'moment';

export default function PolicySimple() {

    const { policies, branches } = usePage<any>().props;
    const queryParams = new URLSearchParams(window.location.search);

    const tableData = (data: []) => {

        const values: any = [];
        data && data.map((value: any) => {
            values.push({
                'policy no': value.policy_no,
                'invoice no': value.invoice_no,
                'invoice date': value.invoice_date,
                'name': value.name,
                'ic': value.ic,
                'phone': value.phone,
                'vehicle': value.vehicle,
                'year': value.year,
                'reg date': value.registartion_date,
                'reg no': value.registartion_no,
                'chassis no': value.chassis_no,
                'engine no': value.engine_no,
                'plan': value.plan,
                'period': value.period,
                'additional year': value.additional_year,
                'activate date': value.activated_at,
                'expired date': value.expired_at,
                'dealer': value.dealer,
                'salesman': value.salesman,
                'M.O': value.mo,
                'status': value.status,
                'payment status': value.payment_status,
                'NETT paid (RM)': value.nett,
                'SSM (RM)': value.tax,
                'price (RM)': value.price,
                'paid (RM)': value.paid,
                'paid at': value.paid_at,
                'outstanding (RM)': value.outstanding,
                'overpaid (RM)': value.overpaid,
                'created at': value.created_at,
            });
        })
        return values;
    }

    const headers = {
        'policy no': { miw: 80 },
        'invoice no': { miw: 80 },
        'invoice date': { miw: 100 },
        'reg date': { miw: 80 },
        'chassis no': { miw: 80 },
        'engine no': { miw: 80 },
        'additional year': { miw: 110 },
        'activate date': { miw: 100 },
        'expired date': { miw: 100 },
    }

    // console.log('test', moment(queryParams.get('createdDateFrom'), 'YYYY-MM-DD'))

    const [branch, setBranch] = useState(queryParams.get('branch') ? String(queryParams.get('branch')) : '');
    const [createdDateFrom, setCreatedDateFrom] = useState(queryParams.get('createdDateFrom') ? moment(queryParams.get('createdDateFrom'), 'YYYY-MM-DD').toDate() : null);
    const [createdDateTo, setCreatedDateTo] = useState(queryParams.get('createdDateTo') ? moment(queryParams.get('createdDateTo'), 'YYYY-MM-DD').toDate() : null);
    const [invoiceDateFrom, setInvoiceDateFrom] = useState(queryParams.get('invoiceDateFrom') ? moment(queryParams.get('invoiceDateFrom'), 'YYYY-MM-DD').toDate() : null);
    const [invoiceDateTo, setInvoiceDateTo] = useState(queryParams.get('invoiceDateTo') ? moment(queryParams.get('invoiceDateTo'), 'YYYY-MM-DD').toDate() : null);
    const [activatedDateFrom, setActivatedDateFrom] = useState(queryParams.get('activatedDateFrom') ? moment(queryParams.get('activatedDateFrom'), 'YYYY-MM-DD').toDate() : null);
    const [activatedDateTo, setActivatedDateTo] = useState(queryParams.get('activatedDateTo') ? moment(queryParams.get('activatedDateTo'), 'YYYY-MM-DD').toDate() : null);
    const [paymentDateFrom, setPaymentDateFrom] = useState(queryParams.get('paymentDateFrom') ? moment(queryParams.get('paymentDateFrom'), 'YYYY-MM-DD').toDate() : null);
    const [paymentDateTo, setPaymentDateTo] = useState(queryParams.get('paymentDateTo') ? moment(queryParams.get('paymentDateTo'), 'YYYY-MM-DD').toDate() : null);

    const [filter, setFilter] = useState<any>({});

    useDidUpdate(() => {

        console.log('createdDateFrom', createdDateFrom)

        setFilter({
            branch: branch ? branch : '',
            createdDateFrom: createdDateFrom ? moment(createdDateFrom).format('YYYY-MM-DD') : '',
            createdDateTo: createdDateTo ? moment(createdDateTo).format('YYYY-MM-DD') : '',
            invoiceDateFrom: invoiceDateFrom ? moment(invoiceDateFrom).format('YYYY-MM-DD') : '',
            invoiceDateTo: invoiceDateTo ? moment(invoiceDateTo).format('YYYY-MM-DD') : '',
            activatedDateFrom: activatedDateFrom ? moment(activatedDateFrom).format('YYYY-MM-DD') : '',
            activatedDateTo: activatedDateTo ? moment(activatedDateTo).format('YYYY-MM-DD') : '',
            paymentDateFrom: paymentDateFrom ? moment(paymentDateFrom).format('YYYY-MM-DD') : '',
            paymentDateTo: paymentDateTo ? moment(paymentDateTo).format('YYYY-MM-DD') : '',
        });

    }, [branch, createdDateFrom, createdDateTo, invoiceDateFrom, invoiceDateTo, activatedDateFrom, activatedDateTo, paymentDateFrom, paymentDateTo])

    return (
        <AppCard>
            <Group justify='end' mb={30} align='end' gap='xs'>
                <Text mb={5} fz={18}>Filter:</Text>
                <AppSelect label='Branch' data={branches} clearable value={branch} onChange={(e: any) => { setBranch(e) }} />
                <Group align='end'>
                    <AppDatePicker noTimeZone label='Created Date' placeholder='From' value={createdDateFrom} onChange={(e: any) => { console.log('createdDateFrom x', e); setCreatedDateFrom(e) }} />
                    <AppDatePicker noTimeZone placeholder='To' value={createdDateTo} onChange={(e: any) => { setCreatedDateTo(e) }} />
                </Group>
                <Group align='end'>
                    <AppDatePicker noTimeZone label='Activate Date' placeholder='From' value={activatedDateFrom} onChange={(e: any) => { setActivatedDateFrom(e) }} />
                    <AppDatePicker noTimeZone placeholder='To' value={activatedDateTo} onChange={(e: any) => { setActivatedDateTo(e) }} />
                </Group>
                <Group align='end'>
                    <AppDatePicker noTimeZone label='Invoice Date' placeholder='From' value={invoiceDateFrom} onChange={(e: any) => { setInvoiceDateFrom(e) }} />
                    <AppDatePicker noTimeZone placeholder='To' value={invoiceDateTo} onChange={(e: any) => { setInvoiceDateTo(e) }} />
                </Group>
                <Group align='end'>
                    <AppDatePicker noTimeZone label='Date Payment' placeholder='From' value={paymentDateFrom} onChange={(e: any) => { setPaymentDateFrom(e) }} />
                    <AppDatePicker noTimeZone placeholder='To' value={paymentDateTo} onChange={(e: any) => { setPaymentDateTo(e) }} />
                </Group>
            </Group>
            <ReportViewer data={tableData(policies.data)}
                headerOptions={headers}
                canSort={[
                    { label: 'policy no', value: 'policy_no' },
                    // { label: 'M.O', value: 'marketing_officer.name' },
                ]}
                meta={policies.meta}
                filter={filter}
            />
        </AppCard>
    )
}

PolicySimple.layout = (page: any) => <AdminLayout children={page} title='Policy Report' />;
