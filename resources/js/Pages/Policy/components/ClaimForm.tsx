import { AddButtonModal, AppDataShow, AppDatePicker, AppDateTimePicker, AppInput, AppSelect, AppTable, AppTextArea, ButtonModal, ConfirmButton, TableColCapitalize } from '@/Components';
import { router, useForm, usePage } from '@inertiajs/react';
import { Badge, Box, Button, Card, Divider, Group, Paper, Select, SimpleGrid, Stack, Stepper, Table, Text } from '@mantine/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AppDate } from '@/Components'
import ServiceForm from './ServiceForm';
import { IconActivityHeartbeat, IconArrowBack, IconArrowLeft, IconArrowRight, IconBan, IconCheck } from '@tabler/icons-react';
import PolicyStatusBadge from './PolicyStatusBadge';
import BalanceStatus from './BalanceStatus';
import ServiceList from './ServiceList';
import { useDidUpdate } from '@mantine/hooks';
import { AppDropzone } from '@/features';
import { FileListPreview } from '@/features/app-dropzone';

export default function ClaimForm({ values, closeModal, policy }: { values?: any, closeModal?: any, policy: any }) {

    const { settings, claim_items, claim_items_select }: any = usePage().props;
    const [active, setActive] = useState(0);
    const [highestStepVisited, setHighestStepVisited] = useState(active);
    const [searchItem, setSearchItem] = useState('');
    const [statusModal, setStatusModal] = useState(false);
    const [uncoveredItem, setUncoveredItem] = useState<any>('');

    console.log('values', values)

    const [claim, setClaim] = useState()
    const [id, setId] = useState(values ? values.id : null)

    const { data, setData, post, put, reset, errors } = useForm({
        date: values ? new Date(AppDate({ children: values.date, format: 'YYYY/MM/D HH:mm:ss' })) : '',
        mileage: values ? values.mileage : '',
        workshop: values ? values.workshop : '',
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

        if (!id) {
            post(route('claim.store'), {
                data,
                onSuccess: (e: any) => {
                    console.log('response', e.props.params.id);
                    const data = { ...e.props.params, date: new Date(e.props.params.date) };
                    setClaim(data);
                    setId(data.id);
                    setData(data);
                    console.log('data', data)
                    // if (active == 1) {
                    //     handleStepChange(1);
                    // }
                    // closeModal()
                },
            });
        } else {
            put(route('claim.update', id), {
                data,
                onSuccess: () => {
                    setActive(1);
                },
            });
        }
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
        const findItem = claim_items.find((e: any) => e.id == itemId);
        const itemExist = data.claim_items ? data.claim_items.find((e: any) => e.item_id == itemId) : [];

        console.log('findItem', findItem)

        if (!itemExist) {
            const newData: any = {
                ...data, claim_items: [...data.claim_items, {
                    item_id: findItem.id,
                    item_name: findItem.name,
                    price: 0,
                    price_approved: 0,
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
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'status code': value.status_code,
                'created by': <TableColCapitalize text={value.created_by_name} />,
                'date': <AppDate format='D/MM/YYYY h:mm a'>{value.created_at}</AppDate>,
            });
        })
        return values;
    }

    const onSuccesUpload = (data: any) => {

        router.put(route('claim.add_attachment', id), data, {
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

    return (
        <Box p={'md'} w={{ xs: '700px', sm: '700px', md: '80vw', lg: '1200px' }}>

            <Group mb={20} gap='md' justify='space-between'>
                <Group gap={0}>
                    <Group gap={'xs'}>
                        <Text fz={16}>Policy Statusxx:</Text>
                        <PolicyStatusBadge status={policy.status_code} />
                    </Group>
                    <Group gap={'xs'}>
                        <Text fz={16}>Payment Status:</Text>
                        <PolicyStatusBadge status={policy.payment_status_code} />
                        {!policy.is_foc && <BalanceStatus balance={policy.balance_payment} currency={settings.currency_symbol?.value} />}
                    </Group>
                </Group>
                <Group gap={'xs'}>
                    <Text fz={16}>Policy Status:</Text>
                    <PolicyStatusBadge status={policy.status_code} />
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
                            <AppDateTimePicker disabled={!values.can_edit} label='Claim Date' required id='date' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('date', e)} />
                            <AppInput disabled={!values.can_edit} type='number' label='Current Mileage' required id='mileage' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('mileage', e)} />
                            <AppInput disabled={!values.can_edit} label='Workshop' id='workshop' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('workshop', e.target.value)} />
                            <AppTextArea disabled={!values.can_edit} rows={4} label='Remarks' id='remarks' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('remarks', e.target.value)} />
                        </Stack>
                        <Button disabled={!values.can_edit} mt={20} color='green' type='submit' form='claim-form'>Submit</Button>
                    </Card>
                </form >
                {id && <Card withBorder miw={450} maw={800} p='lg'>
                    <Stack gap={'xs'}>
                        <Group>
                            <Text>Created by:</Text>
                            <Text tt='capitalize'>{data.created_by_name}</Text>
                        </Group>
                        <Group justify='space-between'>
                            <Group>
                                <Text>Claim Status:</Text>
                                {data.status_code == 'draft' && <Badge color='blue'>{data.status_code}</Badge>}
                                {(data.status_code == 'pre_approved' || data.status_code == 'approved') && <Badge color='green'>{data.status_code}</Badge>}
                                {(data.status_code == 'pre_rejected' || data.status_code == 'rejected') && <Badge color='red'>{data.status_code}</Badge>}
                                {data.status_code == 'appeal' && <Badge color='pink'>{data.status_code}</Badge>}
                            </Group>
                            {!statusModal && <Button size='xs' bg='orange' radius='xl' onClick={() => setStatusModal(true)} disabled={!values.froze}>Change Status</Button>}
                            {statusModal && <Button size='xs' bg='gray.6' radius='xl' onClick={() => setStatusModal(false)}>Cancel</Button>}
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

            <Card withBorder my={25}>
                <Stack gap={'xs'}>
                    <Text mb={20} fz={20}>Attachments</Text>
                    <Box my={2}>
                        <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccesUpload(data)} />
                    </Box>
                    {policy.ic_files && policy.ic_files.length > 0 && <Box p='md'>
                        <FileListPreview files={values.files} type='claim' />
                    </Box>}
                </Stack>
            </Card>

            <Card withBorder my={25}>
                <Text mb={20} fz={20}>Service Status</Text>
                <ServiceList policy={policy} />
            </Card>

            {id && <Card withBorder mb={40}>
                <Text my={20} fz={20}>Claim Items</Text>
                <Box>
                    {/* {JSON.stringify(claim_items)} */}
                    <form onSubmit={onSubmit} id='claim-form'>
                        <Stack>
                            <AppSelect disabled={!values.can_add_item} label='Add Claim Item' data={claim_items_select} searchValue={searchItem} onChange={(e: any) => { addItem(e); setSearchItem(''); }} searchable />
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
                                                <AppInput readOnly={!values.can_edit} type='number' placeholder='Quotation Price' value={item.price} onChange={(e: any) => editItem(index, 'price', e)} />
                                            </Table.Td>
                                            <Table.Td>
                                                <AppInput readOnly={!values.can_edit} type='number' placeholder='Approval Price' value={item.price_approved} onChange={(e: any) => editItem(index, 'price_approved', e)} />
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
                                <Button disabled={!values.can_add_item} mt={32} onClick={addUncoveredItem}>Add</Button>
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
                                                <AppInput readOnly={!values.can_add_item} placeholder='Item Name' value={item.item_name} onChange={(e: any) => editItem(index, 'item_name', e.target.value)} />
                                            </Table.Td>
                                            <Table.Td>
                                                <AppInput readOnly={!values.can_add_item} type='number' placeholder='Quotation Price' value={item.price} onChange={(e: any) => editItem(index, 'price', e)} />
                                            </Table.Td>
                                            <Table.Td>
                                                <AppInput readOnly={!values.can_add_item} type='number' placeholder='Approval Price' value={item.price_approved} onChange={(e: any) => editItem(index, 'price_approved', e)} />
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
        </Box>
    )
}
