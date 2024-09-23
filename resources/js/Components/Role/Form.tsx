import { Box, Group, Button, Switch } from "@mantine/core";
import AppInput from "../Forms/AppInput";
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import AppSelect from "../Forms/AppSelect";
import AppSwitch from "../Forms/AppSwitch";

function RoleForm({ route, close, values, extra }: any) {

    const { data, setData, post, put, reset, errors } = useForm({ code: values ? values.code : '', name: values ? values.name : '' });
    const onChange = (e: any) => {
        setData({ ...data, [e.target.id]: e.target.value })
    };

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!values) {
            post(route, {
                data,
                onSuccess: () => {
                    reset(),
                        close()
                },
            });
        } else {
            put(route, {
                data,
                onSuccess: () => {
                    reset(),
                        close()
                },
            });
        }

    }

    useEffect(() => {
        if (values) {
            const temp = {
                name: values.name,
            };
            setData({ ...data, ...temp });

        }

    }, [values])


    return (
        <Box>
            <form onSubmit={onSubmit}>
                <AppInput label='Name' id='name' required value={data.name} onChange={onChange} error={errors.name}></AppInput>
                <Group mt='md' position="right">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}

export default RoleForm;