import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function AddButton({ label = 'Add New', link, onClick }: { label?: string, link?: any, onClick?: any }) {

    function buttonAdd(clicked?: any) {
        return <>
            <Button size='xs' leftSection={<IconPlus size={14} />} color='green' onClick={clicked ? clicked : null}>{label}</Button>
        </>
    }

    if (link) {
        return (
            <Link href={link}>
                {buttonAdd()}
            </Link>
        )
    } else {
        return (
            buttonAdd(onClick)
        )
    }
}
