import AdminLayout from '@/Components/layout/AdminLayout';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { ReportViewer } from '@/features/app-report';
import { AppCard, AppDatePicker, AppSelect } from '@/Components';
import { AspectRatio, Box, Group, Text } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';
import moment from 'moment';
import { PDFViewer } from '@react-pdf/renderer';
import { PolicyInvoicePDFId } from '@/features/app-pdf';
import SOAPDF from '@/features/app-pdf/components/SOAPDF';
import { router } from '@inertiajs/react';
import OSPDF from '@/features/app-pdf/components/OSPDF';

export default function OS() {

    const { policies, branches, dealers, data } = usePage<any>().props;
    const queryParams = new URLSearchParams(window.location.search);

    console.log('data', data)

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
                'price': value.price,
                'paid': value.paid,
                'paid at': value.paid_at,
                'outstanding': value.balance,
                'overpaid': value.outstanding,
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

    const [branch, setBranch] = useState(queryParams.get('dealer') ? String(queryParams.get('branch')) : '');
    const [dealer, setDealer] = useState(queryParams.get('dealer') ? String(queryParams.get('dealer')) : '');
    const [createdDateFrom, setCreatedDateFrom] = useState<any>(queryParams.get('createdDateFrom') ? moment(queryParams.get('createdDateFrom'), 'YYYY-MM-DD').toDate() : null);
    const [createdDateTo, setCreatedDateTo] = useState<any>(queryParams.get('createdDateTo') ? moment(queryParams.get('createdDateTo'), 'YYYY-MM-DD').toDate() : null);
    const [invoiceDateFrom, setInvoiceDateFrom] = useState(queryParams.get('invoiceDateFrom') ? moment(queryParams.get('invoiceDateFrom'), 'YYYY-MM-DD').toDate() : null);
    const [invoiceDateTo, setInvoiceDateTo] = useState(queryParams.get('invoiceDateTo') ? moment(queryParams.get('invoiceDateTo'), 'YYYY-MM-DD').toDate() : null);
    const [activatedDateFrom, setActivatedDateFrom] = useState(queryParams.get('activatedDateFrom') ? moment(queryParams.get('activatedDateFrom'), 'YYYY-MM-DD').toDate() : null);
    const [activatedDateTo, setActivatedDateTo] = useState(queryParams.get('activatedDateTo') ? moment(queryParams.get('activatedDateTo'), 'YYYY-MM-DD').toDate() : null);

    const [filter, setFilter] = useState<any>({});

    useDidUpdate(() => {

        handleOnChange();
        // setFilter({
        //     branch: branch ? branch : '',
        //     dealer: dealer ? dealer : '',
        //     createdDateFrom: createdDateFrom ? moment(createdDateFrom).format('YYYY-MM-DD') : '',
        //     createdDateTo: createdDateTo ? moment(createdDateTo).format('YYYY-MM-DD') : '',
        // });

    }, [branch, dealer, invoiceDateFrom, invoiceDateTo])

    const handleOnChange = async () => {

        branch ? queryParams.set('branch', branch) : queryParams.set('branch', '');
        dealer ? queryParams.set('dealer', dealer) : queryParams.set('dealer', '');

        invoiceDateFrom ? queryParams.set('invoiceDateFrom', moment(invoiceDateFrom).format('YYYY-MM-DD')) : queryParams.delete('invoiceDateFrom');
        invoiceDateTo ? queryParams.set('invoiceDateTo', moment(invoiceDateTo).format('YYYY-MM-DD')) : queryParams.delete('invoiceDateTo');
        activatedDateFrom ? queryParams.set('activatedDateFrom', moment(activatedDateFrom).format('YYYY-MM-DD')) : queryParams.delete('activatedDateFrom');
        activatedDateTo ? queryParams.set('activatedDateTo', moment(activatedDateTo).format('YYYY-MM-DD')) : queryParams.delete('activatedDateTo');

        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${queryParams}`;
        router.get(newUrl);
    }

    return (
        <AppCard>
            <Group justify='end' mb={30} align='end' gap='xs'>
                <Text mb={5} fz={18}>Filter:</Text>
                <AppSelect label='Branch' data={branches} clearable searchable value={branch} onChange={(e: any) => { setBranch(e) }} />
                <AppSelect label='Dealer' data={dealers} clearable searchable value={dealer} onChange={(e: any) => { setDealer(e) }} />
                <Group align='end'>
                    <AppDatePicker noTimeZone label='Activate Date' placeholder='From' value={activatedDateFrom} onChange={(e: any) => { setActivatedDateFrom(e) }} />
                    <AppDatePicker noTimeZone placeholder='To' value={activatedDateTo} onChange={(e: any) => { setActivatedDateTo(e) }} />
                </Group>
                <Group align='end'>
                    <AppDatePicker noTimeZone label='Invoice Date' placeholder='From' value={invoiceDateFrom} onChange={(e: any) => { setInvoiceDateFrom(e) }} />
                    <AppDatePicker noTimeZone placeholder='To' value={invoiceDateTo} onChange={(e: any) => { setInvoiceDateTo(e) }} />
                </Group>
            </Group>
            {!!dealer && <AspectRatio ratio={1 / 1.41} mah={1000} mx={'auto'}>
                <PDFViewer height={1000} key={Date.now()}>
                    <OSPDF data={data} title={Date.now()} key={Date.now()} />
                </PDFViewer>
            </AspectRatio>}
        </AppCard>
    )
}

OS.layout = (page: any) => <AdminLayout children={page} title='Policy Report' />;
