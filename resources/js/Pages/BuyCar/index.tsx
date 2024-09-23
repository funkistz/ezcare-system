import { Head, usePage, router, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { IconBrandGithub } from '@tabler/icons-react';
import Header from '@/Components/Header';
import { VehicleList } from '@/features/vehicle-list';
import BannerCarousell from '@/Components/Generals/BannerCarousell';
import { PageProps } from '@/types';
import { Container } from '@mantine/core';
import { default as AppContainer } from '@/Components/Container';
import Guestlayout from '@/Components/layout/GuestLayout';

export default function Home() {

    // const { banners }: any = usePage<PageProps>().props;

    return (
        <>

            <Container size='xl' mt={10} style={{ position: 'relative' }}>
                <VehicleList />
            </Container>
        </>
    );
}

Home.layout = (page: any) => <Guestlayout children={page} />;
