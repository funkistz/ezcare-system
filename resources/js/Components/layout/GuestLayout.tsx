import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Paper, Text, Container, AppShell, Group } from '@mantine/core';
import { Head, usePage } from '@inertiajs/react';
import classes from './GuestLayout.module.css';
import { GuestNavbar } from '../navigation/GuestNavbar';
import { GuestNavbar as GuestNavbarMy } from '../navigation/MY/GuestNavbar';

import { useHeadroom } from '@mantine/hooks';
import { GuestFooter } from '../navigation/GuestFooter';
import { GuestFooter as GuestFooterMy } from '../navigation/MY/GuestFooter';

import { WAFloatingButton } from '@/features/app-blog';
import { notifications } from '@mantine/notifications';

export default function Guestlayout({ title = null, children }: any) {

    const pinned = useHeadroom({ fixedAt: 120 });

    const { flash, country }: any = usePage().props;

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
        <>
            <AppShell
                header={{ height: 70, collapsed: !pinned, offset: false }}
                footer={{ height: 50, collapsed: false }}
                // p='lg'
                // navbarOffsetBreakpoint="sm"
                // asideOffsetBreakpoint="sm"
                // navbar={
                //     <AppSideBar></AppSideBar>
                // }
                styles={{
                    main: {
                        paddingTop: 'calc(var(--mantine-header-height, 0px))',
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                }}
                className={classes.app}
            >
                {/* <Head title={title} /> */}
                <AppShell.Header >
                    {country == 'id' && <GuestNavbar></GuestNavbar>}
                    {country == 'my' && <GuestNavbarMy></GuestNavbarMy>}
                </AppShell.Header>
                <AppShell.Main mt={70}>
                    <Container fluid px={0}>
                        {children}
                        <WAFloatingButton />
                    </Container>
                    {country == 'id' && <GuestFooter></GuestFooter>}
                    {country == 'my' && <GuestFooterMy></GuestFooterMy>}

                </AppShell.Main>
                {/* <AppShell.Footer p="md">
                </AppShell.Footer> */}
            </AppShell>
        </>
    );
}