import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Box, ScrollArea, Portal } from '@mantine/core';
import DeleteButton from './DeleteButton';

export default function AddButtonModal({ title, label, size = 'lg', children }: { title: string, label?: string, size?: string, children: any }) {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title={title} size={size} radius={'lg'} padding='md' closeOnClickOutside={false}>
                {React.cloneElement(children, { closeModal: close })}
            </Modal>
            <DeleteButton onClick={open} label={label} />
        </>
    )
}
