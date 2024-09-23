import React, { useEffect, useState } from 'react';
import { AppInput, AppSelect, AppTextArea, ConfigCodeInput } from '@/Components';
import { useForm, usePage } from '@inertiajs/react'
import { Group, Button, Text } from '@mantine/core';
import { IconCurrentLocation } from '@tabler/icons-react';
import AppSwitch from '@/Components/Forms/AppSwitch';
import axios from 'axios';

export default function WorkshopForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const { countries }: any = usePage().props;
    const id = values ? values.id : null;
    const [states, setStates] = useState([])

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        description: (values && values.description) ? values.description : '',
        phone_no_1: values ? values.phone_no_1 : '',
        phone_no_2: values ? values.phone_no_2 : '',
        lat: values ? values.lat : '',
        lng: values ? values.lng : '',
        is_ev: values ? ((values.is_ev == 1) ? true : false) : false,
        is_hybrid: values ? ((values.is_hybrid == 1) ? true : false) : false,
        line1: values?.main_address ? values.main_address.line1 : '',
        line2: values?.main_address ? values.main_address.line2 : '',
        line3: values?.main_address ? values.main_address.line3 : '',
        city: values?.main_address ? values.main_address.city : '',
        postcode: values?.main_address ? values.main_address.postcode : '',
        country: values?.main_address ? values.main_address.country : 'ID',
        state: values?.main_address ? values.main_address.state : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('workshops.store'), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        } else {
            console.log('data', data)
            put(route('workshops.update', id), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        }
    }

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

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppInput required label='Name' id='name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppTextArea label='Description' id='description' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />
                <AppInput label='Phone 1' id='phone_no_1' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('phone_no_1', e.target.value)} />
                <AppInput label='Phone 2' id='phone_no_2' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('phone_no_2', e.target.value)} />

                <Group>
                    <AppInput required type='number' rightSection={<IconCurrentLocation />} label='Latitude' id='lat' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('lat', e)} />
                    <AppInput required type='number' rightSection={<IconCurrentLocation />} label='Longitude' id='lng' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('lng', e)} />
                </Group>

                <AppSwitch label='EV Workshop' id='is_ev' checked={data.is_ev} errors={errors ? errors : null} onChange={(e: any) => { setData('is_ev', e.target.checked) }} />
                <AppSwitch label='Hybrid Workshop' id='is_hybrid' checked={data.is_hybrid} errors={errors ? errors : null} onChange={(e: any) => { setData('is_hybrid', e.target.checked) }} />

                <Group mt={'md'}>
                    <Text>Address</Text>
                </Group>

                <AppInput placeholder='Line 1' id='line1' required values={data} errors={errors ? errors : null} onChange={(e: any) => setData('line1', e.target.value)} />
                <AppInput placeholder='Line 2' id='line2' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('line2', e.target.value)} />
                <AppInput placeholder='Line 3' id='line3' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('line3', e.target.value)} />

                <AppInput label='City' required id='city' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('city', e.target.value)} />
                <AppInput label='Postcode' required id='postcode' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('postcode', e.target.value)} />
                <AppSelect searchable label='Country' required id='country' data={countries} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('country', e)} />
                <AppSelect label='State' required id='state' data={states} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('state', e)} />
                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
