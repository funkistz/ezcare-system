import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, TableColCapitalize, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Accordion, Stack, Badge, Table } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import PlanPricingForm from './PlanPricingForm';

export default function Index() {

    const { brands, warranty_plans, vehicle_groups, vehicle_power_capacities, vehicle_conditions, settings }: any = usePage().props;

    // console.log('settings', settings);
    // console.log('vehicle_groups', vehicle_groups);
    // console.log('vehicle_power_capacities', vehicle_power_capacities);
    // console.log('vehicle_conditions', vehicle_conditions);

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'name': value.name,
                'description': value.description,
                'action':
                    <Group justify='right' gap='xs'>
                        <UpdateButtonModal title='Update Plan Pricing'>
                            <></>
                        </UpdateButtonModal>
                    </Group>
            });
        })
        return values;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    const onDelete = (id: any) => {
        router.delete(route('plan-pricing.destroy', id));
    }

    const numberWithCommas = (x: any) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div>
            <Stack >
                {
                    brands.map((brand: any) => {
                        return <AppCard title={brand.name}>
                            <Accordion defaultValue="Apples" variant="separated">
                                {brand.vehicle_groups && brand.vehicle_groups.map((group: any) => {
                                    return <Accordion.Item value={'1'}>
                                        <Accordion.Control>
                                            <Group justify='space-between' pr={'xl'}>
                                                <Group gap={'xs'}>
                                                    <Text tt={'capitalize'}>{group.name}:</Text>
                                                    {group.vehicle_models.map((model: any) => {
                                                        return <Badge color="primary">{model.name}</Badge>;
                                                    })}
                                                </Group>
                                            </Group>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Group justify='flex-end' p={'sm'}>
                                                <AddButtonModal title='Add Plan Pricing'>
                                                    <PlanPricingForm defaultValue={{ vehicle_group_id: group.id }} />
                                                </AddButtonModal>
                                            </Group>
                                            <Table>
                                                <Table.Thead>
                                                    <Table.Tr>
                                                        <Table.Th>Warranty Plan</Table.Th>
                                                        <Table.Th>Power Capacity</Table.Th>
                                                        <Table.Th>Condition</Table.Th>
                                                        <Table.Th>Price *tax inclusive</Table.Th>
                                                        <Table.Th>Addon Price *tax inclusive</Table.Th>
                                                        <Table.Th>Action</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {group.plan_pricings.map((plan_pricing: any) => {
                                                        return <Table.Tr key={plan_pricing.id}>
                                                            <Table.Td>{plan_pricing.warranty_plan.name}</Table.Td>
                                                            <Table.Td>
                                                                <Group gap={'xs'}>
                                                                    <Text>{plan_pricing.vehicle_power_capacity?.min_power} {plan_pricing.vehicle_power_capacity?.type}</Text> -
                                                                    <Text>{plan_pricing.vehicle_power_capacity?.max_power} {plan_pricing.vehicle_power_capacity?.type}</Text>
                                                                </Group>
                                                            </Table.Td>
                                                            <Table.Td>
                                                                <TableColCapitalize text={plan_pricing.vehicle_condition?.name} />
                                                            </Table.Td>
                                                            <Table.Td>
                                                                <Group gap={10}>
                                                                    Retail: <TableColCapitalize text={settings.currency_symbol?.value + numberWithCommas(plan_pricing.price)} />
                                                                </Group>
                                                                <Group gap={10}>
                                                                    Dealer: <TableColCapitalize text={settings.currency_symbol?.value + numberWithCommas(plan_pricing.dealer_price)} />
                                                                </Group>
                                                            </Table.Td>
                                                            <Table.Td>
                                                                <Group gap={10}>
                                                                    Retail: <TableColCapitalize text={settings.currency_symbol?.value + numberWithCommas(plan_pricing.addon_price)} />
                                                                </Group>
                                                                <Group gap={10}>
                                                                    Dealer: <TableColCapitalize text={settings.currency_symbol?.value + numberWithCommas(plan_pricing.dealer_addon_price)} />
                                                                </Group>
                                                            </Table.Td>
                                                            <Table.Td>
                                                                <Group>
                                                                    <DeleteButton onDelete={() => onDelete(plan_pricing.id)} />
                                                                    <UpdateButtonModal title='Edit Plan Pricing' >
                                                                        <PlanPricingForm values={plan_pricing} />
                                                                    </UpdateButtonModal>
                                                                </Group>
                                                            </Table.Td>
                                                        </Table.Tr>
                                                    })}
                                                </Table.Tbody>
                                            </Table>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                })}
                            </Accordion>
                        </AppCard>
                    })
                }
            </Stack>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Plan Pricing' />;