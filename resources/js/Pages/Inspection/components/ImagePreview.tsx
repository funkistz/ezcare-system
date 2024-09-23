import React from 'react'
import { Button, Card, Input, Modal, SegmentedControl, Stack, Text, TextInput, Textarea, Group, Divider, ActionIcon, Flex, Image, } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export default function ImagePreview({ src, onDelete }: any) {
    return (
        <Card pos='relative' radius={'md'} withBorder>
            <Image src={src} />
            {/* {onDelete && <ActionIcon radius='xl' bg='red' pos='absolute' top={0} left={0} onClick={onDelete}>
                <IconX />
            </ActionIcon>} */}
        </Card>
    )
}
