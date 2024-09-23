import { ActionIcon, Box, Button, Flex, Modal, Paper, Stack, ThemeIcon, Text, Image, Group, Card } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconCloudUpload, IconPdf, IconX } from '@tabler/icons-react'
import axios from 'axios';
import React, { useState } from 'react'
import FilePreview from './FilePreview';

export default function AppInspectionImport({ policyNo, chassisNo, onSuccess }: any) {

    const [opened, { open, close }] = useDisclosure(false);
    const [files, setFiles] = useState<any>([])
    const [selected, setSelected] = useState<any>([])

    const getData = async () => {
        console.log('getData')

        const params = {
            policy_no: policyNo,
            chassis_no: chassisNo,
        }

        const response: any = axios.get(route('inspection.importImage'), {
            params: params
        }).then((response) => {
            const data = response.data;
            setFiles(data.files);
            console.log('data', data)

        });
    }

    const openModal = () => {

        open();
        getData();
    }

    const onSelect = (id: any) => {
        if (!selected.includes(id)) {
            setSelected([...selected, id]);
        } else {
            setSelected(selected.filter((e: any) => e != id))
        }
    }

    const onImport = () => {
        onSuccess({
            file_ids: selected
        });
        setSelected([]);
        close();
    }

    const previews = files ? files.map((file: any, index: any) => {

        return <Card radius='sm' p={0} h={'fit-content'} w={200} key={index} style={{ position: 'relative', border: selected.includes(file.id) ? '4px solid green' : '' }} onClick={() => onSelect(file.id)}>
            <Stack align="center" justify="space-between" h={'100%'} style={{ position: 'relative', overflow: 'hidden' }} >
                <Image key={index} src={file.thumbnail_url} />
            </Stack>
        </Card>
    }) : <Box my={20}>No Image Found</Box>;

    return (
        <>
            <Modal opened={opened} onClose={close} title={'Import Image From Inspection'} size='xl' radius={'lg'} padding='md' closeOnClickOutside={false}>
                <Flex gap={20}>
                    {previews}
                </Flex>
                <Group justify='end' mt={40}>
                    <Text>{selected.length} image{(selected.length > 1) ? 's' : ''} selected</Text>
                    <Button color='green' onClick={onImport}>Confirm Import</Button>
                </Group>
            </Modal>
            <Button w={115} size='xs' radius='xl' leftSection={<IconCloudUpload size={18} />} color='orange' onClick={openModal}>Import</Button>
        </>
    )
}
