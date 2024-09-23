import React, { useState } from 'react'
import { Card, Group, Text, Image, Modal, ActionIcon, Button, ThemeIcon, Tooltip, Box, Flex } from '@mantine/core'
import classes from './FilePreview.module.css';
import { useDisclosure } from '@mantine/hooks';
import { IconFile, IconX } from '@tabler/icons-react';
import { router } from '@inertiajs/react';

export default function FilePreview({ file, type, display = 'card' }: { file: any, type: any, display?: any }) {

    const [opened, { open, close }] = useDisclosure(false);
    const [confirmModal, setConfirmModal] = useState(false);

    // console.log('file', file)

    const onPreview = () => {
        if (file.type.split('/')[0] == 'image') {
            open();
        } else {
            window.open(file.url, '_blank').focus();
        }
    }

    const onDelete = () => {

        router.delete(route('file.destroy', file.id), {
            data: {
                fileable_id: file.pivot ? file.pivot.fileable_id : '',
                type: type
            },
            onSuccess: () => {
                setConfirmModal(false);
            },
        });
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="Preview" size="calc(50vw)">
                <Flex justify={'center'} h='100vh'>
                    {file.type.split('/')[0] !== 'image' && <ThemeIcon size={'70%'} variant="default"><IconFile style={{ width: '50%', height: '50%' }} /> </ThemeIcon>}
                    {file.type.split('/')[0] == 'image' && <Image height={'80%'} fit="contain" src={file.url} onLoad={() => URL.revokeObjectURL(file.url)} />}
                </Flex>
            </Modal>
            <Modal opened={confirmModal} onClose={() => setConfirmModal(false)} title="Confirmation" size='xs'>
                <Group gap='xs' justify='center'>
                    <Button color='red' onClick={onDelete}>Confirm Delete</Button>
                    <Button color='gray.6'>Cancel</Button>
                </Group>
            </Modal>

            {display == 'card' && <Tooltip label={file.name}><Card withBorder radius="md" p='xs' className={classes.wrapper} onClick={onPreview} w={200}>
                <Card.Section>
                    <Group justify='center' h={200}>
                        {file.type.split('/')[0] !== 'image' && <Group><ThemeIcon variant="default"><IconFile /> </ThemeIcon></Group>}
                        {file.type.split('/')[0] == 'image' && <Image src={file.thumbnail_url} onLoad={() => URL.revokeObjectURL(file.thumbnail_url)} height={160} />}
                        <ActionIcon size='md' variant="filled" aria-label="Settings" radius='xl' color='red' className={classes.deleteButton} onClick={(e) => { e.stopPropagation(); setConfirmModal(true); }}>
                            <IconX size={16} />
                        </ActionIcon>
                    </Group>
                </Card.Section>

                <Group justify="space-between" mt={25} w='100%'>
                    <Text fz={13} lineClamp={2} truncate="end">{file.name}</Text>
                </Group>
            </Card>
            </Tooltip>
            }
            {display == 'list' && <Tooltip label={file.name}>
                <Box px={12} w={'100%'}>
                    <Card withBorder radius="md" p='xs' className={classes.wrapper} onClick={onPreview} >
                        <ActionIcon size='md' variant="filled" aria-label="Settings" radius='xl' color='red' className={classes.deleteButton} onClick={(e) => { e.stopPropagation(); setConfirmModal(true); }}>
                            <IconX size={16} />
                        </ActionIcon>
                        <Group justify='flex-start'>
                            {file.type.split('/')[0] !== 'image' && <Group><ThemeIcon variant="default"><IconFile /> </ThemeIcon></Group>}
                            {file.type.split('/')[0] == 'image' && <Image src={file.thumbnail_url} onLoad={() => URL.revokeObjectURL(file.thumbnail_url)} height={160} />}
                            <Text fz={13} lineClamp={2} truncate="end">{file.name}</Text>
                        </Group>
                    </Card>
                </Box>
            </Tooltip>
            }
        </>
    )
}
