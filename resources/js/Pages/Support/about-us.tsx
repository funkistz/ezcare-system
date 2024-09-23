import { Head, usePage, router, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { IconBrandGithub } from '@tabler/icons-react';
import Header from '@/Components/Header';
import { VehicleList } from '@/features/vehicle-list';
import BannerCarousell from '@/Components/Generals/BannerCarousell';
import { PageProps } from '@/types';
import {
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
    Paper
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import Guestlayout from '@/Components/layout/GuestLayout';

export default function aboutUs() {


    return (
        <>

        </>
    );
}

aboutUs.layout = (page: any) => <Guestlayout children={page} />;
