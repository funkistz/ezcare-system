import { Box, Group, Button, Switch } from "@mantine/core";
import AppInput from "../Forms/AppInput";
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import AppSelect from "../Forms/AppSelect";
import AppSwitch from "../Forms/AppSwitch";

function ConfigFormAdd({ route, close, values, extra, children }: any) {

    const { data, setData, post, put, reset, errors } = useForm({ code: values ? values.code : '', name: values ? values.name : '' });
    const [auto, setAuto] = useState(true)
    const onChange = (e: any) => {
        if (auto && e.target.id == 'name') {
            const tempName = urlSafe(e.target.value);
            setData({ ...data, code: tempName, [e.target.id]: e.target.value })
        } else {
            setData({ ...data, [e.target.id]: e.target.value })

        }

    };

    function urlSafe(value: String) {
        return value == undefined ? '' : value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }


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
        setData({ ...data, ...extra });
    }, [extra])

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
                <Group>
                    {children}
                    <AppInput label='Code' id='code' required value={data.code} onChange={onChange} error={errors.code} readOnly={!!values || auto} description='*Auto option will generate code base on name input'></AppInput>
                    <Switch onLabel="AUTO" offLabel="MANUAL" size="lg" mt={50} checked={auto} onChange={(value) => setAuto(value.target.checked)} />
                </Group>
                <AppInput label='Name' id='name' required value={data.name} onChange={onChange} error={errors.name}></AppInput>
                <Group mt='md' position="right">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}

export default ConfigFormAdd;