import React, { useState } from 'react';
import { AppInput, ConfigCodeInput } from '@/Components';
import { useForm, router, usePage } from '@inertiajs/react'
import { Group, Button, Stack, Text, TextInput, Paper, Table, Card, MultiSelect, SimpleGrid } from '@mantine/core';
import ItemForm from './ItemForm';
import AppSwitch from '@/Components/Forms/AppSwitch';

export default function WarrantyPlanForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const { service_types, oil_types }: any = usePage().props;

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        code: values ? values.code : '',
        description: (values && values.description) ? values.description : '',
        year_package: values ? values.year_package : 1,
        first_service_mileage: values ? values.first_service_mileage : null,
        first_service_months: values ? values.first_service_months : null,
        first_services: values ? values.first_services : [],
        oil_type_ids: values ? values.oil_type_ids : [],
    });
    const [item, setItem] = useState<any>('')
    const [addonItem, setAddonItem] = useState<any>('')

    console.log('oil_types', oil_types)


    const addItem = (name: any, type: any) => {

        // warranty-plan-items
        router.visit(route('warranty-plan-items.store'), {
            method: 'post',
            data: {
                name: name,
                type: type,
                code: urlSafe(name),
                warranty_plan_id: id,
            },
            preserveState: true,
            onFinish: () => {
                setAddonItem('');
                setItem('');
            },
            onSuccess: () => {
                // closeModal && closeModal()
                addonItem('');
                setItem('');
            },
        })
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('warranty-plans.store'), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        } else {
            put(route('warranty-plans.update', id), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        }
    }

    function urlSafe(value: String) {
        return value == undefined ? '' : value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    const changeFirstService = (service_type_id: any, field: any, value: any) => {

        // const first_services = [];
        const first_service = data.first_services.find((first_service: any) => {
            return first_service.service_type_id === service_type_id;
        })

        if (first_service) {

            const first_services = data.first_services.map((first_service: any) => {
                if (first_service.service_type_id == service_type_id) {
                    first_service[field] = parseInt(value);
                    return first_service;
                } else {
                    return first_service;
                }
            })


            setData({ ...data, first_services: first_services });
        } else {
            const first_service = {
                warranty_plan_id: id,
                service_type_id: service_type_id,
                [field]: parseInt(value)
            };

            setData({ ...data, first_services: [...data.first_services, first_service] });
        }
    }

    const getFirstServiceData = (service_type_id: any, field: any) => {

        const first_service = data.first_services.find((first_service: any) => {
            return first_service.service_type_id === service_type_id;
        })

        // console.log('first_services', first_services)
        if (first_service) {
            return first_service[field];
        } else {
            return null;
        }
    }

    const isChecked = (service_type_id: any, oil_type_id: any) => {
        const curr_oil_ids = data.oil_type_ids["'" + service_type_id + "'"];
        return curr_oil_ids.includes(Number(oil_type_id));
    }

    const changeOilTypeIds = (service_type_id: any, oil_type_id: any) => {

        oil_type_id = Number(oil_type_id);
        let curr_oil_ids = data.oil_type_ids["'" + service_type_id + "'"];

        const found = curr_oil_ids.filter((f: any) => f == oil_type_id);

        if (found.length != 0) {
            curr_oil_ids = curr_oil_ids.filter((f: any) => f != oil_type_id);
        } else {
            curr_oil_ids.push(oil_type_id);
        }

        const final = { ...data.oil_type_ids, ["'" + service_type_id + "'"]: curr_oil_ids }
        setData('oil_type_ids', final);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <ConfigCodeInput values={data} setData={setData} errors={errors} isEdit={id} />

                <AppInput label='Description' id='description' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />

                <Stack gap={0}>
                    <AppInput mb={6} type='number' label='Year Package' id='year_package' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('year_package', e)} />
                    <Text fz={12}>*This will be used for minimum year per package.</Text>
                    <Text fz={12}>*When this value is above 1, policy year cannot exceed or below the amount set.</Text>
                </Stack>

                {id && service_types && service_types.map((service_type: any, index: any) => {
                    return <Card withBorder my={20} key={index}>
                        <Text fw={'bolder'} fz={18}>{service_type.name}</Text>
                        <AppInput type='number' label='First Service Mileage (KM)' id='first_service_mileage' value={getFirstServiceData(service_type.id, 'first_service_mileage')} errors={errors ? errors : null} onChange={(e: any) => changeFirstService(service_type.id, 'first_service_mileage', e)} />
                        <AppInput type='number' label='First Service Months' id='first_service_months' value={getFirstServiceData(service_type.id, 'first_service_months')} errors={errors ? errors : null} onChange={(e: any) => changeFirstService(service_type.id, 'first_service_months', e)} />

                        <Text mt={30}>Service Types:</Text>
                        <Stack gap={5}>
                            {oil_types && oil_types.map((oil_type: any, index: any) => {
                                return <SimpleGrid cols={2} key={index}>
                                    <Stack gap={0}>
                                        <Text>{oil_type.label}</Text>
                                        <Text fz={10}>{oil_type.description}</Text>
                                    </Stack>
                                    <AppSwitch checked={isChecked(service_type.id, oil_type.value)} onChange={() => changeOilTypeIds(service_type.id, oil_type.value)} />
                                </SimpleGrid>
                            })}
                        </Stack>
                    </Card>;
                })}

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form >
        </>
    )
}
