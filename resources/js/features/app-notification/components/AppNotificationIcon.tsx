import { UnstyledButton, Group, Avatar, Text, rem, HoverCard, NavLink, Box } from '@mantine/core';
import { IconChevronRight, IconChevronDown } from '@tabler/icons-react';
import classes from './UserProfilePopup.module.css';
import { IconUser, IconLogout } from '@tabler/icons-react';
import { router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react';
import { ThemeIcon } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

export default function AppNotificationIcon() {
    return (
        <Group gap={5}>
            <ThemeIcon radius="xl" size={35} color='gray.9' variant="light">
                <IconBell stroke={1.5} size={20} />
            </ThemeIcon>
        </Group>
    )
}
