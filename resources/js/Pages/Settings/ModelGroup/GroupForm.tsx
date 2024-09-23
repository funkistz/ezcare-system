import React, { useState, useEffect } from 'react';
import { AppInput, ConfigCodeInput, AppSelect, AppTextArea, AppMultiSelect } from '@/Components';
import { useForm, usePage } from '@inertiajs/react'
import { Group, Button, Tabs } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import axios from 'axios';

export default function GroupForm({ type = '', values, closeModal }: { type?: any, values?: any, closeModal?: any }) {

    const { brands }: any = usePage().props;
    const id = values ? values.id : null;

    console.log('values', values)

    const [models, setModels] = useState([])

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        description: values ? values.description : '',
        vehicle_brand_id: values ? values.vehicle_brand_id : '',
        vehicle_models: values ? values.models : [],
    });

    const getModels = (brand_id: any) => {

        axios.get(route('api.vehicle-models.findBybrandId'), { params: { brand_id: brand_id } }).then((response) => {

            if (response.data) {
                setModels(response.data.data)
            }
        });
    }

    useEffect(() => {

        if (values && values.vehicle_brand_id) {
            getModels(values.vehicle_brand_id);
        }

    }, [])

    useEffect(() => {
        if (values && values.vehicle_models && (values.vehicle_brand_id == data.vehicle_brand_id)) {
            setData('vehicle_models', values.vehicle_models.map((model: any) => String(model.id)));
            console.log('values.models', values.vehicle_models.map((model: any) => String(model.id)));
        } else {
            setData('vehicle_models', []);
        }
    }, [models])



    const onChangeBrand = (e: any) => {

        getModels(e);
        setData('vehicle_brand_id', e)
        console.log(e);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('vehicle-groups.store'), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        } else {
            put(route('vehicle-groups.update', id), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>

                <AppInput label='Name' required id='name' values={data} onChange={(e: any) => setData('name', e.currentTarget.value)} errors={errors ? errors : null} />
                <AppTextArea label='Description' id='description' values={data} onChange={(e: any) => setData('description', e.target.value)} errors={errors ? errors : null} />

                <AppSelect label='Brand' id='vehicle_brand_id' values={data} data={brands} onChange={onChangeBrand} />
                {!!data.vehicle_brand_id && <AppMultiSelect label='Models' data={models} value={data.vehicle_models} onChange={(e: any) => setData('vehicle_models', e)} />}

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
