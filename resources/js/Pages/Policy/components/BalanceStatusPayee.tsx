import { Badge, Group, Text } from '@mantine/core'
import React from 'react'
import { AppPrice } from '@/Components'

export default function BalanceStatusPayee({ payee_name = '', status, amount, currency = 'RM' }: { payee_name?: any, status: any, amount?: any, currency?: any }) {
    return (
        <>
            <Group gap={8}>
                <Text tt='capitalize'>{payee_name ? payee_name + ':' : ''}</Text>
                {status == 'paid' && <Badge color='green'>{status}</Badge>}
                {status == 'unpaid' && <Badge color='red'>{status}</Badge>}
                {status == 'partial' && <>
                    <Badge color='orange'>{status}</Badge>
                    <Badge color='orange'>Balance: <AppPrice price={amount} /></Badge>
                </>}
                {status == 'overpaid' && <>
                    <Badge color='pink'>{status}</Badge>
                    <Badge color='pink'><AppPrice price={amount} /></Badge>
                </>}
            </Group>

        </>
    )
}
