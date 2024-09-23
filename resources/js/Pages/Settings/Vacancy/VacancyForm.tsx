import React, { useEffect, useState } from 'react';
import { AppInput, AppSelect, AppTextArea, ConfigCodeInput } from '@/Components';
import { useForm, usePage } from '@inertiajs/react'
import { Group, Button, Text, NumberInput } from '@mantine/core';
import axios from 'axios';
import AppSwitch from '@/Components/Forms/AppSwitch';

export default function VacancyForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const { countries, settings }: any = usePage().props;
    const id = values ? values.id : null;
    const [states, setStates] = useState([])

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        description: (values && values.description) ? values.description : '',
        is_active: values ? values.is_active : true,
        position: values ? values.position : 1,
    });


    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('vacancy.store'), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        } else {
            put(route('vacancy.update', id), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        }
    }

    const onSwitchChange = (e: any) => {
        setData({ ...data, [e.target.id]: e.target.checked })
    };

    const onChange = (e: any) => {
        setData({ ...data, [e.target.id]: e.target.value })
    };

    useEffect(() => {
        if (values) {
            const temp = {
                code: values.code,
                name: values.name,
            };
            setData({ ...data, ...temp });

        }

    }, [values])


    return (
        <>
            <form onSubmit={onSubmit}>
                <AppInput label='Job Title' id='name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppTextArea label={'Description'} id='description' size='md' minRows={4}  rows={10} errors={errors ? errors : null}   values={data} onChange={(e: any) => setData('description', e.target.value)} />
                {!values && <AppInput type={'number'} label='Position' id='position' required value={data.position} onChange={onChange} errors={errors} />}

                <AppSwitch id='is_active' label='Active' value={true} onChange={onSwitchChange} checked={data.is_active} />

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
