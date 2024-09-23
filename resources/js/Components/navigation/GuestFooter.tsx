import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandTiktok, IconBrandFacebook } from '@tabler/icons-react';
import classes from './GuestFooter.module.css';
import AppLogo from '../AppLogo';

const data = [
    {
        title: 'Link',
        links: [
            { label: 'Media', link: '/media' },
            { label: 'Contact Us', link: route('contact-us') },
        ],
    },
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
                <Text c="dimmed" size="sm">
                    © 2023 PT Ezcare Warranty Indonesia. All rights reserved.
                </Text>
                {/* <AppLogo /> */}
                <Group align='start'>
                    <div className={classes.groups}>{groups}</div>
                    <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                        <ActionIcon size="xl" color="gray" variant="subtle">
                            <IconBrandInstagram style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="xl" color="gray" variant="subtle">
                            <IconBrandFacebook style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="xl" color="gray" variant="subtle">
                            <IconBrandTiktok style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="xl" color="gray" variant="subtle">
                            <IconBrandYoutube style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Container>
        </footer>
    );
}