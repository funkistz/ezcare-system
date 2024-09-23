import { Head, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import Container from '@/Components/Container';
import { PageProps } from '@/types';
import ActionBar from '@/Components/Dashboard/ActionBar';
import DashboardStat from '@/Components/Dashboard/DashboardStat';
import { IconCar } from '@tabler/icons-react';
import { Box, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { Stat, StatRing } from '@/features/app-dashboard';
import { AppDropzone } from '@/features';
import { AppSelect } from '@/Components';

export default function Dashboard() {
    const {
        policy_count, policy_draft_count, policy_active_count,
        policy_deactivate_count, policy_void_count, policy_unpaid_count,
        policy_paid_count, policy_partial_count, policy_foc_count,
        policy_count_nett, policy_draft_count_nett, policy_active_count_nett,
        policy_deactivate_count_nett, policy_void_count_nett, policy_unpaid_count_nett,
        policy_paid_count_nett, policy_partial_count_nett, policy_foc_count_nett,
    } = usePage<PageProps>().props;


    return (
        <>
            {/* <ActionBar /> */}
            {/* <DashboardStat label='Total Vehicle' value='xsaxs' icon={<IconCar size={60} />} /> */}
            <Stack gap={10}>
                <Text fz={20} fw={500}>Policy Status</Text>
                <Flex gap='md'>
                    <StatRing data={{
                        progress: (Number(policy_draft_count) / Number(policy_count) * 100),
                        color: 'gray.7',
                        label: 'Draft',
                        stats: Number(policy_draft_count),
                        stats2: Number(policy_draft_count_nett),
                        icon: 'IconFileInvoice',
                        link: '/admin/policy?status=draft'
                    }}
                    />
                    <StatRing data={{
                        progress: (Number(policy_active_count) / Number(policy_count) * 100),
                        color: 'green',
                        label: 'Activated',
                        stats: Number(policy_active_count),
                        stats2: Number(policy_active_count_nett),
                        icon: 'IconFileCheck',
                        link: '/admin/policy?status=activated'
                    }}
                    />
                    <StatRing data={{
                        progress: (Number(policy_deactivate_count) / Number(policy_count) * 100),
                        color: 'orange',
                        label: 'Deactivated',
                        stats: Number(policy_deactivate_count),
                        stats2: Number(policy_deactivate_count_nett),
                        icon: 'IconFileAlert',
                        link: '/admin/policy?status=deactivated'
                    }}
                    />
                    <StatRing data={{
                        progress: (Number(policy_void_count) / Number(policy_count) * 100),
                        color: 'red',
                        label: 'Voided',
                        stats: Number(policy_void_count),
                        stats2: Number(policy_void_count_nett),
                        icon: 'IconFileX',
                        link: '/admin/policy?status=voided'
                    }}
                    />
                </Flex>
            </Stack>

            <Stack gap={10} mt='lg'>
                <Text fz={20} fw={500}>Payment Status</Text>
                <Flex gap='md'>
                    <StatRing data={{
                        progress: (Number(policy_unpaid_count) / Number(policy_active_count) * 100),
                        color: 'red',
                        label: 'Unpaid',
                        stats: Number(policy_unpaid_count),
                        stats2: Number(policy_unpaid_count_nett),
                        icon: 'IconReceiptOff',
                        link: '/admin/policy?payment_status=unpaid'
                    }}
                    />
                    <StatRing data={{
                        progress: (Number(policy_paid_count) / Number(policy_active_count) * 100),
                        color: 'green',
                        label: 'Paid',
                        stats: Number(policy_paid_count),
                        stats2: Number(policy_paid_count_nett),
                        icon: 'IconReceipt',
                        link: '/admin/policy?payment_status=paid'
                    }}
                    />
                    <StatRing data={{
                        progress: (Number(policy_partial_count) / Number(policy_active_count) * 100),
                        color: 'orange',
                        label: 'Partial',
                        stats: Number(policy_partial_count),
                        stats2: Number(policy_partial_count_nett),
                        icon: 'IconReceiptRefund',
                        link: '/admin/policy?payment_status=partial'
                    }}
                    />
                    <StatRing data={{
                        progress: (Number(policy_foc_count) / Number(policy_active_count) * 100),
                        color: 'pink',
                        label: 'Free of charge',
                        stats: Number(policy_foc_count),
                        stats2: Number(policy_foc_count_nett),
                        icon: 'IconReceiptOff',
                        link: '/admin/policy?payment_status=foc'
                    }}
                    />
                </Flex>
            </Stack>

            <Divider mt={40} mb={20} />
            <Stack gap={10} mt='lg'>
                <Text fz={20} fw={500}>Sales Report</Text>
                <Group mb={20}>
                    <AppSelect label='Payment Status:' my={0} data={[]} value={null} onChange={(e: any) => { }} />
                </Group>
                <Flex gap='md'>
                    <Stat data={{
                        color: 'red',
                        label: 'Paid Premium',
                        fz: 16,
                        stats: Number(policy_unpaid_count),
                        link: '/admin/policy?payment_status=unpaid',
                        items: [
                            {
                                label: 'Paid Case',
                                stats: Number(policy_unpaid_count),
                            },
                            {
                                label: 'Gross Paid',
                                stats: Number(policy_unpaid_count),
                            },
                            {
                                label: 'Nett Paid',
                                stats: Number(policy_unpaid_count),
                            }
                        ]
                    }}
                    />
                    <Stat data={{
                        color: 'red',
                        label: 'Activated Policy',
                        fz: 16,
                        stats: Number(policy_unpaid_count),
                        link: '/admin/policy?payment_status=unpaid',
                        items: [
                            {
                                label: 'Paid Case',
                                stats: Number(policy_unpaid_count),
                            },
                            {
                                label: 'Gross Paid',
                                stats: Number(policy_unpaid_count),
                            },
                            {
                                label: 'Nett Paid',
                                stats: Number(policy_unpaid_count),
                            }
                        ]
                    }}
                    />
                    {/* <Stat data={{
                        progress: (Number(policy_paid_count) / Number(policy_active_count) * 100),
                        color: 'green',
                        label: 'Activated Policy',
                        stats: Number(policy_paid_count),
                        stats2: Number(policy_paid_count_nett),
                        icon: 'IconReceipt',
                        link: '/admin/policy?payment_status=paid'
                    }}
                    />
                    <Stat data={{
                        color: 'orange',
                        label: 'Policy Activated & Paid In The Same Month',
                        stats: Number(policy_partial_count),
                        stats2: Number(policy_partial_count_nett),
                        icon: 'IconReceiptRefund',
                        link: '/admin/policy?payment_status=partial'
                    }}
                    />
                    <Stat data={{
                        progress: (Number(policy_foc_count) / Number(policy_active_count) * 100),
                        color: 'pink',
                        label: 'Free of charge',
                        stats: Number(policy_foc_count),
                        stats2: Number(policy_foc_count_nett),
                        icon: 'IconReceiptOff',
                        link: '/admin/policy?payment_status=foc'
                    }}
                    /> */}
                </Flex>
            </Stack>

        </>
    );
}

Dashboard.layout = (page: any) => <AdminLayout children={page} title='Dashboard' />;
