import React, { useEffect, useState } from 'react';
import { AppDatePicker, AppDateTimePicker, AppInput, AppSegmentControl, AppTextArea, ConfigCodeInput } from '@/Components';
import { useForm, usePage } from '@inertiajs/react'
import { Group, Button, Stack, Text, SimpleGrid, Divider } from '@mantine/core';
import { AppDropzone } from '@/features';
import ServiceReminder from './ServiceReminder';
import moment from 'moment';
import { IconPlus } from '@tabler/icons-react';
import FilePreview from '@/features/app-dropzone/components/FilePreview';

export default function ServiceForm({ values, closeModal, policy }: { values?: any, closeModal?: any, policy: any }) {

    const { warranty_plan }: any = usePage().props;
    const service_types = warranty_plan.available_service_types.map((service: any) => { return { label: service.name, value: String(service.id) } });
    const [firstLoad, setFirstLoad] = useState(true)

    const id = values ? values.id : null;

    // console.log('moment(values.invoice_date)', new Date(values.invoice_date))

    const { data, setData, post, put, reset, errors } = useForm({
        service_type_id: values ? String(values.service_type_id) : service_types[0].id,
        oil_type_id: values ? String(values.oil_type_id) : '',
        remarks: values ? values.remarks : '',
        workshop_name: values ? values.workshop_name : '',
        invoice_no: values ? values.invoice_no : '',
        invoice_date: values ? new Date(values.invoice_date) : '',
        current_mileage: values ? values.current_mileage : '',
        current_date: values ? new Date(values.current_date) : '',
        // reminder_stikers: values ? values.reminder_stikers : [],
        // workshop_receipts: values ? values.workshop_receipts : [],
        // mileage_images: values ? values.mileage_images : [],
        // other_images: values ? values.other_images : [],
        // next_mileage: values ? values.next_mileage : '',
        // next_date: values ? values.next_date : '',
    });

    console.log('ServiceForm', values)

    const [oilTypes, setOilTypes] = useState([]);

    useEffect(() => {
        console.log('service_type_id change', firstLoad)

        setOilTypes(getOilTypes());
    }, [data.service_type_id])

    useEffect(() => {

        if (firstLoad) {
            console.log('firstLoad', data.oil_type_id)
            setData('oil_type_id', '2');
            setFirstLoad(false);
        }

    }, ['oilTypes'])

    useEffect(() => {

        // if () {

        // }

    }, [data.oil_type_id])

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!data.oil_type_id) {
            return;
        }

        if (!id) {
            put(route('policy.add_service', policy.id), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        } else {
            // put(route('policy.add_service', id), {
            //     data,
            //     onSuccess: () => {
            //         closeModal()
            //     },
            // });
        }
    }

    const onImageUploaded = (data: any) => {

    }

    const getOilTypes = () => {

        const availableOils = policy.warranty_plan.oil_type_ids["'" + data.service_type_id + "'"];

        if (!availableOils) {
            return [];
        }

        const temp = policy.warranty_plan.oil_types.filter((oil_type: any) => {
            return availableOils.includes(oil_type.id) ? true : false;
        }).map((oil_type: any) => {
            return ({
                label: oil_type.name,
                value: String(oil_type.id),
            });
        });

        (temp.length == 1) ? setData('oil_type_id', temp[0].value) : setData('oil_type_id', '');

        return temp;
    }

    return (
        <>
            {!id && <ServiceReminder policy={policy} />}
            {id && <ServiceReminder policy={policy} />}

            <Divider my={20} />
            <Text>Files:</Text>
            <Group mb={20}>
                {values.files && values.files.map((file: any) => {
                    return <FilePreview file={file} type={file.mime} />
                })}
            </Group>


            <form onSubmit={onSubmit}>
                {/* <AppSegmentControl label='Type' required id='type' data={types} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('type', e)} /> */}

                <AppSegmentControl label='Service Type' required id='service_type_id' data={service_types} values={data} errors={errors ? errors : null} onChange={(e: any) => { console.log('e', e); setData('service_type_id', e) }} />
                <AppSegmentControl label='Oil Type' required id='oil_type_id' data={oilTypes} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('oil_type_id', e)} />

                {/* {data.type == 'engine' && <AppSegmentControl label='Oil Type' required id='oil_type_id' data={engine_oils} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('oil_type_id', e)} />}
                {data.type == 'atf' && <AppSegmentControl label='Oil Type' required id='oil_type_id' data={atf_oils} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('oil_type_id', e)} />} */}

                <AppInput label='Invoice No' required id='invoice_no' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('invoice_no', e.target.value)} />
                <AppDatePicker label='Invoice Date' required id='invoice_date' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('invoice_date', e)} />

                <AppInput type='number' label='Current Mileage Service' required id='current_mileage' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('current_mileage', e)} />
                <AppDateTimePicker label='Current Date Service' required id='current_date' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('current_date', e)} />

                {/* <AppInput type='number' label='Next Mileage Service' required id='expected_mileage' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('next_mileage', e)} disabled />
                <AppInput type='number' label='Next Date Service' required id='expected_date' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('next_date', e)} disabled /> */}


                <AppInput label='Workshop Name' required id='workshop_name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('workshop_name', e.target.value)} />
                <AppTextArea label='Remarks' id='remarks' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('remarks', e.target.value)} />

                {/* <Stack mt='md'>
                    <Stack gap={'xs'}>
                        <Text fz='sm' fw='bolder'>Reminder Sticker:</Text>
                        <AppDropzone withIcon={false} onSuccess={(data: any) => { }} />
                    </Stack>
                    <Stack gap={'xs'}>
                        <Text fz='sm' fw='bolder'>Workshop Receipt:</Text>
                        <AppDropzone withIcon={false} onSuccess={(data: any) => { }} />
                    </Stack>
                    <Stack gap={'xs'}>
                        <Text fz='sm' fw='bolder'>Mileage Image:</Text>
                        <AppDropzone withIcon={false} onSuccess={(data: any) => { }} />
                    </Stack>
                </Stack> */}

                <Group justify="flex-end" my={'md'}>
                    <Button type='submit' color='green' disabled={!data.oil_type_id}>Submit</Button>
                </Group>
            </form>
        </>
    )
}
