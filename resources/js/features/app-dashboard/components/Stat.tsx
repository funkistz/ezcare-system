import { RingProgress, Text, SimpleGrid, Paper, Center, Group, rem, Stack, Box } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight, IconFile, IconFileCertificate, IconFileInvoice, IconReceipt, IconReceiptOff, IconReceiptRefund, IconCheck, IconFileCheck, IconFileAlert, IconFileX, IconMoneybag, IconCurrency, IconZoomMoney, IconReportMoney, IconCoin } from '@tabler/icons-react';
import { router } from '@inertiajs/react';

const icons: any = {
    IconFileInvoice: IconFileInvoice,
    IconReceipt: IconReceipt,
    IconReceiptOff: IconReceiptOff,
    IconReceiptRefund: IconReceiptRefund,
    IconFileCheck: IconFileCheck,
    IconFileAlert: IconFileAlert,
    IconFileX: IconFileX,
};

const data = [
    { label: 'Page views', stats: '456,578', progress: 65, color: 'teal', icon: 'up' },
    { label: 'New users', stats: '2,550', progress: 72, color: 'blue', icon: 'up' },
    {
        label: 'Orders',
        stats: '4,735',
        progress: 52,
        color: 'red',
        icon: 'down',
    },
] as const;

const goToPolicy = (url: any) => {
    router.visit(url);
}

export default function Stat({ data }: { data: any }) {

    console.log('data', data)

    return (
        <Paper radius="lg" p="md" key={data.label} w={400} shadow='sm' onClick={() => goToPolicy(data.link)} style={{ cursor: 'pointer' }}>
            <Group>
                <div>
                    <Group >
                        {/* <IconCoin size={30} stroke={1.5} /> */}
                        <Text c="gray.7" fz={data.fz ?? 13} tt="uppercase" fw={700} maw={170} style={{ lineHeight: 1.3 }}>
                            {data.label}
                        </Text>
                    </Group>

                    <Stack gap={0} mt={20}>

                    </Stack>
                </div>
            </Group>
            <Stack>
                {data.items && data.items.map((item: any) => {
                    return <StatBox item={item} />
                })}
            </Stack>
        </Paper>
    );
}

export function StatBox({ item }: any): any {
    return (<Paper p='sm' shadow='none' withBorder radius={10}>
        <Stack>
            <Text fz={20} style={{ lineHeight: 1 }}>
                {item.label}
            </Text>
            <Text fw={700} fz={20} style={{ lineHeight: 1 }}>
                {item.stats}
            </Text>
        </Stack>

    </Paper>);
}