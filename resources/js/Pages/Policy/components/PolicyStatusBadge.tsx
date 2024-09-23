import { Badge } from '@mantine/core'
import React from 'react'

export default function PolicyStatusBadge({ status, size = 'sm' }: { status: any, size?: any }) {

    let color = 'blue';

    if (status == 'draft') {
        color = 'gray';
    } else if (status == 'activated') {
        color = 'green';
    } else if (status == 'deactivated') {
        color = 'orange';
    } else if (status == 'void') {
        color = 'red';
    } else if (status == 'unpaid') {
        color = 'orange';
    } else if (status == 'paid') {
        color = 'green';
    } else if (status == 'partial') {
        color = 'yellow';
    } else if (status == 'foc') {
        color = 'pink.4';
    }

    return (
        <>
            {status && <Badge size={size} color={color}>{status}</Badge>}
            {!status && <Badge size={size} color='gray.5'>N/A</Badge>}
        </>
    )
}
