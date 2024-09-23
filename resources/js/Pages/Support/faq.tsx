import { Head, usePage, router, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { IconBrandGithub } from '@tabler/icons-react';
import Header from '@/Components/Header';
import { VehicleList } from '@/features/vehicle-list';
import BannerCarousell from '@/Components/Generals/BannerCarousell';
import { PageProps } from '@/types';
import { Image, Accordion, Grid, Container, Title, Paper } from '@mantine/core';
import Guestlayout from '@/Components/layout/GuestLayout';


const placeholder =
    'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

export default function faq() {



    return (
        <>


        </>
    );
}

faq.layout = (page: any) => <Guestlayout children={page} />;
