import React from 'react'
import { ActionIcon, Affix, Button, Stack } from '@mantine/core';
import { IconBrandWhatsapp, IconPhone, IconPhoneCall } from '@tabler/icons-react';
import EzWhatsappForm from './EzWhatsappForm';
import { router, usePage } from '@inertiajs/react';
import EzWhatsappFormMy from './EzWhatsappFormMy';

export default function WAFloatingButton() {
  const { country }: any = usePage().props;

  const goToPage = (route: any) => {
    console.log('goToPage');
    router.get(route);
  }

  return (
    <Affix position={{ bottom: 20, right: 20 }} display={{ base: 'block', sm: 'block', lg: 'none' }}>
      <Stack gap={5}>
        {country == 'my' ?  <EzWhatsappFormMy iconOnly />  :  <EzWhatsappForm iconOnly />}
        {/* <EzWhatsappForm iconOnly /> */}
        {/* <ActionIcon variant="filled" size={60} radius="xl" aria-label="Settings" color='blue' onClick={() => goToPage(route('contact-us'))}>
          <IconPhone style={{ width: '60%', height: '60%' }} stroke={1.5} />
        </ActionIcon> */}
      </Stack>
         
    </Affix>
  )
}
