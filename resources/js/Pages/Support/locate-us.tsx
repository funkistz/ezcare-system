import { Head, usePage, router, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { IconBrandGithub } from '@tabler/icons-react';
import Header from '@/Components/Header';
import Guestlayout from '@/Components/layout/GuestLayout';
import { VehicleList } from '@/features/vehicle-list';
import BannerCarousell from '@/Components/Generals/BannerCarousell';
import { PageProps } from '@/types';
import { Container, Title, Paper, Text } from '@mantine/core';

export default function locateUs() {

    // const { banners }: any = usePage<PageProps>().props;

    return (
        <>

            <Container size='xl' mt={10} style={{ position: 'relative' }}>

            </Container>
        </>
    );
}

locateUs.layout = (page: any) => <Guestlayout children={page} />;
