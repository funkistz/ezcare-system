import { AddButtonModal, AppDataShow, AppDatePicker, AppDateTimePicker, AppInput, AppPrice, AppPriceShow, AppSegmentControl, AppSelect, AppTable, AppTextArea, ButtonModal, ConfirmButton, TableColCapitalize, UpdateButtonModal } from '@/Components';
import { router, useForm, usePage } from '@inertiajs/react';
import { Badge, Box, Button, Card, Divider, Group, Paper, Select, SimpleGrid, Stack, Stepper, Table, Text } from '@mantine/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AppDate } from '@/Components'
import ServiceForm from './ServiceForm';
import { IconActivityHeartbeat, IconArrowBack, IconArrowLeft, IconArrowRight, IconBan, IconCheck, IconFileTypePdf, IconProgressCheck, IconX, IconXboxX } from '@tabler/icons-react';
import PolicyStatusBadge from './PolicyStatusBadge';
import BalanceStatus from './BalanceStatus';
import ServiceList from './ServiceList';
import { useDidUpdate } from '@mantine/hooks';
import { AppDropzone } from '@/features';
import { FileListPreview } from '@/features/app-dropzone';
import axios from 'axios';
import { size } from 'lodash';
import ClaimDeniedForm from './ClaimDeniedForm';
import ClaimPaymentForm from './ClaimPaymentForm';
import { IconFileText } from '@tabler/icons-react';

const locations = [
    {
        label: 'Home',
        value: '1'
    },
    {
        label: 'Office',
        value: '2'
    }
];

export default function PolicyClaimForm({ values, closeModal, policy }: { values?: any, closeModal?: any, policy: any }) {

    const { settings, claim_items, claim_items_select, vehicle_models, claim_denied_statuses }: any = usePage().props;
    const [active, setActive] = useState(0);
    const [highestStepVisited, setHighestStepVisited] = useState(active);
    const [searchItem, setSearchItem] = useState('');
    const [statusModal, setStatusModal] = useState(false);
    const [uncoveredItem, setUncoveredItem] = useState<any>('');

    console.log('values', values)

    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [parts, setParts] = useState([]);

    useEffect(() => {

        if (model && year && year.length == 4) {
            axios.get(route('api.car-parts.index'), {
                params: {
                    model, year
                }
            }).then((response) => {

                if (response.data.data) {
                    console.log('parts', response.data.data)
                    setParts(response.data.data);
                }
            });
        } else {
            setParts([]);
        }

    }, [model, year])

    const [claim, setClaim] = useState()
    const [id, setId] = useState(values ? values.id : null)

    const { data, setData, post, put, reset, errors } = useForm({
        date: values ? new Date(AppDate({ children: values.date, format: 'YYYY/MM/D HH:mm:ss' })) : '',
        mileage: values ? values.mileage : '',
        location: values ? String(values.location) : '',
        workshop_name: values ? values.workshop_name : '',
        workshop_phone_no: values ? values.workshop_phone_no : '',
        remarks: values?.remarks ? values.remarks : '',
        inspection_date: values ? values.inspection_date : '',
        policy_id: policy.id,
        claim_items: values && values.claim_items ? values.claim_items : [],
        status_code: values && values.status_code ? values.status_code : '',
        claim_statuses: values && values.claim_statuses ? values.claim_statuses : [],
        created_by_name: values ? values.created_by_name : '',
    });

    useDidUpdate(() => {
        console.log('dataxxx', data)
        if (data && data.date) {
            setData('claim_items', values.claim_items);
        }
    }, [values.claim_items])

    const onSubmit = (e: any) => {
        e.preventDefault();

        put(route('claim.update', id), {
            data,
            onSuccess: () => {
                setActive(1);
            },
        });
    }

    const addItem = (itemId: any) => {

        // put(route('claim.add_item', itemId), {
        //     data,
        //     onSuccess: () => {
        //         router.reload();
        //     },
        // });

        // return;

        // const newData: any = { ...data, claim_items: [] };
        // setData(newData);
        // return;

        console.log('claim_items', claim_items);
        console.log('addItem', itemId);
        // const findDiscount = discounts.find((e: any) => e.id != discountId);
        const findItem: any = parts.find((e: any) => e.value == itemId);
        const itemExist = data.claim_items ? data.claim_items.find((e: any) => e.item_id == itemId) : [];

        console.log('findItem', findItem)

        if (!itemExist) {
            const newData: any = {
                ...data, claim_items: [...data.claim_items, {
                    item_id: findItem.id,
                    item_name: findItem.name,
                    price: 0,
                    price_approved: findItem.amount,
                    remarks: '',
                }]
            };
            setData(newData);
        }
    }

    const editItem = (index: any, field: any, value: any) => {

        const claimItems: any = data.claim_items;
        claimItems[index][field] = value;

        setData({ ...data, claim_items: claimItems });
    }

    const removeItem = (item_id: any) => {
        // const claimItems: any = data.claim_items.splice(index, 1);

        const claimItems: any = data.claim_items.filter((obj: any) => {
            return obj.item_id !== item_id;
        });

        console.log('item_id', item_id)
        console.log('claimItems', claimItems)
        setData({ ...data, claim_items: claimItems });

    }

    const deleteItem = (item_id: any) => {
        put(route('claim.delete_item', item_id), {
            data,
            onSuccess: () => {
                reset();
            },
        });
    }

    const onChangeStatus = (status: any) => {

        router.put(route('claim.update_status', id), {
            status_code: status
        }, {
            onSuccess: (e: any) => {
                // setActive(1);
                setStatusModal(false);
                const data = { ...e.props.params, date: new Date(e.props.params.date) };
                setData(data);
            },
        });
    }

    const tableData = (data: []) => {

        console.log('tableData', data)

        const values: any = [];
        data.map((value: any) => {
            values.push({
                'status': <Stack gap={0}>
                    <Text tt={'capitalize'}>{value.status_code}</Text>
                    {!!value.reason && <Text>Reason: {value.reason}</Text>}
                    {!!value.remarks && <Text>Remarks: {value.remarks}</Text>}
                    <Text>By: {value.created_by_name}</Text>
                </Stack>,
                'date': <AppDate format='D/MM/YYYY h:mm a'>{value.created_at}</AppDate>,
            });
        })
        return values;
    }

    const onSuccesUpload = (data: any) => {

        router.put(route('claim.add_attachment', id), { ...data, claim_id: id }, {
            onSuccess: () => {
            },
        });
    }

    const onSuccesUploadClaimPayment = (data: any, payment: any) => {

        router.put(route('claim_payment.add_attachment', payment.id), data, {
            onSuccess: () => {
            },
        });
    }

    const addUncoveredItem = () => {

        const newData: any = {
            ...data, claim_items: [...data.claim_items, {
                item_name: uncoveredItem,
                price: 0,
                price_approved: 0,
                remarks: '',
            }]
        };
        setData(newData);
        setUncoveredItem('');
    }

    const downloadClaimApproval = () => {

        window.open(route('policy_claim.generate-approvaldoc') + '?claim_id=' + values.id, "_blank")

    }

    const claimItemPrice = () => {

        let price = 0;

        data.claim_items.map((item: any) => {
            price = price + Number(item.price);
        });

        return price;
    }

    const claimItemPriceApproved = () => {
        let price = 0;

        data.claim_items.map((item: any) => {
            price = price + Number(item.price_approved);
        });

        return price;
    }

    return (
        <Box p={'md'} w={{ xs: '700px', sm: '700px', md: '80vw', lg: '1200px' }}>

            <Group mb={20} gap='md' justify='space-between'>
                <Group gap={'md'}>
                    <Group gap={'xs'}>
                        <Text fz={16}>Policy Status: </Text>
                        <PolicyStatusBadge status={policy.status_code} />
                    </Group>
                    <Group gap={'xs'}>
                        <Text fz={16}>Payment Status:</Text>
                        <PolicyStatusBadge status={policy.payment_status_code} />
                        {!policy.is_foc && <BalanceStatus balance={policy.balance_payment} currency={settings.currency_symbol?.value} />}
                    </Group>
                </Group>
                <Group gap={'xs'}>
                    <Button color='green' leftSection={<IconFileText />} onClick={() => downloadClaimApproval()}>Download Claim Approval</Button>
                </Group>
            </Group>
            <SimpleGrid cols={2}>
                <form onSubmit={onSubmit} id='claim-form'>
                    <Card withBorder miw={500} maw={800} p='lg'>
                        <Group justify='space-between' mb={20}>
                            <Text fz={20}>Claim Details</Text>
                            {values.can_generate_report && <Button size='xs' bg='lime.7'>Generate Report</Button>}
                        </Group>

                        <Stack gap={0}>
                            {/* <AppDateTimePicker disabled={!values.can_edit} label='Claim Date' required id='date' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('date', e)} />
                            <AppInput disabled={!values.can_edit} type='number' label='Current Mileage' required id='mileage' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('mileage', e)} /> */}
                            <AppSegmentControl label='Type:' value={data.location} onChange={(e: any) => setData('location', e)} data={locations} w={300} />
                            <AppInput disabled={!values.can_edit} label='Workshop Name' id='workshop_name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('workshop_name', e.target.value)} />
                            <AppInput disabled={!values.can_edit} label='Workshop Phone No' id='workshop_phone_no' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('workshop_phone_no', e.target.value)} />
                            <AppTextArea disabled={!values.can_edit} rows={4} label='Remarks' id='remarks' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('remarks', e.target.value)} />
                        </Stack>
                        <Button disabled={!values.can_edit} mt={20} color='green' type='submit' form='claim-form'>Submit</Button>
                    </Card>
                </form >
                {id && <Card withBorder miw={450} maw={800} p='lg'>
                    <Stack gap={'xs'}>
                        {values.can_approve && <><Group justify='end'>
                            <ConfirmButton title={'Approve Claim?'} label='Claim Approval' leftSection={<IconX />} color='green' size='m' radius='xl' onConfirm={() => { onChangeStatus('approved'); }} />
                            <UpdateButtonModal title={'Claim Denied'} label='Claim Denied' options={{ leftSection: <IconCheck />, color: 'red', size: 'm', radius: 'xl' }}
                                children={<ClaimDeniedForm claim={values} />} />
                        </Group>
                            <Divider mt={10} />
                        </>
                        }
                        <Group>
                            <Text>Created by:</Text>
                            <Text tt='capitalize'>{data.created_by_name}</Text>
                        </Group>
                        <Group justify='space-between'>
                            <Group>
                                <Text>Claim Status:</Text>
                                {data.status_code == 'pending' && <Badge color='gray'>{data.status_code}</Badge>}
                                {data.status_code == 'draft' && <Badge color='blue'>{data.status_code}</Badge>}
                                {(data.status_code == 'pre_approved' || data.status_code == 'approved') && <Badge color='green'>{data.status_code}</Badge>}
                                {(data.status_code == 'pre_rejected' || data.status_code == 'rejected') && <Badge color='red'>{data.status_code}</Badge>}
                                {data.status_code == 'appeal' && <Badge color='pink'>{data.status_code}</Badge>}
                                {data.status_code == 'processing' && <Badge color='pink'>{data.status_code}</Badge>}
                                {data.status_code == 'denied' && <Badge color='red'>{data.status_code}</Badge>}
                            </Group>
                            {/* {!statusModal && <Button size='xs' bg='orange' radius='xl' onClick={() => setStatusModal(true)} disabled={!values.froze}>Change Status</Button>}
                            {statusModal && <Button size='xs' bg='gray.6' radius='xl' onClick={() => setStatusModal(false)}>Cancel</Button>} */}
                        </Group>
                    </Stack>
                    {statusModal && <Stack gap={'xs'} align="end" mt={20}>
                        {/* <Text>Change Status:</Text> */}
                        <Card>
                            <Stack>
                                <Group justify='flex-end'>
                                    {values.can_pre_approve
                                        && <ConfirmButton size='xs' bg='lime.7' leftSection={<IconCheck size={16} />} radius='lg' onConfirm={() => onChangeStatus('pre_approved')} label={'Pre-approve'} />
                                    }
                                    {values.can_pre_rejected
                                        && <ConfirmButton size='xs' bg='pink.7' leftSection={<IconBan size={16} />} radius='lg' onConfirm={() => onChangeStatus('pre_rejected')} label={'Pre-reject'} />
                                    }
                                </Group>
                                <Group justify='flex-end'>
                                    {values.can_approve
                                        && <ConfirmButton size='xs' bg='green.7' leftSection={<IconCheck size={16} />} radius='lg' onConfirm={() => onChangeStatus('approved')} label={'Approve'} />
                                    }
                                    {values.can_reject
                                        && <ConfirmButton size='xs' bg='red.7' leftSection={<IconBan size={16} />} radius='lg' onConfirm={() => onChangeStatus('rejected')} label={'Reject'} />
                                    }
                                    {values.can_appeal
                                        && <ConfirmButton size='xs' bg='pink.5' leftSection={<IconActivityHeartbeat size={16} />} radius='lg' onConfirm={() => onChangeStatus('appeal')} label={'Appeal'} />
                                    }
                                </Group>
                            </Stack>
                        </Card>
                    </Stack>}
                    {data.claim_statuses && <Stack gap={'xs'} align="start" mt={20}>
                        <Text>Status History:</Text>
                        <AppTable data={tableData(data.claim_statuses)} />
                    </Stack>}
                </Card>
                }
            </SimpleGrid>

            {values.status_code == 'approved' && <Card withBorder my={25}>
                <Stack gap={'xs'}>
                    <Group justify='space-between'>
                        <Text fz={20}>Claim Payment</Text>
                        <UpdateButtonModal title={'Claim Payment'} label='Add Payment' options={{ leftSection: <IconCheck />, color: 'blue' }}
                            children={<ClaimPaymentForm claim={values} />} />
                    </Group>
                    {values.claim_payments && values.claim_payments.map((payment: any) => {
                        return <Card m={10} shadow='xs'>
                            <Stack>
                                <Group gap={80}>
                                    <Stack gap={5}>
                                        <Group fz='lg'>
                                            <Text>Reference No:</Text>
                                            <Text fw='bolder'>{payment.reference_no}</Text>
                                        </Group>
                                        <Text fz='lg' fw='bolder'><AppPrice price={payment.amount} /></Text>
                                    </Stack>
                                    <Stack gap={5}>
                                        <Group>
                                            <Text>Date:</Text>
                                            <AppDate>{payment.date}</AppDate>
                                        </Group>
                                        <Group>
                                            <Text>Remarks:</Text>
                                            <Text>{payment.remarks}</Text>
                                        </Group>
                                    </Stack>
                                </Group>
                                <Stack gap={15}>
                                    <Text fz={'md'}>Payment Documents:</Text>
                                    <Divider />
                                    <Box my={2}>
                                        <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccesUploadClaimPayment(data, payment)} />
                                    </Box>
                                    {payment.files && payment.files.length > 0 && <Box p='md'>
                                        <FileListPreview files={payment.files} />
                                    </Box>}
                                </Stack>
                            </Stack>
                        </Card>;
                    })}
                </Stack>
            </Card>}

            <Card withBorder my={25}>
                <Stack gap={'xs'}>
                    <Text mb={20} fz={20}>Claim Documents</Text>
                    <Box my={2}>
                        <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccesUpload(data)} />
                    </Box>
                    {values.files && values.files.length > 0 && <Box p='md'>
                        <FileListPreview files={values.files} type='claim' />
                    </Box>}
                </Stack>
            </Card>

            <Card withBorder my={25}>
                <Text mb={20} fz={20}>Service Status</Text>
                {values.status_code == 'pending' && <Group>
                    <ConfirmButton leftSection={<IconProgressCheck />} size='sm' bg='green' onConfirm={() => { onChangeStatus('processing'); }} label='Process Service' />
                </Group>
                }
                {values.status_code != 'pending' && <ServiceList policy={policy} />}
            </Card>

            {id && values.status_code != 'pending' && <Card withBorder mb={40}>
                <Text my={20} fz={20}>Claim Items</Text>
                <Box>
                    {/* {JSON.stringify(claim_items)} */}
                    <form onSubmit={onSubmit} id='claim-form'>
                        <Stack>
                            <Stack gap={0}>
                                <Group>
                                    <AppSelect label='Vehicle Model' disabled={!values.can_add_item} data={vehicle_models} value={model} onChange={(e: any) => { setModel(String(e)); console.log('setModel', e) }} searchable />
                                    <AppInput label='Vehicle Year' disabled={!values.can_add_item} type='number' errors={errors ? errors : null} value={year} onChange={(e: any) => { setYear(e); }} />
                                </Group>
                                <AppSelect label='Add Claim Item' disabled={!values.can_add_item} data={parts} searchValue={searchItem} onChange={(e: any) => { addItem(e); setSearchItem(''); }} searchable disabled={!model || !year} />
                            </Stack>

                            <Table>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Item Name</Table.Th>
                                        <Table.Th>Quotation Price</Table.Th>
                                        <Table.Th>Approval Price</Table.Th>
                                        <Table.Th>Action</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>

                                <Table.Tbody>
                                    {data.claim_items && data.claim_items.map((item: any, index: any) => {

                                        if (!item.item_id) {
                                            return;
                                        }
                                        // console.log('item', item)
                                        return <Table.Tr key={index}>
                                            <Table.Td>
                                                <Text tt='capitalize'> {item.real_item_name ? item.real_item_name : item.item_name}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <AppInput disabled={!values.can_edit} type='number' placeholder='Quotation Price' value={item.price} onChange={(e: any) => editItem(index, 'price', e)} />
                                            </Table.Td>
                                            <Table.Td>
                                                <AppInput disabled={!values.can_edit} type='number' placeholder='Approval Price' value={item.price_approved} onChange={(e: any) => editItem(index, 'price_approved', e)} />
                                            </Table.Td>
                                            <Table.Td>
                                                {!item.id && <Button size='xs' bg='red' onClick={() => removeItem(item.item_id)}>Delete</Button>}
                                                {!!item.id && <ConfirmButton size='xs' bg='red' onConfirm={() => deleteItem(item.id)} label='Delete' disabled={!values.can_add_item} />}
                                            </Table.Td>
                                        </Table.Tr>
                                    })}
                                </Table.Tbody>
                            </Table>
                            {/* <Group justify='flex-end'>
                                <Button mt={20} color='green' type='submit' form='claim-form'>Save</Button>
                            </Group> */}
                        </Stack>

                        <Stack>
                            <Group>
                                <AppInput disabled={!values.can_add_item} label='Add Uncovered Item' value={uncoveredItem} onChange={(e: any) => setUncoveredItem(e.target.value)} />
                                <Button disabled={!values.can_add_item} mt={32} onClick={() => addUncoveredItem()}>Add</Button>
                            </Group>
                            <Table>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Item Name</Table.Th>
                                        <Table.Th>Quotation Price</Table.Th>
                                        <Table.Th>Approval Price</Table.Th>
                                        <Table.Th>Action</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>

                                <Table.Tbody>
                                    {data.claim_items && data.claim_items.map((item: any, index: any) => {


                                        if (item.item_id) {
                                            return;
                                        }
                                        // console.log('item', item)
                                        return <Table.Tr key={index}>
                                            <Table.Td>
                                                <AppInput disabled={!values.can_add_item} placeholder='Item Name' value={item.item_name} onChange={(e: any) => editItem(index, 'item_name', e.target.value)} />
                                            </Table.Td>
                                            <Table.Td>
                                                <AppInput disabled={!values.can_add_item} type='number' placeholder='Quotation Price' value={item.price} onChange={(e: any) => editItem(index, 'price', e)} />
                                            </Table.Td>
                                            <Table.Td>
                                                <AppInput disabled={!values.can_add_item} type='number' placeholder='Approval Price' value={item.price_approved} onChange={(e: any) => editItem(index, 'price_approved', e)} />
                                            </Table.Td>
                                            <Table.Td>
                                                {!item.id && <Button size='xs' bg='red' onClick={() => removeItem(item.item_id)}>Delete</Button>}
                                                {!!item.id && <ConfirmButton size='xs' bg='red' onConfirm={() => deleteItem(item.id)} label='Delete' disabled={!values.can_add_item} />}
                                            </Table.Td>
                                        </Table.Tr>
                                    })}
                                </Table.Tbody>
                            </Table>
                            <Group justify='flex-end'>
                                <Button mt={20} color='green' type='submit' form='claim-form' disabled={!values.can_edit}>Save</Button>
                            </Group>
                        </Stack>
                    </form>
                </Box>
            </Card>}

            <Card>
                <Group justify='end' gap='xl' mr={40}>
                    <Stack gap={5}>
                        <Text fw='bolder'>Total Quotation Price:</Text>
                        <Text fz={20}><AppPrice price={claimItemPrice()} /></Text>
                    </Stack>
                    <Stack gap={5}>
                        <Text fw='bolder'>Total Approval Price:</Text>
                        <Text fz={20}><AppPrice price={claimItemPriceApproved()} /></Text>
                    </Stack>
                </Group>
            </Card>

            {/* <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step label="Claim Details" description="First step" allowStepSelect={shouldAllowSelectStep(0)}>
                    <Text my={20} ta='center'>Step 1: Add Claim Details</Text>
                    <Stack align='center'>
                        <form onSubmit={onSubmit} id='claim-form'>
                            <Card withBorder miw={500} maw={800} p='lg'>
                                <Stack mb={20} gap='xs'>
                                    <Group gap={'xs'}>
                                        <Text fz={16}>Policy Status: </Text>
                                        <PolicyStatusBadge status={policy.status_code} /></Group>
                                    <Group gap={'xs'}>
                                        <Text fz={16}>Payment Status:</Text>
                                        <PolicyStatusBadge status={policy.payment_status_code} />
                                        {!policy.is_foc && <BalanceStatus balance={policy.balance_payment} currency={settings.currency_symbol?.value} />}
                                    </Group>
                                </Stack>
                                <Stack gap={0}>
                                    <AppDateTimePicker label='Claim Date' required id='date' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('date', e)} />
                                    <AppInput type='number' label='Current Mileage' required id='mileage' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('mileage', e)} />
                                    <AppTextArea rows={4} label='Remarks' id='remarks' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('remarks', e.target.value)} />
                                </Stack>
                            </Card>
                        </form >
                    </Stack>
                </Stepper.Step>
                <Stepper.Step label="Verify Status" description="Second step" allowStepSelect={shouldAllowSelectStep(1)}>
                    <Text my={20}>Step 2: Verify Service Status</Text>

                    <ServiceList policy={policy} />
                </Stepper.Step>
                <Stepper.Step label="Add Claim Items" description="Third step" allowStepSelect={shouldAllowSelectStep(2)}>
                    <Text my={20}>Step 3: Add Claim Items</Text>
                </Stepper.Step>
                <Stepper.Completed>
                    <Box>
                        <form onSubmit={onSubmit} id='claim-form'>
                            <Stack>
                                <AppSelect label='Add Claim Item' data={claim_items_select} searchValue={searchItem} onChange={(e: any) => { addItem(e); setSearchItem(''); }} searchable />

                                <Table>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Item Name</Table.Th>
                                            <Table.Th>Price</Table.Th>
                                            <Table.Th>Action</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>

                                    {data.claim_items && data.claim_items.map((item: any, index: any) => {
                                        console.log('item', item)
                                        return <Table.Tr key={index}>
                                            <Table.Td>
                                                <Text tt='capitalize'> {item.item_name}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <AppInput type='number' placeholder='Price' value={item.price} onChange={(e: any) => editItem(index, 'price', e)} />
                                            </Table.Td>
                                            <Table.Td>
                                                <Button size='xs' bg='red' onClick={() => removeItem(item.item_id)}>Remove</Button>
                                            </Table.Td>
                                        </Table.Tr>
                                    })}
                                </Table>
                            </Stack>
                        </form>
                    </Box>
                </Stepper.Completed>
            </Stepper> */}

            {/* <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep} disabled={active == 0} leftSection={<IconArrowLeft />}>Previous Step</Button>
                {active == 0 && <Button color='green' type='submit' rightSection={<IconArrowRight />} form='claim-form'>Submit & Continue</Button>}
                {active == 1 && <Button color='green' onClick={() => handleStepChange(3)} rightSection={<IconArrowRight />} form='claim-form'>Continue Next Step</Button>}
                {active == 3 && <Button color='green' type='submit' form='claim-form'>Submit</Button>}
            </Group> */}
        </Box >
    )
}
