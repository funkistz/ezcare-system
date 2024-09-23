import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem, Anchor } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import classes from './LinksGroup.module.css';
import { usePage, Link, router } from '@inertiajs/react';

interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    link: string,
    links?: { label: string; link: string }[];
    active?: boolean;
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, link, links, active }: LinksGroupProps) {
    const hasLinks = Array.isArray(links);
    const currentPath = window.location.pathname.split("/").pop();

    const checkOpen = (links: any) => {
        let isOpen = false;
        links.map((link: any) => {
            const active = link.link ? (currentPath == link.link.split("/").pop()) : false;
            if (active) {
                isOpen = true;
            }
        })
        return isOpen;
    }
    const isOpen = !hasLinks ? false : checkOpen(links);
    const [opened, setOpened] = useState(initiallyOpened || isOpen);

    const visit = (url: any, type: any = 'internal') => {
        console.log(type);

        if (url) {
            if (type == 'internal') {
                router.get(url)
            } else {
                window.open(url, type)
            }
        }
    }

    const items = (hasLinks ? links : []).map((link) => {
        const active = link.link ? (currentPath == link.link.split("/").pop()) : false;

        return (
            <Group className={classes.linkWrapper} key={link.label}>
                <Anchor
                    href={link.link}
                    underline='never'
                    className={`${classes.link} ${active ? classes.active : null}`}
                    onClick={(event) => { event.preventDefault(); visit(link.link) }}
                >
                    {link.label}
                </Anchor>
            </Group >
        )
    });

    return (
        <>
            <Anchor href={hasLinks ? '#' : link} onClick={(event) => {
                event.preventDefault()
                if (hasLinks) {
                    setOpened((o) => !o)
                } else {
                    visit(link);
                }
            }} className={`${classes.control} ${active ? classes.active : null}`} underline='never'>
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }} ml={4}>
                        {/* <ThemeIcon variant="light" color='dark.6' radius="xl" size={30}> */}
                        <Icon style={{ width: rem(20), height: rem(20), }} stroke={1.7} />
                        {/* </ThemeIcon> */}
                        <Box ml={8}>{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? 'rotate(-90deg)' : 'none',
                            }}
                        />
                    )}
                </Group>
            </Anchor>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}