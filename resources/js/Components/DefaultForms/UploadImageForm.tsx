import { Modal } from "@mantine/core";
import { useState, useEffect } from "react";
import { Text, Image, SimpleGrid, Divider, Button, Center } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import axios from "axios";
import { notifications } from '@mantine/notifications';
import { Head, usePage } from '@inertiajs/react';

function UploadImageForm({ opened = false, setOpened, imageSelected }: any) {

    // const { classes, theme } = useStyles();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const { auth }: any = usePage().props;

    console.log('auth', auth);

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Image
                key={index}
                src={imageUrl}
            // imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
        );
    });

    useEffect(() => {

        if (opened) {
            getImages();
        }

        return () => {

        }
    }, [opened])


    const upload = async () => {

        setLoading(true);
        const formData = new FormData();
        formData.append('image', files[0]);

        if (auth && auth.user) {
            formData.append('user_id', auth.user.id);
        }

        let url = `https://poplook.com/modules/poplookfileupload/poplook_fileupload_submit.php`;
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const result = await axios.post('/upload-image', formData, config).then((result) => {

            let data = result.data;
            // setImagesUploaded(data);
            console.log('result', data);
            setFiles([]);
            getImages();
            notifications.show({
                message: data.message,
                color: 'green'
            })
            setLoading(false);
        }).catch((error) => {
            console.log('Show error notification!', error)
            setLoading(false);
            return Promise.reject(error)
        }
        )
    }

    const getImages = async () => {

        const result = await axios.get(route('file.index')).then((result) => {

            let data = result.data.data;
            // setImagesUploaded(data);
            console.log('result', data);
            setImages(data);

        }).catch((error) => {
            console.log('Show error notification!', error)
            return Promise.reject(error)
        })
    }

    const selectImage = (image: any) => {
        imageSelected(image);
        setOpened(false);
    }

    return (<>
        <Modal opened={opened} onClose={() => setOpened(false)} title="Upload Image" size="55%">
            <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                <Text ta="center">Drop images here</Text>
            </Dropzone>

            <SimpleGrid
                cols={4}
                // breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt={previews.length > 0 ? 'xl' : 0}
            >
                {previews}
            </SimpleGrid>
            {files && files.length > 0 && <Center>
                <Button color="green" size="md" mt='md' onClick={() => upload()} loading={loading}>
                    Upload
                </Button>
            </Center>
            }

            <Divider my='xl' />

            <SimpleGrid cols={5}>
                {images && images.map((image: any, index: any) => {
                    return <Image key={index} mx="auto" radius="md" src={image.thumbnail_url} alt="image"
                        // className={classes.image} 
                        onClick={() => selectImage(image)} />;
                })}
            </SimpleGrid>
        </Modal>
    </>);
}

export default UploadImageForm;

// const useStyles = createStyles((theme) => ({
//     image: {
//         transition: 'ease-out 100ms',
//         '&:hover': {
//             cursor: 'pointer',
//             boxShadow: theme.shadows.md,
//             transform: 'scale(0.97)',
//         },
//         '&:active': {
//             cursor: 'pointer',
//             boxShadow: theme.shadows.md,
//             transform: 'scale(0.9)',
//         },
//     },
// }));