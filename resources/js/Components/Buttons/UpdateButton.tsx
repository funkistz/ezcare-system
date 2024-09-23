import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

export default function UpdateButton({ link, onClick, label, options }: { link?: any, onClick?: any, label?: String, options?: any }) {

    function buttonAdd(clicked?: any) {
        return <>
            <Button size='xs' leftSection={<IconEdit size={14} />} color='blue' onClick={clicked ? clicked : null} {...options}>{label ? label : 'Edit'}</Button>
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
