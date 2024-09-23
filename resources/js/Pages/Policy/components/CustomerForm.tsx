import { AppDataShow, AppInput, AppYearPicker, AppDatePicker, AppSelect } from '@/Components';
import { useForm, usePage } from '@inertiajs/react';
import { Stack, Group, Button, TextInput, Text } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CustomerForm({ customer, user, closeModal }: { customer: any, user?: any, closeModal?: any }) {

    const { countries, settings }: any = usePage().props;

    const { data, setData, post, put, reset, errors } = useForm({
        // id: vehicle.id,
        ic: customer ? customer.ic : '',
        first_name: customer ? customer.first_name : '',
        last_name: customer ? customer.last_name : '',
        nationality: customer ? customer.nationality : '',
        email: customer ? customer.email : '',
        phone_no: customer ? customer.phone_no : '',

        address_id: customer.main_address ? customer.main_address.id : '',
        line1: customer.main_address ? customer.main_address.line1 : '',
        line2: customer.main_address ? customer.main_address.line2 : '',
        line3: customer.main_address ? customer.main_address.line3 : '',
        city: customer.main_address ? customer.main_address.city : '',
        postcode: customer.main_address ? customer.main_address.postcode : '',
        // country: values ? values.country : 'ID',
        country: (customer.main_address && customer.main_address.country) ? customer.main_address.country : (settings.default_country ? settings.default_country.value : ''),
        state: customer.main_address ? customer.main_address.state : '',
    });
    const [states, setStates] = useState([])

    useEffect(() => {
        if (data.country) {
            axios.get(route('api.country-state.states', data.country)).then((response) => {
                console.log('states', response.data.data);
                setStates(response.data ? response.data.data : []);
            });
        } else {
            setStates([]);
        }

    }, [data.country])

    const onSubmit = (e: any) => {
        e.preventDefault();

        put(route('customers.update', customer.id), {
            data,
            onSuccess: () => {
                closeModal()
            },
        });
    }

    const onPhoneNoChange = (e: any) => {
        let phone = e.target.value;
        if (e.target.value.substring(0, 1) == '0') {
            phone = phone.replace(/^.{1}/g, settings.phone_country_code.value);
        }
        if (e.target.value && e.target.value.substring(0, 1) != '+') {
            phone = '+' + phone;
        }
        if (e.target.value == '+') {
            phone = '';
        }
        setData('phone_no', phone);
    }

    return (
        <form onSubmit={onSubmit}>
            <Stack gap='xs' p='sm'>

                <AppInput values={data} required id='ic' errors={errors ? errors : null} onChange={(e: any) => setData('ic', e.target.value)} />
                <AppInput label='First Name' required id='first_name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('first_name', e.target.value)} />
                <AppInput label='Last Name' required id='last_name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('last_name', e.target.value)} />
                <AppSelect searchable label='Nationality' required id='nationality' data={countries} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('nationality', e)} />

                <AppInput required label='Email' id='email' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('email', e.target.value)} />

                <AppInput label='Phone No' required id='phone_no' values={data} errors={errors ? errors : null} onChange={(e: any) => onPhoneNoChange(e)} />

                <Group mt={'md'}>
                    <Text>Address</Text>
                </Group>

                <AppInput placeholder='Line 1' id='line1' required values={data} errors={errors ? errors : null} onChange={(e: any) => setData('line1', e.target.value)} />
                <AppInput placeholder='Line 2' id='line2' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('line2', e.target.value)} />
                <AppInput placeholder='Line 3' id='line3' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('line3', e.target.value)} />

                <AppInput label='City' required id='city' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('city', e.target.value)} />
                <AppInput label='Postcode' required id='postcode' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('postcode', e.target.value)} />
                <AppSelect searchable label='Country' required id='country' data={countries} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('country', e)} />
                <AppSelect searchable label='State' required id='state' data={states} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('state', e)} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </Stack>
        </form>
    )
}
