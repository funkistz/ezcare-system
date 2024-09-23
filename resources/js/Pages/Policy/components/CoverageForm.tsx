import { AppInput, AppSelect } from '@/Components'
import { useForm, usePage } from '@inertiajs/react';
import { Button, Group, Stack } from '@mantine/core'
import React, { useState } from 'react'

export default function CoverageForm({ policy, closeModal }: any) {

    const { coverageSelect }: any = usePage().props;
    const [loading, setLoading] = useState(false)

    const { data, setData, post, put, reset, errors } = useForm({
        coverage_id: '',
        period: 1,
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);

        post(route('policy.addCoverage', policy.id), {
            data,
            onSuccess: () => {
                setLoading(false);
                closeModal && closeModal();
            },
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <AppSelect required searchable label='Add Coverage' data={coverageSelect} value={data.coverage_id} onChange={(e: any) => setData('coverage_id', e)} />
            <AppInput required type='number' label='Period (Year)' value={data.period} onChange={(e: any) => setData('period', e)} />

            <Group justify="flex-end" mt={'md'}>
                <Button type='submit' color='green' disabled={loading}>Submit</Button>
            </Group>
        </form>
    )
}
