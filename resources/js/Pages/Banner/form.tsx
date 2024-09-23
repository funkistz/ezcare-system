import { Box, Group, Button, Paper, Image, Text } from "@mantine/core";
import AppInput from "@/Components/Forms/AppInput";
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import AppSwitch from "@/Components/Forms/AppSwitch";
import { AppDropzone } from "@/features";
import { notifications } from '@mantine/notifications';
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";

function BannerForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        link: values ? values.link : '',
        image_url: values ? values.image_url : '',
        is_active: values ? values.is_active : true,
        position: values ? values.position : 1,
    });
    const [uploadModalOpened, setUploadModalOpened] = useState(false);

    const onChange = (e: any) => {
        setData({ ...data, [e.target.id]: e.target.value })
    };

    const onSwitchChange = (e: any) => {
        setData({ ...data, [e.target.id]: e.target.checked })
    };

    function urlSafe(value: String) {
        return value == undefined ? '' : value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!data.image_url) {

            notifications.show({
                message: 'Please upload image first',
                color: 'red'
            })

            return;
        }

        if (!values) {
            post(route('banner.store'), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal && closeModal()
                },
                preserveScroll: true
            });
        } else {
            put(route('banner.update', values.id), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal && closeModal()
                },
                preserveScroll: true
            });
        }

    }

    const onUpload = (e: any) => {
        console.log('onUpload', e.url)
        setData('image_url', e.url);
    }

    useEffect(() => {
        if (values) {
            const temp = {
                code: values.code,
                name: values.name,
            };
            setData({ ...data, ...temp });

        }

    }, [values])


    return (
        <Box>
            <form onSubmit={onSubmit}>

                <AppDropzone multiple={false} onSuccess={onUpload} mimes={IMAGE_MIME_TYPE} />

                <Text fs="italic" fz={14}>*Choose image with 16:9 ratio (example: 1600x900, 1280x720 or  or 800x450)</Text>
                <Text fs="italic" fz={14}>*Click upload first before submit</Text>

                <Image src={data.image_url} mt='md' />

                <AppInput label='Name' id='name' required value={data.name} onChange={onChange} errors={errors} />
                <AppInput label='Link' id='link' value={data.link} onChange={onChange} errors={errors} />
                {!values && <AppInput label='Position' id='position' required value={data.position} onChange={onChange} errors={errors} />}

                <AppSwitch id='is_active' label='Active' value={true} onChange={onSwitchChange} checked={data.is_active} />

                <Group mt='md' justify="right">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}

export default BannerForm;