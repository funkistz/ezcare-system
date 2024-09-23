import { RingProgress, Text, SimpleGrid, Paper, Center, Group, rem, Stack } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight, IconFile, IconFileCertificate, IconFileInvoice, IconReceipt, IconReceiptOff, IconReceiptRefund, IconCheck, IconFileCheck, IconFileAlert, IconFileX } from '@tabler/icons-react';
import { router } from '@inertiajs/react';
import { usePage, useForm } from '@inertiajs/react';
import { AppPriceShow } from '@/Components';

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

export default function StatRing({ data }: { data: any }) {

    const Icon: any = icons[data.icon];
    const { settings }: any = usePage().props;

    console.log('settings', settings)

    return (
        <Paper radius="lg" p="xs" key={data.label} w={250} shadow='sm' onClick={() => goToPolicy(data.link)} style={{ cursor: 'pointer' }}>
            <Group>
                {!!data.progress && <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[{ value: data.progress, color: data.color }]}
                    label={
                        <Center>
                            <Icon size={25} stroke={1.5} />
                        </Center>
                    }
                />}

                <div>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                        {data.label}
                    </Text>
                    <Stack gap={0}>
                        <Text fw={700} fz={25}>
                            {data.stats}
                        </Text>
                    </Stack>

                </div>
            </Group>
            <Text fw={700} fz={20} style={{ lineHeight: 1 }} m={10}>
                {settings.currency_symbol.value} <AppPriceShow price={data.stats2} />
            </Text>
        </Paper>
    );
}