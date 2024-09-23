import { AppCard, AppTable, UpdateButton, AppPrice, AppDate, UpdateButtonModal, HasPermission, ButtonModal, DeleteButton } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { usePage } from '@inertiajs/react';
import { Paper, Card, Text, Group, Stack, Table, SimpleGrid, Button, Tabs, Alert, Box, Divider, Title, Grid } from '@mantine/core';
import React, { useState } from 'react'
import { AppDataShow } from '@/Components';
import moment from 'moment';
import { IconCarCrane, IconCarCrash, IconCreditCard, IconEngine, IconFile, IconFileInvoice, IconGiftCard, IconInfoCircle, IconListDetails, IconPower } from '@tabler/icons-react';
import PolicyActionBar from './components/PolicyActionBar';
import PaymentList from './components/PaymentList';
import FileList from './components/FileList';
import DiscountList from './components/DiscountList';
import InvoiceList from './components/InvoiceList';
import ServiceList from './components/ServiceList';
import ClaimList from './components/ClaimList';
import VehicleForm from './components/VehicleForm';
import StaffDetailsForm from './components/StaffDetailsForm';
import CustomerForm from './components/CustomerForm';
import UserForm from './components/UserForm';
import PolicyForm from './components/PolicyForm';
import RequestPriceChangeForm from './components/RequestPriceChangeForm';
import { router } from '@inertiajs/react';
import { AuditLog } from '@/features/app-audit';

export default function View() {

    const { policy, warranty_price_change, settings }: any = usePage().props;
    const [currentTab, setcurrentTab] = useState(!policy.can_activate ? 'files' : 'policy')

    const goToFileTab = () => {
        setcurrentTab('files');

        setTimeout(() => {
            window.scrollTo({
                top: 400,
                behavior: 'smooth',
            })
        }, 100);

    }

    const onDeletePriceOverwrite = (id: any) => {
        router.delete(route('policyOverwrite.destroy', id), {
            data: {
                discount_id: id
            },
        });
    }

    console.log('xxx: ', policy)

    return (
        <>
            {(!policy.can_activate) && <Alert radius='md' variant='filled' color="red.6" title="Upload Documents!" icon={<IconInfoCircle />} mb='md'>
                <Group>
                    <Text>Kindly upload all the required documents to activate the policy. </Text>
                    <Button mb={15} variant='filled' leftSection={<IconFile />} onClick={goToFileTab}>Go To Upload Document</Button>
                </Group>
            </Alert>}

            <Card withBorder radius="md">
                <Card.Section withBorder p="md" pb='xs'>
                    <Group justify="space-between">
                        <Text fw={500}>Policy No: <b>{policy.policy_no}</b></Text>
                    </Group>
                </Card.Section>
                <Card.Section p="lg">

                    <PolicyActionBar policy={policy} />

                    <Paper p='lg' mb='sm'>
                        <Text mb='sm' fz={18} fw='bold'>Summary</Text>

                        <SimpleGrid cols={3}>
                            <Stack gap={0}>
                                <AppDataShow uppercase oneline label='Policy No' value={policy.policy_no} />
                                <AppDataShow capitalize oneline label='Vehicle' value={policy.vehicle?.name} />
                                <AppDataShow oneline uppercase label='Invoice No' value={policy.active_invoice?.invoice_no} />
                            </Stack>
                            <Stack gap={0}>
                                <AppDataShow capitalize oneline label='Name' value={policy.customer?.full_name} />
                                <AppDataShow oneline label={settings.ic_label ? settings.ic_label.value : 'KTP'} value={policy.customer?.ic} />
                                <AppDataShow oneline label='Phone No' value={policy.customer?.phone_no} />
                            </Stack>
                            <Stack gap={0}>
                                <AppDataShow oneline uppercase label='Created By' value={policy.created_by_name} />
                                <AppDataShow oneline uppercase label='Created At' value={<AppDate format='D/MM/YYYY h:mm a'>{policy.created_at}</AppDate>} />

                            </Stack>
                        </SimpleGrid>
                    </Paper>

                    <Tabs value={currentTab}>
                        <Tabs.List>
                            <Tabs.Tab value="policy" leftSection={<IconListDetails />} onClick={() => setcurrentTab('policy')}>
                                Policy Details
                            </Tabs.Tab>
                            <Tabs.Tab value="discount" leftSection={<IconGiftCard />} onClick={() => setcurrentTab('discount')}>
                                Add-ons, Discounts & Promos
                            </Tabs.Tab>
                            <Tabs.Tab value="invoice" leftSection={<IconFileInvoice />} onClick={() => setcurrentTab('invoice')}>
                                Invoices
                            </Tabs.Tab>
                            <Tabs.Tab value="payment" leftSection={<IconCreditCard />} onClick={() => setcurrentTab('payment')}>
                                Payments
                            </Tabs.Tab>
                            <Tabs.Tab value="files" leftSection={<IconFile />} onClick={() => setcurrentTab('files')}>
                                Documents
                            </Tabs.Tab>
                            {policy.status_code == 'activated' && <Tabs.Tab value="service" leftSection={<IconEngine />} onClick={() => setcurrentTab('service')}>
                                Services
                            </Tabs.Tab>}
                            <Tabs.Tab value="claim" leftSection={<IconCarCrash />} onClick={() => setcurrentTab('claim')}>
                                Claims
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="policy" >
                            <Group justify='flex-end' my='sm'>
                                {/* <UpdateButton /> */}
                            </Group>
                            <SimpleGrid
                                cols={{ base: 1, sm: 2, lg: 3 }}
                                spacing={'lg'}
                            >
                                <Stack gap='lg'>
                                    <AppCard title='Policy Details' rightComponent={
                                        <HasPermission permission='policy.edit' author={policy.created_by}>
                                            <UpdateButtonModal title={'Edit Customer'} children={<PolicyForm policy={policy} />} />
                                        </HasPermission>
                                    }>
                                        <Stack gap='xs' p='sm'>
                                            <AppDataShow label='Branch' value={policy.branch?.name} />
                                            <AppDataShow label='Policy No' uppercase value={policy.policy_no} />
                                            <AppDataShow label='Policy Type' capitalize value={policy.type} />
                                            <AppDataShow label='Remarks' value={policy.remarks} />
                                        </Stack>
                                    </AppCard>
                                    <AppCard title='Warranty Details'>
                                        <Stack gap='xs' p='sm'>
                                            <AppDataShow label='Warranty Plan' value={policy.warranty_plan?.name} />
                                            <AppDataShow label='Period' value={policy.period + ((policy.period > 1) ? ' Years' : ' Year')} />
                                            <AppDataShow label='Activated Date' value={moment(policy.activated_at).format('D/MM/YYYY')} />
                                            <AppDataShow label='Expired Date' value={moment(policy.expired_at).format('D/MM/YYYY')} />
                                        </Stack>
                                    </AppCard>

                                </Stack>
                                <AppCard title='Vehicle Details' rightComponent={
                                    <HasPermission permission='policy.edit' author={policy.created_by}>
                                        <UpdateButtonModal title={'Edit Vehicle'} children={<VehicleForm vehicle={policy.vehicle} />} />
                                    </HasPermission>
                                }>
                                    <Stack gap='xs' p='sm'>
                                        <AppDataShow label='Registration No' uppercase value={policy.vehicle?.registration_no} />
                                        <AppDataShow label='Chassis No' value={policy.vehicle?.chassis_no} />
                                        <AppDataShow label='Engine No' value={policy.vehicle?.engine_no} />
                                        <AppDataShow uppercase label='Brand' value={policy.vehicle?.brand_name} />
                                        <AppDataShow uppercase label='Model' value={policy.vehicle?.model_name} />
                                        <AppDataShow label='Power Capacity' value={policy.vehicle?.power} />
                                        <AppDataShow label='Condition' value={policy.vehicle?.condition_name} />
                                        <AppDataShow label='Year' value={policy.vehicle?.year} />
                                        <AppDataShow label='Registration Date' value={moment(policy.vehicle?.registration_date).format('D/MM/YYYY')} />
                                        <AppDataShow label='Mileage' value={policy.vehicle?.mileage + ' KM'} />
                                    </Stack>
                                </AppCard>

                                {(!policy.invoices || (policy.invoices && policy.invoices.length == 0)) && <AppCard title='Price Details' options={{ bg: 'orange.1' }}>
                                    <Box style={{ position: 'relative' }} py='md'>
                                        <Text fw='bold' mb={6}>Dealer Price</Text>
                                        <Group justify='space-between'>
                                            <Text fz={14}>Subtotal (without tax):</Text>
                                            <Text fz={14} tt={'capitalize'}><AppPrice price={policy.dealer_subtotal_without_tax} /></Text>
                                        </Group>
                                        <Group justify='space-between'>
                                            <Text fz={14}>Total Tax:</Text>
                                            <Text fz={14} tt={'capitalize'}><AppPrice price={policy.dealer_total_tax} /></Text>
                                        </Group>
                                        <Group justify='space-between'>
                                            <Text fz={14}>Subtotal (with tax):</Text>
                                            <Text fz={14} tt={'capitalize'}><AppPrice price={policy.dealer_subtotal_with_tax} /></Text>
                                        </Group>
                                        <Group justify='space-between'>
                                            <Text fz={14}>Total Discount:</Text>
                                            <Text fz={14} tt={'capitalize'}><AppPrice price={policy.dealer_total_discount} /></Text>
                                        </Group>
                                        <Group justify='space-between'>
                                            <Text fz={16} fw={'bolder'}>Total Price:</Text>
                                            <Text fz={16} tt={'capitalize'} fw={'bolder'}> <AppPrice price={policy.dealer_total_price} /></Text>
                                        </Group>
                                        <Divider mt={25} color='black' />
                                        <Text fw='bold' mb={6} mt={25}>Retail Price</Text>
                                        <Group justify='space-between'>
                                            <Text fz={14}>Subtotal (without tax):</Text>
                                            <Text fz={14} tt={'capitalize'}><AppPrice price={policy.subtotal_without_tax} /></Text>
                                        </Group>
                                        <Group justify='space-between'>
                                            <Text fz={14}>Total Tax:</Text>
                                            <Text fz={14} tt={'capitalize'}><AppPrice price={policy.total_tax} /></Text>
                                        </Group>
                                        <Group justify='space-between'>
                                            <Text fz={14}>Subtotal (with tax):</Text>
                                            <Text fz={14} tt={'capitalize'}><AppPrice price={policy.subtotal_with_tax} /></Text>
                                        </Group>
                                        <Group justify='space-between'>
                                            <Text fz={14}>Total Discount:</Text>
                                            <Text fz={14} tt={'capitalize'}><AppPrice price={policy.total_discount} /></Text>
                                        </Group>
                                        <Group justify='space-between'>
                                            <Text fz={16} fw={'bolder'}>Total Price:</Text>
                                            <Text fz={16} tt={'capitalize'} fw={'bolder'}> <AppPrice price={policy.total_price} /></Text>
                                        </Group>
                                    </Box>
                                </AppCard>
                                }

                                {policy.invoices && policy.invoices.length > 0 && <AppCard title='Price Details' options={{ bg: 'orange.1' }}>
                                    <Box style={{ position: 'relative' }} py='md'>
                                        <Text fw='bold' mb={6}>Dealer Price</Text>

                                        {policy.invoices[0].items.map((item: any) => {
                                            return <>
                                                <SimpleGrid cols={2} mb={10}>
                                                    <Text fz={14}>{item.description}:</Text>
                                                    <Stack justify='end'>
                                                        <Text fz={14} ta='end' tt={'capitalize'}>
                                                            <AppPrice price={item.total} />
                                                        </Text>
                                                    </Stack>

                                                </SimpleGrid>
                                                <SimpleGrid cols={3} mb={10}>
                                                    <Text fz={14} ta='right'></Text>
                                                    <Text fz={14} ta='right'>Tax:</Text>
                                                    <Stack justify='end'>
                                                        <Text fz={14} ta='end' tt={'capitalize'}>
                                                            <AppPrice price={item.tax_amount} />
                                                        </Text>
                                                    </Stack>
                                                </SimpleGrid>
                                                <SimpleGrid cols={3} mb={10}>
                                                    <Text fz={14} ta='right'></Text>
                                                    <Text fz={14} ta='right'>Total with Tax:</Text>
                                                    <Stack justify='end'>
                                                        <Text fz={14} ta='end' tt={'capitalize'}>
                                                            <AppPrice price={item.total_with_tax} />
                                                        </Text>
                                                    </Stack>
                                                </SimpleGrid>
                                            </>
                                        })}

                                        <Group justify='space-between'>
                                            <Text fz={16} fw={'bolder'}>Total Price:</Text>
                                            <Text fz={16} tt={'capitalize'} fw={'bolder'}> <AppPrice price={policy.invoices[0].total} /></Text>
                                        </Group>

                                        <Divider mt={25} color='black' />
                                        <Text fw='bold' mb={6} mt={25}>Retail Price</Text>

                                        {policy.invoices[1].items.map((item: any) => {
                                            return <>
                                                <SimpleGrid cols={2} mb={10}>
                                                    <Text fz={14}>{item.description}:</Text>
                                                    <Stack justify='end'>
                                                        <Text fz={14} ta='end' tt={'capitalize'}>
                                                            <AppPrice price={item.total} />
                                                        </Text>
                                                    </Stack>

                                                </SimpleGrid>
                                                <SimpleGrid cols={3} mb={10}>
                                                    <Text fz={14} ta='right'></Text>
                                                    <Text fz={14} ta='right'>Tax:</Text>
                                                    <Stack justify='end'>
                                                        <Text fz={14} ta='end' tt={'capitalize'}>
                                                            <AppPrice price={item.tax_amount} />
                                                        </Text>
                                                    </Stack>
                                                </SimpleGrid>
                                                <SimpleGrid cols={3} mb={10}>
                                                    <Text fz={14} ta='right'></Text>
                                                    <Text fz={14} ta='right'>Total with Tax:</Text>
                                                    <Stack justify='end'>
                                                        <Text fz={14} ta='end' tt={'capitalize'}>
                                                            <AppPrice price={item.total_with_tax} />
                                                        </Text>
                                                    </Stack>
                                                </SimpleGrid>
                                            </>
                                        })}

                                        <Group justify='space-between'>
                                            <Text fz={16} fw={'bolder'}>Total Price:</Text>
                                            <Text fz={16} tt={'capitalize'} fw={'bolder'}> <AppPrice price={policy.invoices[1].total} /></Text>
                                        </Group>
                                    </Box>
                                    {!warranty_price_change && <ButtonModal buttonOptions={{ children: 'Request Price Change' }} modalOptions={{ title: 'Request Price Change', size: 'xs' }}>
                                        <RequestPriceChangeForm policy={policy} />
                                    </ButtonModal>}
                                    {warranty_price_change && <AppCard title={'Warranty Price Overide'}>
                                        <Stack gap={2}>
                                            <Text tt={'capitalize'}>Amount: <AppPrice price={warranty_price_change.amount} /></Text>
                                            <Text>Status: {warranty_price_change.status_code}</Text>
                                            <Text>Remarks: {warranty_price_change.remarks}</Text>
                                            <HasPermission permission='approval.edit'>
                                                <Group justify='end'>
                                                    <DeleteButton onDelete={() => { onDeletePriceOverwrite(warranty_price_change.id) }} />
                                                </Group>
                                            </HasPermission>
                                        </Stack>
                                    </AppCard>}
                                </AppCard>}

                                <AppCard title='Customer Details' rightComponent={
                                    <HasPermission permission='policy.edit' author={policy.created_by}>
                                        <Group gap={'xs'}>
                                            <AuditLog modelName={'Customer'} modelId={policy.customer?.id} />
                                            <UpdateButtonModal title={'Edit Customer'} children={<CustomerForm customer={policy.customer} />} />
                                        </Group>
                                    </HasPermission>
                                }>
                                    <Stack gap='xs' p='sm'>
                                        <AppDataShow label={settings.ic_label ? settings.ic_label.value : 'KTP'} value={policy.customer?.ic} />
                                        <AppDataShow capitalize label='First Name' value={policy.customer?.first_name} />
                                        <AppDataShow capitalize label='Last Name' value={policy.customer?.last_name} />
                                        <AppDataShow capitalize label='Nationality' value={policy.customer?.nationality} />
                                        <AppDataShow label='Email' value={policy.customer?.email} />
                                        <AppDataShow label='Phone No' value={policy.customer?.phone_no} />


                                        {policy.customer.main_address && <>
                                            <Text mt={10}>Adddress:</Text>
                                            <div dangerouslySetInnerHTML={{ __html: policy.customer.address_full.replace(/\\n/g, "<br />") }} />
                                            {/* <AppDataShow label='Address' value={policy.customer.address_full} /> */}
                                        </>
                                        }
                                    </Stack>
                                </AppCard>
                                <AppCard title='User Credentials' rightComponent={
                                    <HasPermission permission='policy.edit' author={policy.created_by}>
                                        <Group gap={'xs'}>
                                            <AuditLog modelName={'User'} modelId={policy.user?.id} />
                                            <UpdateButtonModal title={'Edit User Credentials'} children={<UserForm user={policy.customer?.user} />} />
                                        </Group>
                                    </HasPermission>
                                }>
                                    <Stack gap='xs' p='sm'>
                                        <AppDataShow label='Email' value={policy.customer?.user?.email} />
                                        <AppDataShow label='Phone No' value={policy.customer?.user?.phone_no} />
                                        <AppDataShow label='Username' value={policy.customer?.user?.username} />

                                    </Stack>
                                </AppCard>
                                <AppCard title='Staff Details' rightComponent={
                                    <HasPermission permission='policy.edit' author={policy?.id}>
                                        <Group gap={'xs'}>
                                            <AuditLog modelName={'Policy'} modelId={policy.user.id} />
                                            <UpdateButtonModal title={'Edit Staff Details'} children={<StaffDetailsForm policy={policy} />} />
                                        </Group>
                                    </HasPermission>
                                }>
                                    <Stack gap='xs' p='sm'>
                                        <AppDataShow label='Salesman' value={policy.salesman} />
                                        <AppDataShow label='Dealer' value={policy.dealer_name} />
                                        <AppDataShow label='Marketing Officer' value={policy.mo_name} />
                                        <AppDataShow label='Technical In Charge' value={policy.technical_staff_name} />
                                        <AppDataShow label='Author' value={policy.user.name} />
                                    </Stack>
                                </AppCard>
                            </SimpleGrid>
                        </Tabs.Panel>

                        <Tabs.Panel value="discount" p='md'>
                            <DiscountList policy={policy} />
                        </Tabs.Panel>

                        <Tabs.Panel value="invoice" p='md'>
                            <InvoiceList policy={policy} />
                        </Tabs.Panel>

                        <Tabs.Panel value="payment" p='md'>
                            <PaymentList policy={policy} />
                        </Tabs.Panel>

                        <Tabs.Panel value="files" p='md'>
                            <FileList policy={policy} />
                        </Tabs.Panel>

                        <Tabs.Panel value="service" p='md'>
                            <ServiceList policy={policy} />
                        </Tabs.Panel>

                        <Tabs.Panel value="claim" p='md'>
                            <>
                                <ClaimList policy={policy} />
                            </>
                        </Tabs.Panel>

                    </Tabs>

                </Card.Section>
            </Card>
        </>
    )
}

View.layout = (page: any) => <AdminLayout children={page} title='View Policy' />;
