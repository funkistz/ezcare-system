import { Head, usePage, router, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { IconBrandGithub } from '@tabler/icons-react';
import Header from '@/Components/Header';
import { VehicleList } from '@/features/vehicle-list';
import BannerCarousell from '@/Components/Generals/BannerCarousell';
import { PageProps } from '@/types';
import {
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    ActionIcon,
    rem,
    Paper,
    Container
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { ContactIconsList } from '@/Components/Generals/ContactListIcons';
import Guestlayout from '@/Components/layout/GuestLayout';

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export default function contactUs() {


    return (
        <>


        </>
    );
}

contactUs.layout = (page: any) => <Guestlayout children={page} />;
