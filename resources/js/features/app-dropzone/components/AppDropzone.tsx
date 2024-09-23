import { useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme, Image, SimpleGrid, ThemeIcon, Stack, Paper, LoadingOverlay, ActionIcon, Box, Flex } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES, IMAGE_MIME_TYPE, PDF_MIME_TYPE, MS_WORD_MIME_TYPE, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload, IconPdf, IconUpload, IconFile } from '@tabler/icons-react';
import classes from './AppDropzone.module.css';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import AppInspectionImport from './AppInspectionImport';

export default function AppDropzone({ onSuccess, multiple = true, mimes, withIcon = true }: { onSuccess?: any, multiple?: boolean, mimes?: any, withIcon?: boolean }) {
    const theme = useMantineTheme();
    const openRef = useRef<() => void>(null);

    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const previews = files.map((file, index) => {
        // console.log('file', file)
        const imageUrl = URL.createObjectURL(file);

        return <Paper radius='sm' h={'fit-content'} w={200} key={index} style={{ position: 'relative' }}>
            <ActionIcon variant="filled" radius="xl" aria-label="Settings" size={'md'} color='red' onClick={() => removeFile(index)} style={{ position: 'absolute', right: 0, top: 0, zIndex: 99999 }}>
                <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <Stack align="center" justify="space-between" h={'100%'} style={{ position: 'relative', overflow: 'hidden' }} p='xs'>
                {file.type.split('/')[0] !== 'image' && <ThemeIcon radius="xl" size={100} my={20} variant="default"><IconPdf size={50} /></ThemeIcon>}
                {file.type.split('/')[0] == 'image' && <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />}
                <Text fz={11} w='100%' lineClamp={2}>{file.name}</Text>
            </Stack>
        </Paper>
    });

    const removeFile = (fileIndex: Number) => {

        const newFiles = files.filter((file, index) => index !== fileIndex)
        setFiles(newFiles);
    }

    const uploadAllFile = async () => {

        setIsLoading(true);
        files.forEach(async file => {
            await uploadOneFile(file);
        });
        setIsLoading(false);
        setFiles([]);
        console.log('all done');
    }

    const uploadOneFile = async (file: any) => {

        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const result = await axios.post('/cloud-upload', formData, config).then((result) => {

            let data = result.data;
            console.log('result', data);

            if (onSuccess) {
                onSuccess(data.result);
            }

            notifications.show({
                message: data.message,
                color: 'green'
            })
        }).catch((error) => {
            console.log('Show error notification!', error)
            notifications.show({
                message: error.response.data.message,
                color: 'red'
            })
            return Promise.reject(error)
        })

    }

    const size = withIcon ? 150 : 'auto';

    return (
        <>
            <div className={classes.wrapper} >
                <Box>
                    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    <Stack justify='flex-start'>
                        <Group>
                            <Dropzone
                                w={'auto'}
                                h={size}
                                openRef={openRef}
                                onDrop={(dropFiles: any) => setFiles([...files, ...dropFiles])}
                                className={classes.dropzone}
                                radius="md"
                                accept={mimes ? mimes : [...IMAGE_MIME_TYPE, MIME_TYPES.pdf, MIME_TYPES.csv, MIME_TYPES.doc, MIME_TYPES.docx, MIME_TYPES.mp4]}
                                maxSize={30 * 1024 ** 2}
                                multiple={multiple}
                                disabled={multiple ? false : (files.length == 1)}
                            >
                                <Stack style={{ pointerEvents: 'none' }} gap={0}>
                                    {withIcon && <Group justify="center">
                                        <Dropzone.Accept>
                                            <IconDownload
                                                style={{ width: rem(40), height: rem(40) }}
                                                color={theme.colors.blue[6]}
                                                stroke={1.5}
                                            />
                                        </Dropzone.Accept>
                                        <Dropzone.Reject>
                                            <IconX
                                                style={{ width: rem(40), height: rem(40) }}
                                                color={theme.colors.red[6]}
                                                stroke={1.5}
                                            />
                                        </Dropzone.Reject>
                                        <Box mt={5}>
                                            <Dropzone.Idle>
                                                <IconCloudUpload style={{ width: rem(40), height: rem(40) }} stroke={1.5} />
                                            </Dropzone.Idle>
                                        </Box>

                                    </Group>
                                    }
                                    <Text ta="center" fw={700} fz="md" mb={withIcon ? 'md' : 0}>
                                        {withIcon && <Dropzone.Accept>Drop files here</Dropzone.Accept>}
                                        <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                                        {withIcon && <Dropzone.Idle>Drop files here</Dropzone.Idle>}
                                    </Text>
                                    {/* <Text ta="center" fz="sm" mt="xs" c="dimmed">
                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
                        are less than 30mb in size.
                    </Text> */}
                                    <Group justify='flex-start' >
                                        <Button className={classes.control} size="xs" radius="xl" onClick={() => openRef.current?.()} leftSection={<IconFile size={16} />} disabled={multiple ? false : (files.length == 1)}>
                                            Select files
                                        </Button>
                                    </Group>
                                </Stack>


                            </Dropzone>
                        </Group>
                        {files.length > 0 && <Paper p='lg' radius='lg' shadow='sm'>
                            <Flex gap={20}>
                                {previews}
                            </Flex>
                            <Group>
                                <Button w={200} color='orange' className={classes.control} size="sm" radius="xl" mt={'xl'} onClick={() => uploadAllFile()} leftSection={<IconUpload />} >
                                    Upload
                                </Button>
                            </Group>
                        </Paper>}

                    </Stack>
                </Box>
            </div>
        </>
    );
}