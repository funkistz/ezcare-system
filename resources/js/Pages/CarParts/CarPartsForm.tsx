import React, { useEffect, useState } from 'react';
import { AddButtonModal, AppInput, AppSelect, ConfigCodeInput } from '@/Components';
import { useForm, usePage } from '@inertiajs/react'
import { Group, Button, Text, Flex, Stack } from '@mantine/core';
import SupplierForm from '../Supplier/SupplierForm';

export default function CarPartsForm({ values, closeModal }: { values?: any, closeModal?: any}) {

    const { brand, model, costPrice, suppliers, settings }: any = usePage().props;

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        code: values ? values.code : '',
        description: (values && values.description) ? values.description : '',
        supplier_id: (values && values.supplier_id) ? values.supplier_id.toString() : '',
        brand_id: (values && values.brand_id) ? values.brand_id.toString() : '',
        model_id: (values && values.model_id) ? values.model_id.toString() : '',
        variant: (values && values.variant) ? values.variant : '',
        year: (values && values.year) ? values.year : '',
        cost_price: (values && values.cost_price) ? values.cost_price : 0,
        selling_price: (values && values.selling_price) ? values.selling_price : 0,
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        const action = e.nativeEvent.submitter.value;

        if(action === 'save') {
            if(!id) {
                post(route('car-parts.store'), {
                    data,
                    onSuccess: () => {
                        window.location.href = route('car-parts.index');
                    },
                });
            } else {
                put(route('car-parts.update', id), {
                    data,
                    onSuccess: () => {
                        window.location.href = route('car-parts.index');
                    },
                });
            }
        }
    }

    const sumSellingPrice = (e:any) => {
        setData({
            ...data,
            'cost_price': e,
            'selling_price': (Number(e) * Number(costPrice)) + Number(e),
        })
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppInput label='Name' required id='name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppInput label='Code' id='code' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('code', e.target.value)} />
                <AppInput label='Description' id='description' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />
                <Flex direction={'row'} gap={'xs'} align={'end'}>
                    <AppSelect searchable label='Supplier' required id='supplier_id' data={suppliers} value={data.supplier_id} errors={errors ? errors : null} onChange={(e: any) => setData('supplier_id', Number(e))} w={'90%'}  />
                    <Stack pb={5}>
                        <AddButtonModal title='Add Supplier'>
                            <SupplierForm />
                        </AddButtonModal>
                    </Stack>
                </Flex>
            
                <AppSelect searchable label='Brand' required id='brand_id' data={brand} value={data.brand_id} errors={errors ? errors : null} onChange={(e: any) => setData('brand_id', Number(e))} />
                <AppSelect searchable label='Model' required id='model_id' data={model} value={data.model_id} errors={errors ? errors : null} onChange={(e: any) => setData('model_id', Number(e))} />
                <AppInput label='Variant' id='variant' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('variant', e.target.value)} />
                <AppInput required type="number" label='Year' id='year' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('year', e)} />
                <AppInput required type="number" label='Cost Price' id='cost_price' values={data} errors={errors ? errors : null} onChange={(e: any) => sumSellingPrice( e)} />
                <AppInput readOnly label='Selling Price' id='selling_price' values={data} errors={errors ? errors : null}/>            
                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green' value="save">Submit</Button>
                </Group>
            </form>
        </>
    )
}


