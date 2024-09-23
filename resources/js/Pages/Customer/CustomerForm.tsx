import React, { useEffect, useState } from 'react'
import { router, useForm, usePage } from '@inertiajs/react'
import { AppInput, AppSelect, ConfigCodeInput } from '@/Components';
import { Group, Button, Text, Stack, Input, Table, Box, Divider } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import axios from 'axios';
import { IMaskInput } from 'react-imask';

export default function CustomerForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const { countries, settings }: any = usePage().props;
    const [confirmPassword, setConfirmPassword] = useState('')

    console.log('CustomerForm', values)

    const id = values ? values.id : null;
    let { data, setData, post, put, reset, errors } = useForm<any>({
        first_name: values ? values.first_name : '',
        last_name: values ? values.last_name : '',
        ic: values ? values.ic : '',
        nationality: values ? values.nationality : 'ID',
        email: values ? values.email : '',
        address_country: values ? null : 'ID',
        phone_no: values ? values.phone_no : '',
    });
    const [states, setStates] = useState([])

    // console.log('settings', settings)

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

    useEffect(() => {
        if (data.address_country) {
            axios.get(route('api.country-state.states', data.address_country)).then((response) => {
                console.log('response.data.data', response.data.data);
                setStates(response.data ? response.data.data : []);
            });
        } else {
            setStates([]);
        }

    }, [data.address_country])

    const onSubmit = (e: any) => {
        e.preventDefault();

        // console.log('data', data);
        // return;

        if (!id) {
            post(route('customers.store'), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        } else {
            put(route('customers.update', id), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Box mah={'70vh'} style={{ overflow: 'scroll' }} pb={20} px={'sm'}>
                <AppInput label='First Name' required id='first_name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('first_name', e.target.value)} />
                <AppInput label='Last Name' required id='last_name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('last_name', e.target.value)} />
                <AppInput label='IC Number' required id='ic' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('ic', e.target.value)} />
                <AppSelect label='Nationality' required id='nationality' data={countries} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('nationality', e)} />

                <AppInput label='Email' id='email' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('email', e.target.value)} />

                <AppInput type='password' label='Password' required={!id} id='password' values={data} errors={errors} onChange={(e: any) => setData('password', e.target.value)} />
                <AppInput type='password' label='Confirm Password' required={!id} value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)}
                    error={(data.password !== confirmPassword) ? 'Password do not matched!' : false} />

                <AppInput label='Phone No' required id='phone_no' values={data} errors={errors ? errors : null} onChange={(e: any) => onPhoneNoChange(e)} />

                {/* <Group mt={'md'}>
                    <Text>Phone Numbers</Text>
                </Group>
                <Table withRowBorders={false}>
                    <Table.Tr>
                        <Table.Td w={10}>1.</Table.Td>
                        <Table.Td>
                            <AppInput id='phone_no_1' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('phone_no_1', e.target.value)} />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td w={10}>2.</Table.Td>
                        <Table.Td >
                            <AppInput id='phone_no_2' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('phone_no_2', e.target.value)} />
                        </Table.Td>
                    </Table.Tr>
                </Table> */}

                {/* <Group mt={'md'}>
                    <Text>Address</Text>
                </Group> */}

                {/* <AppInput placeholder='Line 1' id='address_line_1' required values={data} errors={errors ? errors : null} onChange={(e: any) => setData('address_line_1', e.target.value)} />
                <AppInput placeholder='Line 2' id='address_line_2' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('address_line_2', e.target.value)} />
                <AppInput placeholder='Line 3' id='address_line_3' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('address_line_3', e.target.value)} />

                <AppInput label='City' required id='address_city' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('address_city', e.target.value)} />
                <AppInput label='Postcode' required id='address_postcode' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('address_postcode', e.target.value)} />
                <AppSelect label='Country' required id='address_country' data={countries} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('address_country', e)} />
                <AppSelect label='State' required id='address_state' data={states} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('address_state', e)} /> */}
            </Box>
            <Divider />

            <Group justify="flex-end" mt={'md'}>
                <Button type='submit' color='green'>Submit</Button>
            </Group>
        </form>
    )
}
