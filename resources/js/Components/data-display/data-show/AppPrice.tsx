import { usePage } from '@inertiajs/react';
import React from 'react'

export default function AppPrice({ price }: { price: Number }) {

    const { settings }: any = usePage().props;

    const numberWithCommas = (x: any) => {
        x = '' + x.toFixed(2);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <>
            {settings.currency_symbol.value} {Number(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </>
    )
}
