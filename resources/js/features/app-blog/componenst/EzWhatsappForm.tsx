import { IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, Box, Button, Modal, Text, Textarea } from '@mantine/core'
import { usePage } from '@inertiajs/react';

export default function EzWhatsappForm({ iconOnly }: any) {
    const [opened, { open, close }] = useDisclosure(false);
    const { settings }: any = usePage().props;

    const numbers = settings.m_whatsapp_numbers.value

    const [message, setmessage] = useState('Hai Ezcare Warranty, \nSaya ingin mengetahui informasi lebih lanjut tentang paket garansi anda. \n\nBerikut informasi STNK kendaraan saya.')

    const sendWhatsapp = () => {

        close();
        const ws = [6281110020356];

        const random = Math.floor(Math.random() * ws.length);

        const link = 'https://api.whatsapp.com/send?phone=' + ws[random] + '&text=' + message;

        window.open(link, '_system', 'location=yes');

    }


    return (
        <>
            <Modal.Root opened={opened} onClose={close} size='lg' bg='green'>
                <Modal.Overlay />
                <Modal.Content radius='lg' bg='green.0'>
                    <Modal.Header bg='green.0' style={{ borderRadius: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15 }} >
                        <Modal.Title>
                            <Text fw={700} fz={20} >WhatsApp To Us Directly Here</Text>
                        </Modal.Title>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body p={'md'}>
                        <Textarea
                            rows={10}
                            size="md"
                            radius="lg"
                            withAsterisk
                            placeholder="Input placeholder"
                            value={message}
                            onChange={(e: any) => setmessage(e.target.value)}
                        />
                        <Button fullWidth size='lg' radius='lg' bg='green' mt={20} rightSection={<IconArrowRight />} onClick={sendWhatsapp}>Send via WhatsApp</Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
            {!iconOnly && <Button leftSection={<IconBrandWhatsapp size={18} />} radius={'md'} color='green' onClick={open}>WhatsApp</Button>}
            {iconOnly && <ActionIcon variant="filled" size={60} radius="xl" aria-label="Settings" color='#25d366' onClick={open}>
                <IconBrandWhatsapp style={{ width: '60%', height: '60%' }} stroke={1.5} />
            </ActionIcon>}
        </>
    )
}
