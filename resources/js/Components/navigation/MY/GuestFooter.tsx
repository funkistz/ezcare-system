import { Text, Container, ActionIcon, Group, rem, Menu, Stack } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandTiktok, IconBrandFacebook } from '@tabler/icons-react';
import classes from '../GuestFooter.module.css';
import AppLogo from '../../AppLogo';

const data = [
    {
        title: 'Link',
        links: [
            { label: 'Media', link: '/media' },
            { label: 'Careers', link: '/career' },
            { label: 'Contact Us', link: route('contact-us') },
            { label: 'ECW Mobile Service', link: '/ecw-mobile-services' },
            { label: 'Privacy Policy', link: '/privacy' },
        ],
    },
    // {
    //     title: 'Project',
    //     links: [
    //         { label: 'Contribute', link: '#' },
    //         { label: 'Media assets', link: '#' },
    //         { label: 'Changelog', link: '#' },
    //         { label: 'Releases', link: '#' },
    //     ],
    // },
    // {
    //     title: 'Community',
    //     links: [
    //         { label: 'Join Discord', link: '#' },
    //         { label: 'Follow on Twitter', link: '#' },
    //         { label: 'Email newsletter', link: '#' },
    //         { label: 'GitHub discussions', link: '#' },
    //     ],
    // },
];

const openNewTab = (link: any) => {
    window.open(
        link,
        '_blank' // <- This is what makes it open in a new window.
    );
}

export function GuestFooter() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'>
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
            // onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            {/* <Container className={classes.inner} size={'xl'}>
                <div className={classes.logo}>
                    <AppLogo />
                    <Text size="xs" c="dimmed" className={classes.description}>
                        Malaysia's No 1 Aftermarket Vehicle Extended Warranty Provider<br />
                        "𝐖𝐄 𝐂𝐀𝐑𝐄 & 𝐖𝐄 𝐏𝐑𝐎𝐓𝐄𝐂𝐓"<br />
                        1A & 3A, JALAN 8/1, SEKSYEN 8, Bangi, Malaysia 43650
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container> */}
            <Container className={classes.afterFooter} size={'xl'}>
                <Group align='start' justify='space-between' w='100%'>
                    <Text c="dimmed" size="sm">
                        © 2024 Ezcare Warranty. All rights reserved.
                    </Text>
                    {/* <AppLogo /> */}
                    <Group align='start'>
                        <div className={classes.groups}>{groups}</div>
                        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                            {/* <Menu>
                            <Menu.Item>Media</Menu.Item>
                        </Menu> */}
                            <ActionIcon size="xl" color="gray" variant="subtle" onClick={() => openNewTab('https://www.instagram.com/ezcare_warranty')}>
                                <IconBrandInstagram style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon size="xl" color="gray" variant="subtle" onClick={() => openNewTab('https://www.facebook.com/ezcarewarrantyofficial/')}>
                                <IconBrandFacebook style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon size="xl" color="gray" variant="subtle" onClick={() => openNewTab('https://www.tiktok.com/@ezcarewarranty')}>
                                <IconBrandTiktok style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon size="xl" color="gray" variant="subtle" onClick={() => openNewTab('https://www.youtube.com/@ezcaretv')}>
                                <IconBrandYoutube style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Group>
            </Container>
        </footer>
    );
}