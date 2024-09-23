import { AppDataShow, AppInput, AppYearPicker, AppDatePicker, AppSelect } from '@/Components';
import { useForm, usePage } from '@inertiajs/react';
import { Stack, Group, Button, TextInput, Text } from '@mantine/core';
import React, { useState } from 'react'

export default function UserForm({ user, closeModal }: { user: any, closeModal?: any }) {

    const { countries, settings, params }: any = usePage().props;

    // console.log('params', params)
    const [confirmPassword, setConfirmPassword] = useState('')

    const { data, setData, post, put, reset, errors } = useForm<any>({
        email: user ? user.email : '',
        phone_no: user ? user.phone_no : '',
        username: user ? user.username : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        put(route('users.update', user.id), {
            data,
            onSuccess: (e) => {
                // console.log('e', e)
                // closeModal()
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
                <AppInput required label='Username' id='username' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('username', e.target.value)} />
                {params && params.username && <Text c='red'>{params.username}</Text>}

                <AppInput label='Email' id='email' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('email', e.target.value)} />
                {params && params.email && <Text c='red'>{params.email}</Text>}

                <AppInput label='Phone No' id='phone_no' values={data} errors={errors ? errors : null} onChange={(e: any) => onPhoneNoChange(e)} />
                {params && params.phone_no && <Text c='red'>{params.phone_no}</Text>}

                <AppInput type='password' label='Password' id='password' values={data} errors={errors} onChange={(e: any) => setData('password', e.target.value)} />
                <AppInput type='password' label='Confirm Password' required={data.password} value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)}
                    error={(data.password && data.password !== confirmPassword) ? 'Password do not matched!' : false} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </Stack>
        </form>
    )
}
