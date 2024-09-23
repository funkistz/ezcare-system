
import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Anchor,
    Group,
    rem,
    Flex,
} from '@mantine/core';
import {
    IconCreditCard,
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund,
    IconReceipt,
    IconReceiptTax,
    IconReport,
    IconCashBanknote,
    IconCoin,
    IconCar,
    IconBookmark,
    IconUserPlus,
} from '@tabler/icons-react';
import { router } from '@inertiajs/react';

const mockdata = [
    // { title: 'Add Vehicle', icon: IconCar, color: 'violet', link: route('vehicle.create') },
    // { title: 'Add Booking', icon: IconBookmark, color: 'indigo', link: route('booking.create') },
    // { title: 'Add Customer', icon: IconUserPlus, color: 'blue', link: route('customer.create') },
    // { title: 'Refunds', icon: IconReceiptRefund, color: 'green', link: '/dashboard' },
    // { title: 'Receipts', icon: IconReceipt, color: 'teal', link: '/dashboard' },
    // { title: 'Taxes', icon: IconReceiptTax, color: 'cyan', link: '/dashboard' },
    // { title: 'Reports', icon: IconReport, color: 'pink' },
    // { title: 'Payments', icon: IconCoin, color: 'red' },
    // { title: 'Cashback', icon: IconCashBanknote, color: 'orange' },
];


function ActionBar() {

    const navigatePage = (url: any) => {
        router.visit(url);
    }

    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} onClick={() => navigatePage(item.link)}>
            {/* <item.icon color={theme.colors[item.color][6]} size="2rem" /> */}
            <Text size="xs" mt={7}>
                {item.title}
            </Text>
        </UnstyledButton>
    ));


    return (<>
        <Card withBorder radius="md" style={classes.card}>
            <Group justify="space-between">
                {/* <Text className={classes.title}>Quick Action</Text> */}
                <Anchor size="xs" color="dimmed">
                    {/* + 21 other services */}
                </Anchor>
            </Group>
            <Flex mt="md">
                {items}
            </Flex>
        </Card>
    </>);
}

export default ActionBar;

const classes = {
    card: {
        // backgroundColor: 'white',
        // boxShadow: theme.shadows.xs,
    },

    title: {
        fontWeight: 700,
    },

    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        height: rem(90),
        transition: 'box-shadow 150ms ease, transform 100ms ease',
        // boxShadow: theme.shadows.xs,
        width: 150,
        marginRight: 15,
        border: '1px solid #ddd',
    },
};