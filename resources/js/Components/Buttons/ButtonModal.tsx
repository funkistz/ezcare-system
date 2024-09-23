import React, { useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Box, ScrollArea, Portal } from '@mantine/core';
import AddButton from './AddButton';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export default function ButtonModal({ buttonOptions, modalOptions, children, closeModal }: { buttonOptions?: any, modalOptions?: any, children: any, closeModal?: boolean }) {

    const [opened, { open, close }] = useDisclosure(false);
    const { height, width } = useWindowDimensions();

    useEffect(() => {

        if (!closeModal) {
            close();
        }

    }, [closeModal])


    return (
        <>
            <Modal opened={opened} onClose={close} {...modalOptions} radius={'lg'} padding='md' closeOnClickOutside={false} mah={height} >
                <Box mah={height - 200} style={{ overflow: 'scroll' }}>
                    {React.cloneElement(children, { closeModal: close })}
                </Box>
            </Modal>
            <Button size='xs' onClick={open} {...buttonOptions} />
        </>
    )
}
