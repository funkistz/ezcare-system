import { UnstyledButton, Group, Avatar, Text, rem, HoverCard, NavLink, Box } from '@mantine/core';
import { IconChevronRight, IconChevronDown } from '@tabler/icons-react';
import classes from './UserProfilePopup.module.css';
import { IconUser, IconLogout } from '@tabler/icons-react';
import { router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react';

export function UserProfilePopup({ user, iconOnly = false }: { user?: any, iconOnly?: boolean }) {

    const { auth }: any = usePage().props;

    user = user ? user : auth.user;

    const logout = () => {
        console.log('xx');
        router.post('/logout')
    }

    return (
        <HoverCard width={200} shadow="md" withArrow position='bottom'>
            <HoverCard.Target>
                <Box>
                    {!iconOnly && <UnstyledButton className={classes.user} >
                        <Group>
                            <Avatar size={45} radius="xl" color='gray.9' variant="filled">
                                {user.name[0]}
                            </Avatar>

                            <div style={{ flex: 1 }}>
                                <Text size="sm" fw={500}>
                                    {user.name}
                                </Text>

                                <Text size="xs">
                                    {user.email}
                                </Text>
                            </div>
                            <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </Group>
                    </UnstyledButton>
                    }
                    {!!iconOnly && <UnstyledButton>
                        <Group gap={5}>
                            <Avatar size={35} radius="xl" color='gray.9' variant="filled">
                                {user.name[0]}
                            </Avatar>
                            <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </Group>
                    </UnstyledButton>
                    }
                </Box>
            </HoverCard.Target>
            <HoverCard.Dropdown p={'xs'}>
                <NavLink label="Profile" leftSection={<IconUser size="1.2rem" stroke={2} />} />
                <NavLink label="Logout" leftSection={<IconLogout size="1.2rem" stroke={2} />} onClick={() => logout()} />
            </HoverCard.Dropdown>
        </HoverCard>
    );
}