import React, { useEffect, useState } from 'react';
import { AppInput, AppSelect, ConfigCodeInput } from '@/Components';
import { useForm, usePage } from '@inertiajs/react'
import { Group, Button, Text } from '@mantine/core';
import axios from 'axios';

export default function DealerForm({ values, closeModal }: { values?: any, closeModal?: any}) {

    const { countries, settings }: any = usePage().props;

    // console.log('countries', countries)

    const id = values ? values.id : null;
    const [states, setStates] = useState([])

    const { data, setData, post, put, reset, errors } = useForm({
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

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('dealers.store'), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        } else {
            put(route('dealers.update', id), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppInput label='Name' required id='name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppInput label='Description' id='description' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />

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
