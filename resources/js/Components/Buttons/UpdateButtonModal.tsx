import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Box } from '@mantine/core';
import AddButton from './AddButton';
import UpdateButton from './UpdateButton';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export default function UpdateButtonModal({ title, label, size = 'lg', children, options = {} }: { title: string, label?: string, size?: string, children: any, options?: any }) {

    const [opened, { open, close }] = useDisclosure(false);
    const { height, width } = useWindowDimensions();

    return (
        <>
            <Modal opened={opened} onClose={close} title={title} size={size} radius={'lg'} padding='md' closeOnClickOutside={false} mah={height}  >
                <Box mah={height - 200} style={{ overflow: 'scroll' }}>
                    {React.cloneElement(children, { closeModal: close })}
                </Box>
            </Modal>
            <UpdateButton label={label} onClick={open} options={options} />
        </>
    )
}
