import { usePage } from '@inertiajs/react';
import moment from 'moment-timezone'
import React from 'react'

export default function AppDate({ children, format = 'D/MM/YYYY', with_tz = true }: { children: any, format?: string, with_tz?: boolean }) {

    const { timezone }: any = usePage().props;

    return (
        with_tz ? moment(children).tz(timezone).format(format) : moment(children).format(format)
    )
}
