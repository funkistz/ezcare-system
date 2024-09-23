import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button, Modal, Group } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export default function DeleteButton(options: any) {

    const [opened, setOpened] = useState(false)

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Are sure want to delete?" centered>
                <Group justify='flex-end'>
                    <Button variant="default" onClick={() => setOpened(false)}>Cancel</Button>
                    <Button color="red" onClick={() => { options.onDelete(); setOpened(false); }} >Delete</Button>
                </Group>
            </Modal>
            <Button size='xs' leftSection={<IconTrash size={14} />} color='red' onClick={() => setOpened(true)}  {...(({ onDelete, ...o }) => o)(options)}>{options.label ? options.label : 'Delete'}</Button>
        </>
    )
}
