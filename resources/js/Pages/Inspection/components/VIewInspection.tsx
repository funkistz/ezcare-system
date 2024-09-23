import { AppDateTimePicker, AppInput, AppTextArea } from '@/Components'
import { router, usePage } from '@inertiajs/react'
import { Box, Stack, Group, Badge, Divider, Button, SegmentedControl, SimpleGrid, Text, Card } from '@mantine/core'
import { IconTrash, IconCheckbox, IconCalendar, IconUserCog, IconUserDollar, IconCertificate2, IconCar, IconDiscount2, IconMap2, IconRoad, IconCarCrash } from '@tabler/icons-react'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ImagePreview from './ImagePreview'

export default function ViewInspection({ id, type }: any) {

    const { auth }: any = usePage().props;
    const [data, setData] = useState<any>({});
    const types = [
        { 'label': 'New', 'value': 'new' },
        { 'label': 'Renewal', 'value': 'renewal' },
        { 'label': 'Claim Case', 'value': 'claim' }
    ]

    console.log('auth', auth)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        console.log('getData')

        const params = {
            user_id: auth.user.id,
            data_type: type
        }

        const response: any = axios.get('/api/inspection/showInspection/' + id, {
            params: params
        }).then((response) => {
            const data = response.data.data;
            setData(data);
            console.log('data', data)

        });

    }

    const confirmUnassigned = async () => {

        // presentAlert({
        //     header: 'Confirmation',
        //     message: 'Are you sure want to unassigned this?',
        //     buttons: [
        //         {
        //             text: 'Cancel',
        //             role: 'cancel',
        //             handler: () => {
        //                 console.log('Alert canceled');
        //             },
        //         },
        //         {
        //             text: 'Unassigned',
        //             role: 'confirm',
        //             handler: async () => {
        //                 const params = {
        //                     inspection_id: state.id,
        //                     user_id: user.id
        //                 }
        //                 const response: any = (await APIService.post('inspection/unassignedSchedule', params));
        //                 const data: any = response.data.data;
        //                 history.goBack();
        //             },
        //         },
        //     ],
        // })
    }

    const confirmCompleted = async () => {

        // presentAlert({
        //     header: 'Confirmation',
        //     message: 'Are you sure want to set this as completed?',
        //     buttons: [
        //         {
        //             text: 'Cancel',
        //             role: 'cancel',
        //             handler: () => {
        //                 console.log('Alert canceled');
        //             },
        //         },
        //         {
        //             text: 'Completed',
        //             role: 'confirm',
        //             handler: async (e) => {

        //                 const params = {
        //                     inspection_id: state.id,
        //                     remarks: e ? e[0] : '',
        //                     user_id: user.id
        //                 }
        //                 const response: any = (await APIService.post('inspection/completedSchedule', params));
        //                 const data: any = response.data.data;
        //                 history.goBack();
        //             },
        //         },
        //     ],
        //     inputs: [
        //         {
        //             type: 'textarea',
        //             placeholder: 'Remarks',
        //         },
        //     ]
        // })
    }

    const confirmRejected = async () => {

        // presentAlert({
        //     header: 'Confirmation',
        //     message: 'Are you sure want to change status as rejected?',
        //     buttons: [
        //         {
        //             text: 'Cancel',
        //             role: 'cancel',
        //             handler: () => {
        //                 console.log('Alert canceled');
        //             },
        //         },
        //         {
        //             text: 'Completed',
        //             role: 'confirm',
        //             handler: async (e) => {

        //                 const params = {
        //                     dataType: state.dataType,
        //                     type: state.id,
        //                     inspection_id: state.id,
        //                     remarks: e ? e[0] : '',
        //                     user_id: user.id
        //                 }
        //                 const response: any = (await APIService.post('inspection/rejectInspection', params));
        //                 const data: any = response.data.data;
        //                 history.goBack();
        //             },
        //         },
        //     ],
        //     inputs: [
        //         {
        //             type: 'textarea',
        //             placeholder: 'Remarks',
        //         },
        //     ]
        // })
    }

    const confirmProceed = async () => {

        // presentAlert({
        //     header: 'Confirmation',
        //     message: 'Are you sure want to change status as proceed?',
        //     buttons: [
        //         {
        //             text: 'Cancel',
        //             role: 'cancel',
        //             handler: () => {
        //                 console.log('Alert canceled');
        //             },
        //         },
        //         {
        //             text: 'Completed',
        //             role: 'confirm',
        //             handler: async (e) => {

        //                 const params = {
        //                     dataType: state.dataType,
        //                     type: state.id,
        //                     inspection_id: state.id,
        //                     remarks: e ? e[0] : '',
        //                     user_id: user.id
        //                 }
        //                 const response: any = (await APIService.post('inspection/proceedInspection', params));
        //                 const data: any = response.data.data;
        //                 history.goBack();
        //             },
        //         },
        //     ],
        //     inputs: [
        //         {
        //             type: 'textarea',
        //             placeholder: 'Remarks',
        //         },
        //     ]
        // })
    }

    return (
        <>
            <Box bg='white' h='100%'>
                <Stack pb={30} gap={10}>
                    <Stack mt={10} mb={10} gap='xs'>
                        <Group>
                            <Text>Status:</Text>
                            {data.status_code && <Badge size='lg' color={data.status_color}>{data.status_code}</Badge>}
                        </Group>

                        {(data.can_proceed || data.can_reject) && <>
                            <Divider my={5} variant="dashed" />
                            <Group grow>
                                {data.can_proceed && <Button radius='md' size='md' color='green.5' c='black' leftSection={<IconCheckbox size={20} />} onClick={confirmProceed}>Proceed</Button>}
                                {data.can_reject && <Button radius='md' size='md' color='red.5' c='black' leftSection={<IconCheckbox size={20} />} onClick={confirmRejected}>Rejected</Button>}
                            </Group>
                        </>}

                        <Divider my={5} variant="dashed" />
                        <Text>Files:</Text>
                        <SimpleGrid cols={3} mb={10}>
                            {data.files && data.files.map((file: any, index: any) => {
                                return <ImagePreview key={index} src={file.thumbnail_url} />
                            })}
                        </SimpleGrid>

                        <Divider my={5} variant="dashed" />
                        <SegmentedControl data={types} size='sm' color='primary' radius='md' bg='primary.0' value={data ? data.type : ''} readOnly />
                    </Stack>

                    {data.type == 'claim' && <AppInput label='Policy No' value={data.policy_no ? data.policy_no : ''} readOnly onChange={null} />}

                    <Divider my={10} label="Staff & Dealer" />

                    {data.type != 'claim' && <>
                        <AppInput leftSection={<IconUserDollar color='black' />} placeholder='Dealer' value={data.dealer_name ? data.dealer_name : ''} readOnly onChange={null} />
                    </>}

                    <AppInput
                        leftSection={<Text fz={14} fw='bolder' c='black'>MO</Text>}
                        placeholder='Marketing Officer*'
                        value={data.marketing_officer_name ? data.marketing_officer_name : ''} readOnly onChange={null}
                    />
                    <AppInput leftSection={<IconUserCog color='black' />} label='Technician Branch' readOnly value={data.technician_branch_name ? data.technician_branch_name : ''} onChange={null} />

                    <Divider my={10} label="Inspection Details" />

                    {data.type != 'claim' && <>
                        <AppInput leftSection={<IconCertificate2 color='black' />} placeholder='Warranty Plan' readOnly value={data.warranty_plan_name ? data.warranty_plan_name : ''} onChange={null} />
                        <AppInput leftSection={<IconCalendar color='black' />} label='Period' readOnly value={data.period_name ? data.period_name : ''} onChange={null} />
                        <AppInput leftSection={<IconDiscount2 color='black' />} placeholder='Promo' readOnly value={data.promo_name ? data.promo_name : ''} onChange={null} />
                        <Divider my={10} label="Vehicle Details" />
                        <AppInput leftSection={<IconCar color='black' />} label='No Of Vehicles' readOnly value={data.vehicle ? data.vehicle : ''} onChange={null} />
                        <AppInput leftSection={<IconCarCrash color='black' />} placeholder='Chassis' readOnly value={data.chassis ? data.chassis : ''} onChange={null} />
                    </>
                    }
                    <AppInput leftSection={<IconRoad color='black' />} placeholder='Mileage' readOnly value={data.mileage ? data.mileage : ''} onChange={null} />

                    <AppTextArea placeholder='Remarks' readOnly value={data.remarks ? data.remarks : ''} onChange={null} />

                    {data && data.extra && data.extra.map((extra: any, index: any) => {
                        return <>
                            <Card key={index} withBorder radius='md'>
                                <Text fw={500} fz={18}>
                                    {extra.title}
                                </Text>
                                <Divider my={10} />
                                <Stack gap={8}>
                                    {extra.data.map((data: any, index: any) => {
                                        return <Group>
                                            <Text fz={16}>{data.label}</Text>
                                            <Text fz={16}>{data.value}</Text>
                                        </Group>
                                    })
                                    }
                                </Stack>

                            </Card>
                        </>
                    })
                    }
                </Stack>
            </Box>
        </>
    )
}
