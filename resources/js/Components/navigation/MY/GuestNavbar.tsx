import { Menu, Group, Center, Burger, Container, Button, Drawer, Stack, Select, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconLanguage, IconWorld } from '@tabler/icons-react';
import classes from '../GuestNavbar.module.css';
import AppLogo from '../../AppLogo';
import { IconPhone, IconBrandWhatsapp } from '@tabler/icons-react';
import { router, usePage } from '@inertiajs/react';
import { EzWhatsappForm } from '@/features/app-blog';
import { useLaravelReactI18n } from "laravel-react-i18n";
import axios from 'axios';
import { useState } from 'react';
import EzWhatsappFormMy from '@/features/app-blog/componenst/EzWhatsappFormMy';

const links: any = [
    { link: '/', label: 'Home' },
    { link: '/about-us', label: 'About Us' },
    { link: '/our-products', label: 'Our Products' },
    // { link: '/why-us', label: 'Why Ezcare Warranty' },
    // { link: '/ecw-mobile-services', label: 'ECW Mobile Service' },
    { link: '/group-of-companies', label: 'Group of Companies' },
    { link: '/career', label: 'Careers' },
];
const data = [
    { value: 'id', label: 'Indonesian' },
    { value: 'en', label: 'English' },
    { value: 'my', label: 'Malaysia' },
];

const countries = [
    { value: 'id', label: '🇮🇩 Indonesia' },
    // { value: 'my', label: '🇲🇾 MY' },
];

const goToPage = (route: any) => {
    console.log('goToPage');
    router.get(route);
}

export function GuestNavbar() {
    const [opened, { toggle, close, open }] = useDisclosure(false);
    const { currentLocale, setLocale } = useLaravelReactI18n();
    const { settings, country }: any = usePage().props;
    const [languages, setLanguages] = useState(settings.languages ? settings.languages.value.split(',') : ['en'])

    const availabel_languages = data.filter((l) => languages.includes(l.value));

    console.log('availabel_languages', availabel_languages);

    const items = links.map((link: any) => {
        const menuItems = link.links?.map((item: any) => (
            <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <a
                            // href={link.link}
                            className={classes.link}
                            onClick={(event) => { goToPage('link.link') }}
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                <IconChevronDown size="0.9rem" stroke={1.5} />
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <a
                key={link.label}
                href={link.link}
                className={classes.link}
                onClick={(event) => { event.preventDefault(); goToPage(link.link) }}
            >
                {link.label}
            </a>
        );
    });

    const language: string = currentLocale();

    const setLanguage = (e: any) => {
        // console.log('e', e);
        setLocale(e);

        axios.get(route('setLanguage'), {
            params: {
                'locale': e
            }
        }).then((response) => {
            // setBrands(response.data.data);
        });
    }

    const setCountry = (e: any) => {

        if (e == 'id') {
            window.location.href = "https://id.ezcare-warranty.com/";
        } else if (e == 'my') {
            window.location.href = "https://my.ezcare-warranty.com/";
        }
    }

    return (
        <header className={classes.header} style={{ borderBottom: 0 }}>
            <Container size="xl">
                <div className={classes.inner}>
                    <AppLogo />
                    <Group gap={5} visibleFrom="sm">
                        {items}
                        <Button leftSection={<IconPhone size={18} />} radius={'xl'} color='primary.9' mr={10} onClick={() => goToPage(route('contact-us'))}>Contact Us</Button>
                        <EzWhatsappFormMy />
                        <Group gap={0}>
                            {/* <Select
                                ml={10}
                                radius='md'
                                w={140}
                                size="sm"
                                placeholder="Language"
                                data={availabel_languages}
                                value={language}
                                onChange={(e: any) => setLanguage(e)}
                                leftSection={<IconLanguage />}
                            /> */}
                            <Select
                                ml={10}
                                radius='md'
                                w={130}
                                fz={30}
                                size="sm"
                                placeholder="Country"
                                data={countries}
                                value={language}
                                onChange={(e: any) => setCountry(e)}
                            />
                        </Group>
                    </Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                </div>
            </Container>
            <Drawer
                opened={opened}
                onClose={close}
                onClick={close}
                title="Menu"
                position='top'
                overlayProps={{ backgroundOpacity: 0.5, blur: 0 }}
            >
                <Stack>
                    {items}
                    <Button leftSection={<IconPhone size={18} />} radius={'xl'} color='primary.9' mr={10} onClick={() => goToPage(route('contact-us'))}>Contact Us</Button>
                    <Text>Language:</Text>
                    <Group gap={10} grow>
                        <Button variant='outline' color='black' onClick={() => setLanguage('id')}>🇮🇩 Indonesia</Button>
                        <Button variant='outline' color='black' onClick={() => setLanguage('en')}>🇺🇸 English</Button>
                        {/* <Select
                            radius='lg'
                            w={120}
                            size="sm"
                            placeholder="Language"
                            data={data}
                            value={language}
                            onChange={(e: any) => setLanguage(e)}
                        /> */}
                    </Group>
                </Stack>
            </Drawer>
        </header>
    );
}