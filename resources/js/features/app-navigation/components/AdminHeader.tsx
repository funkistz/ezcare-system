import { Autocomplete, Group, Burger, rem, Text, Title, Stack, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from './AdminHeader.module.css';
import AppBreadCrumb from '@/Components/navigation/AppBreadCrumb';
import AppLogo from '@/Components/AppLogo';
import { UserProfilePopup } from './UserProfilePopup';
import { AppNotificationIcon } from '@/features/app-notification';

const links = [
    { link: '/about', label: 'Features' },
    { link: '/pricing', label: 'Pricing' },
    { link: '/learn', label: 'Learn' },
    { link: '/community', label: 'Community' },
];

export default function AdminHeader({ toggleMobile, toggleDesktop, mobileOpened, desktopOpened, title, breadcrumbs }: any) {
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                {/* {(!mobileOpened) && <Box hiddenFrom="sm" bg={'primary.6'} p={'7px 10px 8px 5px'} style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }} mt={-10}>
                    <Burger onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                </Box>}
                {(!desktopOpened) && <Box visibleFrom="sm" bg={'primary.6'} p={'7px 10px 8px 5px'} style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }} mt={-10}>
                    <Burger onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                </Box>} */}
                <Stack gap={0}>
                    <Group h="100%" p={'md'} pb={'xs'}>
                        <Burger onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger onClick={toggleDesktop} visibleFrom="sm" size="sm" />

                        <AppLogo />
                    </Group>
                    <Box ml={17}>
                        <AppBreadCrumb items={breadcrumbs} />
                    </Box>
                </Stack>

                <Group style={{ flexGrow: 1 }} p={'md'}>

                </Group>

                <Group gap={'xs'}>
                    <Autocomplete
                        // className={classes.search}
                        placeholder="Search here..."
                        leftSection={<IconSearch style={{ width: rem(20), height: rem(20), color: 'black' }} stroke={2} />}
                        data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                        visibleFrom="sm"
                        radius={'xl'}
                        variant="filled"
                        color='gray'
                        size='sm'
                        mt={10}
                    />
                    <Group mt={10} ml={10} visibleFrom="sm">
                        <AppNotificationIcon />
                        <UserProfilePopup iconOnly />
                    </Group>
                </Group>
            </div>
        </header>
    );
}