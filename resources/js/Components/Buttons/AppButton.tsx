import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function AddButton(options: any) {

    return (
        <>
            <Button
                size={'xs'}
                {...options}
                leftSection={options.icon ? <options.icon size={16} /> : null}
            />
        </>
    );

}
