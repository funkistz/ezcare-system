import { AppDateTimePicker, AppInput, AppTextArea } from '@/Components'
import { router, usePage } from '@inertiajs/react'
import { Box, Stack, Group, Badge, Divider, Button, SegmentedControl, SimpleGrid, Text } from '@mantine/core'
import { IconTrash, IconCheckbox, IconCalendar, IconUserCog, IconUserDollar, IconCertificate2, IconCar, IconDiscount2, IconMap2 } from '@tabler/icons-react'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

export default function ViewScheduleInspection({ id }: any) {

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
        }

        const response: any = axios.get('/api/inspection/showSchedule/' + id, {
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

    return (
        <>
            <Box bg='white' h='100%'>
                <Stack pb={30} gap={10}>
                    <Stack mt={10} mb={10} gap='xs'>
                        <Group>
                            <Text>Status:</Text>
                            {data.status_code && <Badge size='lg' color={data.status_color}>{data.status_code}</Badge>}
                        </Group>

                        {data.status_code != 'pending' && <>
                            <Divider my={5} variant="dashed" />
                            <Group grow>
                                {data.can_unassigned && <Button radius='md' size='md' color='orange' c='black' leftSection={<IconTrash size={20} />} onClick={confirmUnassigned}>Unassigned</Button>}
                                {data.can_complete && <Button radius='md' size='md' color='green' c='black' leftSection={<IconCheckbox size={20} />} onClick={confirmCompleted}>Complete</Button>}
                            </Group>
                        </>}

                        <Divider my={5} variant="dashed" />
                        <SegmentedControl data={types} size='sm' color='primary' radius='md' bg='primary.0' value={data ? data.type : ''} readOnly />
                    </Stack>

                    <AppDateTimePicker leftSection={<IconCalendar color='black' />} label='Appointment Date' readOnly value={(data && data.date) ? moment(data.date).toDate() : null} />

                    {data.type == 'claim' && <AppInput label='Policy No*' readOnly value={data.policy_no ? data.policy_no : ''} onChange={null} />}

                    {data.type != 'claim' && <>
                        <Divider my={10} label="Staff & Dealer" />
                        <AppInput leftSection={<IconUserCog color='black' />} label='Technician' readOnly value={data.technician_name ? data.technician_name : ''} onChange={null} />
                        <AppInput leftSection={<Text fz={14} fw='bolder' c='black'>MO</Text>} label='Marketing Officer' readOnly value={data.marketing_officer_name ? data.marketing_officer_name : ''} onChange={null} />
                        <AppInput leftSection={<IconUserDollar color='black' />} label='Dealer' readOnly value={data.dealer_name ? data.dealer_name : ''} onChange={null} />
                    </>}

                    {data.type == 'claim' && <>
                        <AppInput leftSection={<Text fz={14} fw='bolder' c='black'>MO</Text>} label='Marketing Officer' readOnly value={data.marketing_officer_name ? data.marketing_officer_name : ''} onChange={null} />
                        <AppInput leftSection={<IconUserCog color='black' />} label='Technician Branch' readOnly value={data.technician_branch_name ? data.technician_branch_name : ''} onChange={null} />
                    </>}

                    {data.type != 'claim' && <Divider my={10} label="Inspection Details" />}

                    {data.type != 'claim' && <>

                        <AppInput leftSection={<IconCertificate2 color='black' />} placeholder='Warranty Plan' readOnly value={data.warranty_plan_name ? data.warranty_plan_name : ''} onChange={null} />
                        <SimpleGrid cols={2}>
                            <AppInput leftSection={<IconCalendar color='black' />} label='Period' readOnly value={data.period_name ? data.period_name : ''} onChange={null} />
                            <AppInput leftSection={<IconCar color='black' />} label='No Of Vehicles' readOnly value={data.vehicle_total ? data.vehicle_total : ''} onChange={null} />
                        </SimpleGrid>
                        <AppInput leftSection={<IconDiscount2 color='black' />} placeholder='Promo' readOnly value={data.promo_name ? data.promo_name : ''} onChange={null} />
                    </>
                    }

                    {data.type == 'claim' && <AppInput leftSection={<IconMap2 color='black' />} placeholder='Location' readOnly value={data.location ? data.location : ''} onChange={null} />}

                    <AppTextArea placeholder='Remarks' readOnly value={data.remarks ? data.remarks : ''} onChange={null} />
                </Stack>
            </Box>
        </>
    )
}
