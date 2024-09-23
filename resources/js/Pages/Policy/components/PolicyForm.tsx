import { AppDataShow, AppInput, AppYearPicker, AppDatePicker, AppSelect, AppTextArea } from '@/Components';
import { useForm, usePage } from '@inertiajs/react';
import { Stack, Group, Button, TextInput, Text } from '@mantine/core';
import React, { useState } from 'react'

export default function PolicyForm({ policy, closeModal }: { policy: any, closeModal?: any }) {

    const { countries, settings, params, branches }: any = usePage().props;

    const policyTypes = [
        {
            'label': 'New',
            'value': 'new'
        },
        {
            'label': 'Renew',
            'value': 'renew'
        },
    ];

    // console.log('params', params)
    const [confirmPassword, setConfirmPassword] = useState('')

    const { data, setData, post, put, reset, errors } = useForm<any>({
        branch_id: policy ? policy.branch_id : '',
        policy_no: policy ? policy.policy_no : '',
        type: policy ? policy.type : '',
        remarks: policy ? policy.remarks : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        put(route('policy.updateDetails', policy.id), {
            data,
            onSuccess: (e) => {
                // console.log('e', e)
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
                <AppSelect searchable label='Branch' required id='branch_id' values={data} data={branches} onChange={(e: any) => setData('branch_id', e)} />
                <AppInput label='Policy No' required id='policy_no' values={data} errors={errors} onChange={(e: any) => setData('policy_no', e.target.value.toLowerCase().replace(/\s/g, ''))} />
                <AppSelect label='Policy Type' required id='type' values={data} data={policyTypes} errors={errors} onChange={(e: any) => setData('type', e)} />
                <AppTextArea label='Remarks' id='remarks' values={data} errors={errors} onChange={(e: any) => setData('remarks', e.target.value)} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </Stack>
        </form>
    )
}
