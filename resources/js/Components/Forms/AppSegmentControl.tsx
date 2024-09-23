import React from 'react';
import { SegmentedControl, Text, Stack } from '@mantine/core';

export default function AppSegmentControl(options: any) {
    return <>
        <Stack gap={0} mt={8}>
            {!!options.label && <Text mt={8} mb={2} fz={14} fw={500}>{options.label}</Text>}
            <SegmentedControl
                color="primary"
                radius={'sm'}
                // size={8}
                mb={4}
                {...options}
                value={options.values ? options.values[options.id] : (options.value ? options.value : null)}
                error={options.errors ? options.errors[options.id] : (options.error ? options.error : '')}
            />
        </Stack>
    </>;
}
