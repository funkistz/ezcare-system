import React, { useState } from 'react';
import { useForm, router, usePage } from '@inertiajs/react'
import { Group, Button, Stack, Text, TextInput, Paper, Table, Flex, Tabs } from '@mantine/core';
import { AppDropzone } from '@/features';
import { MIME_TYPES } from '@mantine/dropzone';
import FilePreview from '@/features/app-dropzone/components/FilePreview';

export default function PDFForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const { conditions }: any = usePage().props;
    const id = values ? values.id : null;

    console.log('values', values)

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        code: values ? values.code : '',
        description: (values && values.description) ? values.description : '',
        covered_items: (values && values.covered_items) ? values.covered_items : [],
        addon_items: (values && values.addon_items) ? values.addon_items : [],
    });
    const [item, setItem] = useState<any>('')
    const [addonItem, setAddonItem] = useState<any>('');

    const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const [currentYear, setCurrentYear] = useState<Number>(new Date().getFullYear());

    const fileUploaded = (file: any, vehicle_condition_id: any, year: any, remarks?: any) => {
        console.log('file', file)
        file.vehicle_condition_id = vehicle_condition_id;
        file.year = year;

        if (remarks) {
            file.remarks = remarks;
        }

        router.put(route('warranty-plans.add-pdf', id), file, {
            onSuccess: () => {
            },
        });
    }

    return (
        <>
            {/* <form onSubmit={onSubmit}> */}

            <Tabs variant="outline" defaultValue={currentYear.toString()}>
                <Tabs.List>
                    {years.map((year, index: any) => {
                        return <Tabs.Tab key={index} value={year.toString()}>
                            {year}
                        </Tabs.Tab>;
                    })}
                </Tabs.List>

                {years.map((year, index: any) => {
                    return <Tabs.Panel key={index} value={year.toString()} pt={20}>
                        {conditions.map((condition: any, index2: any) => {

                            return (
                                <React.Fragment key={index2}>
                                    <Stack mb={50} gap='xs'>
                                        <Text>{condition.label}</Text>
                                        {/* <AppDropzone onSuccess={(data: any) => fileUploaded(data, condition.value, year)} withIcon={false} mimes={[MIME_TYPES.pdf]} /> */}

                                        {/* <Flex wrap='wrap' gap='xs'>
                                            {values.files.map((file: any, index3: any) => {
                                                if (file.vehicle_condition_id == condition.value && file.remarks !== 'addon' && file.year == year.toString()) {
                                                    return (
                                                        <FilePreview key={index3} file={file} type={'warranty_plan'} display={'list'} />
                                                    );
                                                }
                                            })}
                                        </Flex> */}
                                    </Stack>
                                    <Stack mb={50} gap='xs'>
                                        <Text>{condition.label} (Add-on)</Text>
                                        {/* <AppDropzone onSuccess={(data: any) => fileUploaded(data, condition.value, year, 'addon')} withIcon={false} mimes={[MIME_TYPES.pdf]} /> */}

                                        {/* <Flex wrap='wrap' gap='xs'>
                                            {values.files.map((file: any, index3: any) => {
                                                if (file.vehicle_condition_id == condition.value && file.remarks == 'addon' && file.year == year.toString()) {
                                                    return (
                                                        <FilePreview key={index3} file={file} type={'warranty_plan'} display={'list'} />
                                                    );
                                                }
                                            })}
                                        </Flex> */}
                                    </Stack>
                                </React.Fragment>
                            )

                        })}
                    </Tabs.Panel>;
                })}

            </Tabs>


            {/* <Stack mb={50} gap='xs'>
                <Text>Addon (Hybrid)</Text>
                <AppDropzone onSuccess={(data: any) => fileUploaded(data, 0)} withIcon={false} mimes={[MIME_TYPES.pdf]} />

                <Flex wrap='wrap' gap='xs'>
                    {values.files.map((file: any, index: any) => {
                        if (file.vehicle_condition_id == 0) {
                            return (
                                <FilePreview key={index} file={file} type={'warranty_plan'} display={'list'} />
                            );
                        }
                    })}
                </Flex>
            </Stack> */}


            {/* <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group> */}
            {/* </form > */}
        </>
    )
}
