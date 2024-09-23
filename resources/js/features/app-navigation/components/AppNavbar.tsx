import React from 'react'
import { AppShell, Burger, Divider, Group, Avatar, Title, Text, Box, Flex, Stack, ScrollArea } from '@mantine/core';
import AppLogo from '@/Components/AppLogo';
import { LinksGroup } from './LinksGroup';
import { adminLinks } from '../values/AdminLinks';
import { usePage } from '@inertiajs/react';
import { UserProfilePopup } from './UserProfilePopup';

export default function AppNavbar({ toggleMobile, toggleDesktop }: { toggleMobile: any, toggleDesktop: any }) {

  const { auth, permissions }: any = usePage().props;

  console.log('permissions: ', permissions)

  return (
    <>
      <Stack h={'100%'}>
        <ScrollArea>
          <Stack>
            <UserProfilePopup user={auth.user} />
            <Divider color='gray.4' />
          </Stack>
          <Stack gap={0}>
            {/* <Flex justify={'space-between'}>
            <Box mb={20} p={10} mt={10}>
              <AppLogo />
            </Box>
            <Burger onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          </Flex> */}

            <Text mb={8} ml={16} mt={10} fz={14}>Menu</Text>
            <Stack gap={3}>
              {adminLinks.map((links: any, index: any) => {
                if (links.permission == '' || permissions.includes(links.permission)) {
                  const active = links.link ? (window.location.pathname.split("/").pop() == links.link.split("/").pop()) : false;
                  return <LinksGroup key={index} {...links} active={active} />
                }
              })}
            </Stack>
          </Stack>
        </ScrollArea>
      </Stack>
    </>
  )
}
