import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button, Modal, Group } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export default function ConfirmButton(options: any) {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} title={options.title ? options.title : "Confirm Proceed?"} centered>
                <Group justify='flex-end'>
                    <Button variant="default" onClick={() => setOpened(false)}>Cancel</Button>
                    <Button color="green" onClick={() => { options.onConfirm(); setOpened(false); }} >Confirm</Button>
                </Group>
            </Modal>
            <Button size='xs' color='green' onClick={() => setOpened(true)} {...(({ onConfirm, ...o }) => o)(options)}>{options.label ? options.label : 'Confirm'}</Button>
        </>
    )
}
