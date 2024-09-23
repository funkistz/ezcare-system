import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import AppSelect from '@/Components/Forms/AppSelect';
import { useForm } from '@inertiajs/react';
import AppDatePicker from '@/Components/Forms/AppDatepicker';
import AppInput from '@/Components/Forms/AppInput';
import { Button, Group, Text } from '@mantine/core';

export default function BookingForm({ vehicle_id, booking, closeModal }: any) {

    const [users, setUsers] = useState(false);
    const [customers, setCustomers] = useState(false);
    const [customer, setCustomer] = useState<any>(null);
    const [customerChecked, setCustomerChecked] = useState<any>(false);

    const { data, setData, post, put, reset, errors } = useForm<any>({
        vehicle_id: vehicle_id ? vehicle_id : '',
        salesman_id: booking ? booking.salesman_id : '',
        date: booking ? booking.date : '',
        customer_ic: booking ? booking.customer_ic : '',
        customer_name: booking ? booking.customer_name : '',
        customer_id: booking ? booking.customer_id : '',
        customer_phone: booking ? booking.customer_phone : '',
    });

    const onChange = (e: any) => {

        if (e.target.id == 'customer_ic') {
            setCustomerChecked(false);
        }

        setData({ ...data, [e.target.id]: e.target.value })
    };

    const checkCustomer = (ic: any) => {
        axios.get(route('customer.check_customer'), {
            params: {
                ic: ic
            }
        }).then((response) => {
            if (response.data && response.data.data) {
                setCustomer(response.data.data);
                console.log('customer', response.data.data);
            } else {
                setCustomer(null);
                setData({ ...data, 'customer_name': '' })
            }

            setCustomerChecked(true);
        });
    };

    useEffect(() => {

        axios.get(route('user.ajax')).then((response) => {
            setUsers(response.data.data);
        });
        axios.get(route('customer.ajax')).then((response) => {
            setCustomers(response.data.data);
        });

    }, [])

    useEffect(() => {

        if (customer) {
            setData({
                ...data,
                'customer_name': customer.full_name,
                'customer_id': customer.id,
                'customer_phone': customer.phone_no,
            })
        }

    }, [customer]);

    const onSubmit = (e: any) => {
        e.preventDefault();

        post(route('booking.store'), {
            data,
            onSuccess: () => {
                reset(),
                    close()
                closeModal()
            },
        });
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppSelect label='Salesman' id='salesman_id' placeholder='Salesman' data={users} onChange={onChange} value={data.salesman_id} />
                <AppDatePicker label='Date' id='date' placeholder='Date' required values={data} onChange={onChange} errors={errors} />
                <AppInput label='Customer IC' id='customer_ic' required value={data.customer_ic} onChange={onChange} error={errors.customer_ic}></AppInput>
                <Group>
                    <Button color="orange" radius="xl" size='xs' mt='xs' onClick={() => { checkCustomer(data.customer_ic) }}>
                        Check Customer
                    </Button>
                    {customerChecked && customer && <Text mt='sm' color='green'>Customer Exist!</Text>}
                    {customerChecked && !customer && <Text mt='sm' color='red'>Customer Not Exist!</Text>}
                </Group>

                <AppInput label='Customer Name' id='customer_name' required value={data.customer_name} onChange={onChange} error={errors.customer_name}></AppInput>
                <AppInput label='Customer Phone' id='customer_phone' required value={data.customer_phone} onChange={onChange} error={errors.customer_phone}></AppInput>

                <AppInput label='Booking Amount' id='amount' required value={data.amount} onChange={onChange} error={errors.amount} type="number"></AppInput>

                <Group position="right" mt='xl'>
                    <Button type='submit'>Add Booking</Button>
                </Group>
            </form>
        </>
    )
}
