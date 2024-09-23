import { Badge, Group, Text } from '@mantine/core'
import React from 'react'
import { AppPrice } from '@/Components'

export default function BalanceStatus({ balance, currency = 'RM', prefix = '' }: { balance: any, currency?: any, prefix?: any }) {
    return (
        <>
            {balance > 0 && <Group gap={8}>
                <Text tt='capitalize'>{prefix} Balance: </Text>
                <Badge color='orange'><AppPrice price={balance} /></Badge>
            </Group>}
            {balance < 0 && <Group gap={8}>
                <Text tt='capitalize'>{prefix} Overpaid: </Text>
                <Badge color='red'><AppPrice price={balance} /></Badge>
            </Group>}
        </>
    )
}
