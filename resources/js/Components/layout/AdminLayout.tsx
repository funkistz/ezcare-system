import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { notifications } from '@mantine/notifications';
import { AppShell, Burger, Divider, Group, Skeleton, Title, Text, Box, Flex, Stack, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AppNavbar, AdminHeader } from '@/features/app-navigation';

export default function AdminLayout({ children, title, breadcrumbs = [] }: { children: any, title: string, breadcrumbs?: any }) {

    const [opened, setOpened] = useState(false);
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const { flash, status }: any = usePage().props;

    // console.log('status', status)

    useEffect(() => {


        if (flash && flash.message) {
            console.log('flash', flash);
            notifications.show({
                // title: 'Default notification',
                message: flash.message,
                color: ((flash.type == 'error') ? 'red' : 'green')
            })
        }

    }, [flash])

    return (
        <AppShell
            withBorder={false}
            // layout="alt"
            header={{ height: 70 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
            bg={'#f4f3f3'}
            mih={'100vh'}
        >
            <AppShell.Header bg={'#f4f3f3'}>
                <AdminHeader title={title} breadcrumbs={breadcrumbs} toggleMobile={toggleMobile} toggleDesktop={toggleDesktop} mobileOpened={mobileOpened} desktopOpened={desktopOpened} />
            </AppShell.Header>
            <AppShell.Navbar p={'md'} >
                <AppNavbar toggleMobile={toggleMobile} toggleDesktop={toggleDesktop} />
            </AppShell.Navbar>
            <AppShell.Main>
                <Box px={'md'} pt={10}>
                    <Title order={2} fw={'normal'} mb={'lg'}>{title}</Title>
                    {children}
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}

const style = {
    app: {
        backgroundColor: '#f8f9fa'
    }
};