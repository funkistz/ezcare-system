import React, { useEffect, useState } from 'react';
import { AppDatePicker, AppInput, AppSegmentControl, ConfigCodeInput } from '@/Components';
import { router, useForm, usePage } from '@inertiajs/react'
import { Group, Button, Box, Divider, Paper, SimpleGrid, Stack, Text, VisuallyHidden } from '@mantine/core';
import { AppDropzone } from '@/features';
import { FileListPreview } from '@/features/app-dropzone';
import FilePreview from '@/features/app-dropzone/components/FilePreview';
import CoverageAppDropZone from '@/features/app-dropzone/components/CoverageAppDropZone';
import CoverageFileListPreview from '@/features/app-dropzone/components/CoverageFileListPreview';


export default function CoverageForm({ values, closeModal, isEdit = false }: { values?: any, closeModal?: any, isEdit?: boolean }) {

    const id = values ? values.id : null;

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        description: values ? values.description : '',
        price: values ? values.price : '',
        dealer_price: values ? values.dealer_price : '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('coverages.store'), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        } else {
            put(route('coverages.update', id), {
                data,
                onSuccess: () => {
                    closeModal()
                },
            });
        }
    }

   
    
    const reformatDate = (date: any) => {
        const formattedDate = String(date.getDate()).padStart(2, '0') + '/' +
        String(date.getMonth() + 1).padStart(2, '0') + '/' +
        date.getFullYear();
        return formattedDate;
    }

    const onSuccess = (file: any) => {
        let param = { activate_date: reformatDate(file.activate_at), coverage_id : id }
        router.post(route('coverages.add_attachment', param), file, {
            onSuccess: () => {
            },
        });
    }

    const types = [
        {
            label: 'Free Month',
            value: 'month',
        },
    ];

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppInput label='Name' required id='name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('name', e.target.value)} />
                <AppInput label='Description' id='description' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('description', e.target.value)} />

                <AppInput type='number' label='Price' required id='price' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('price', e)} />
                <AppInput type='number' label='Dealer Price' required id='dealer_price' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('dealer_price', e)} />
                    
                    {
                        isEdit ? 
                        <div>
                        <Divider my="xs" label="Attachment Section" labelPosition="center" />
                        <Stack gap={'xs'}>
                            <Text size="xs" c="red">**delete current doc & reupload to adjust activation date**</Text>
                            <Stack my={2} gap={2}>
                                <CoverageAppDropZone multiple={false} withIcon={false} onSuccess={(data: any) => onSuccess(data)}/>
                            </Stack>
                            {values.document && values.document.length > 0 && <Box p='md'>
                                <CoverageFileListPreview files={values.document} type='coverages' />
                            </Box>}  
                        </Stack> 
                        </div> : ''
                    }
                    
                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
