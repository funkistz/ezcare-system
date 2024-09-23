import React, { useState } from 'react';
import { AppInput, ConfigCodeInput } from '@/Components';
import { useForm, router, usePage } from '@inertiajs/react'
import { Group, Button, Stack, Text, TextInput, Paper, Table, Flex, Tabs } from '@mantine/core';
import ItemForm from './ItemForm';
import { AppDropzone } from '@/features';
import { MIME_TYPES } from '@mantine/dropzone';
import { FileListPreview } from '@/features/app-dropzone';
import FilePreview from '@/features/app-dropzone/components/FilePreview';

export default function ClaimLimitForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const { conditions }: any = usePage().props;
    const id = values ? values.id : null;


    const { data, setData, post, put, reset, errors } = useForm({
        warranty_plan_id: values.id,
        claim_limits: (values && values.claim_limits) ? values.claim_limits : [],
    });

    const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const [currentYear, setCurrentYear] = useState<Number>(new Date().getFullYear());


    console.log('data', data)

    const onSubmit = (e: any) => {
        e.preventDefault();

        post(route('claim-limits.store'), {
            data,
            onSuccess: () => {
                closeModal && closeModal()
            },
        });
    }

    const changeAmount = (year: any, amount: any) => {
        const temp = [...data.claim_limits];

        const found = data.claim_limits.find((claim_limit: any) => claim_limit.year == year);

        if (found) {
            const new_claim_limits = data.claim_limits.map((claim_limit: any) => {
                if (claim_limit.year == year) {
                    claim_limit.amount_limit = amount
                }
                return claim_limit;
            });
            setData('claim_limits', new_claim_limits);
        } else {
            const new_claim_limits = [...data.claim_limits]

            new_claim_limits.push({
                year: year,
                amount_limit: amount
            });
            setData('claim_limits', new_claim_limits);
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <Stack>
                    {years.map((year, index: any) => {
                        return <Group key={index}>
                            <Text>{year}</Text>
                            <AppInput type='number' placeholder='Amount Limit' value={data.claim_limits.find((claim_limit: any) => claim_limit.year == year)?.amount_limit} onChange={(e: any) => changeAmount(year, e)} />
                        </Group>;
                    })}
                </Stack>
                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
