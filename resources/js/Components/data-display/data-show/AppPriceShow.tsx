import { usePage } from '@inertiajs/react';
import React from 'react'

export default function AppPriceShow({ price, noDecimal = false }: { price: number, noDecimal?: boolean }) {

    const numberWithCommas = (x: any) => {
        x = '' + x.toFixed(2);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            {!noDecimal && numberWithCommas(Math.round((Number(price) + Number.EPSILON) * 100) / 100)}
            {noDecimal && numberWithCommas(Math.trunc(Math.round((Number(price) + Number.EPSILON) * 100) / 100))}
        </>
    )
}
