import React from 'react'
import { Text } from '@mantine/core'

export default function TableColCapitalize({ text }: { text: string }) {
    return (
        <Text tt={'capitalize'} fz={14}>{text}</Text>
    )
}
