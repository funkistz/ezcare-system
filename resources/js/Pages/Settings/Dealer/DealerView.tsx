import React, { useEffect, useState } from 'react';
import { AppInput, AppSelect, ConfigCodeInput } from '@/Components';
import { useForm, usePage } from '@inertiajs/react'
import { Group, Button, Text, Stack } from '@mantine/core';
import axios from 'axios';

export default function DealerView({ values, closeModal }: { values?: any, closeModal?: any }) {

    const {  settings }: any = usePage().props;

    const id = values ? values.id : null;
    const [states, setStates] = useState([])

    const { data } = useForm({
        name: values ? values.name : '',
        description: (values && values.description) ? values.description : '',
        line1: (values && values.main_address) ? values.main_address.line1 : '',
        line2: (values && values.main_address) ? values.main_address.line2 : '',
        line3: (values && values.main_address) ? values.main_address.line3 : '',
        city: (values && values.main_address) ? values.main_address.city : '',
        postcode: (values && values.main_address) ? values.main_address.postcode : '',
        country: (values && values.main_address) ? values.main_address.country : (settings.default_country ? settings.default_country.value : ''),
        state: (values && values.main_address) ? values.main_address.state : '',
    });

    useEffect(() => {
        if (data.country) {
            axios.get(route('api.country-state.states', data.country)).then((response: any) => {
                console.log('states', response.data.data);
                setStates(response.data ? response.data.data : []);
            });
        } else {
            setStates([]);
        }

    }, [data.country])

    return (
        <>
            <Stack gap={'xs'}>
                <Stack gap={0}>
                    <Text fz={14} fw={600}>Name</Text>
                    <Text>{data.name}</Text>
                </Stack>
                <Stack gap={0}>
                    <Text fz={14} fw={600}>Description</Text>
                    <Text>{data.description ? data.description : '-'}</Text>
                </Stack>
                <Stack gap={0}>
                    <Text fz={14} fw={600}>Address</Text>
                    <Text>{data.line1 ? data.line1 : ''}</Text>
                    <Text>{data.line2 ? data.line2 : ''}</Text>
                    <Text>{data.line3 ? data.line3 : ''}</Text>
                </Stack>
                <Stack gap={0}>
                    <Text fz={14} fw={600}>City</Text>
                    <Text>{data.city ? data.city : '-'}</Text>
                </Stack>
                <Stack gap={0}>
                    <Text fz={14} fw={600}>Postcode</Text>
                    <Text>{data.postcode ? data.postcode : '-'}</Text>
                </Stack>
                <Stack gap={0}>
                    <Text fz={14} fw={600}>Country</Text>
                    <Text>{data.country ? data.country : '-'}</Text>
                </Stack>
                <Stack gap={0}>
                    <Text fz={14} fw={600}>State</Text>
                    <Text>{data.state ? data.state : '-'}</Text>
                </Stack>
            </Stack>
        </>
    )
}
