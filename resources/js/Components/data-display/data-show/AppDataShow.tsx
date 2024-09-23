import { Group, Stack, Text } from '@mantine/core'
import React from 'react'

export default function AppDataShow({ label, value, valueOptions, capitalize = false, uppercase = false, oneline = false }: { label: String, value: any, valueOptions?: any, capitalize?: boolean, uppercase?: boolean, oneline?: boolean }) {

    const display = (text: any) => {

        if (typeof text == 'string') {
            return <Text fz={15} fw={500} {...valueOptions} tt={capitalize ? 'capitalize' : (uppercase ? ' uppercase' : 'none')}>{value ? value : '-'}</Text>;
        } else {
            return text;
        }
    }

    return (
        <>
            {
                oneline && <Group gap={5}>
                    <Text fz={15} fw={300}>{label}:</Text>
                    {display(value)}
                </Group>
            }
            {
                !oneline && <Stack gap={5}>
                    <Text fz={15} fw={300}>{label}:</Text>
                    {display(value)}
                </Stack>
            }
        </>
    )
}
