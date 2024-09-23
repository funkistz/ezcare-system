import { AppDateTimePicker, AppInput, AppSegmentControl, AppSelect, AppTextArea } from '@/Components'
import { useForm, usePage } from '@inertiajs/react';
import { Button, Group, Stack, Text } from '@mantine/core'
import React from 'react'

export default function PaymentForm({ policy, payment, closeModal }: { policy: any, payment?: any, closeModal?: any }) {

    const { data, setData, post, put, reset, errors } = useForm({
        payment_type: payment ? ((payment.amount > 0) ? 'in' : 'out') : 'in',
        date: payment ? new Date(payment.date) : '',
        type: payment ? payment.type : 'cash',
        remarks: payment ? payment.remarks : '',
        amount: payment ? payment.amount : '',
        reason: payment ? payment.reason : '',
        userable_id: payment ? payment.userable_id : '',
        userable_type: payment ? payment.userable_type : '',
        reference: payment ? payment.reference : '',
        from: payment ? payment.from : 'dealer'
    });
    const { payment_reasons, payment_reason_select, dealers, staffs }: any = usePage().props;

    console.log('payment_reasons', payment_reasons)
    console.log('payment_reason_select', payment_reason_select)

    const payee = [
        { label: 'Dealer', value: 'dealer' },
        { label: 'Customer', value: 'customer' },
    ]

    const payment_types = [
        { label: 'Payment In', value: 'in' },
        { label: 'Payment Out', value: 'out' },
    ]

    const types = [
        { label: 'Cash', value: 'cash' },
        { label: 'Cheque', value: 'cheque' },
        { label: 'Credit Card', value: 'cc' },
        { label: 'EFT', value: 'eft' },
    ]

    const onSubmit = (e: any) => {
        e.preventDefault();

        // console.log('data', data)
        // return;

        if (payment && payment.id) {
            put(route('payment.update', payment.id), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        } else {
            put(route('policy.add_payment', policy.id), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        }

    }

    const ifStaff = () => {
        return data.reason == 'comm_to_staff';
    }

    const ifDealer = () => {
        return data.reason == 'comm_to_dealer' || data.reason == 'refund_to_dealer';
    }

    return (
        <form onSubmit={onSubmit}>
            <Stack gap={0}>
                <AppSegmentControl color='blue' size='md' id='payment_type' values={data} data={payment_types} errors={errors ? errors : null} onChange={(e: any) => {
                    setData({ ...data, payment_type: e, userable_id: '', userable_type: '', reason: '' });
                }} readOnly={payment} />
                {payment && <Text fz={14} c='red'>Cannot be edited</Text>}

                <AppSegmentControl size='xs' label='Type' id='type' values={data} data={types} errors={errors ? errors : null} onChange={(e: any) => setData('type', e)} />

                <AppSegmentControl size='xs' label='Payee' id='from' values={data} data={payee} errors={errors ? errors : null} onChange={(e: any) => setData('from', e)} />

                <AppDateTimePicker description='Date & Time' valueFormat="DD/MM/YYYY hh:mm A" required label='Date' id='date' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('date', e)} />

                <AppInput readOnly={payment} required type='Number' label='Amount' id='amount' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('amount', e.target.value)} />
                {payment && <Text fz={14} c='red'>Cannot be edited</Text>}

                {data.type != 'cash' && <>
                    <AppInput required label='Reference' id='reference' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('reference', e.target.value)} />
                </>}

                {data.payment_type == 'out' && <>
                    <AppSelect required label='Reasons' id='reason' values={data} data={payment_reason_select} errors={errors ? errors : null} onChange={(e: any) => setData('reason', e)} />
                    {ifDealer() && <AppSelect required searchable label='Dealer' id='userable_id' data={dealers} values={data} errors={errors ? errors : null} onChange={(e: any) => setData({ ...data, userable_id: e, userable_type: 'Dealer' })} />}
                    {ifStaff() && <AppSelect required searchable label='Staff' id='userable_id' data={staffs} values={data} errors={errors ? errors : null} onChange={(e: any) => setData({ ...data, userable_id: e, userable_type: 'Staff' })} />}
                </>}

                <AppTextArea label='Remarks' id='remarks' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('remarks', e.target.value)} />

                <Group justify='flex-end' mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </Stack>
        </form>
    )
}
