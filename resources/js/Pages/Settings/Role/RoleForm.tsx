import React, { useEffect, useState } from 'react'
import AppInput from '@/Components/Forms/AppInput'
import { useForm } from '@inertiajs/react'
import axios from 'axios';
import { Table, Checkbox, Text, Group, Button } from '@mantine/core';

export default function RoleForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const id = values ? values.id : null;
    const permissionNames = values ? values.permissions.map((permission: any) => permission.name) : [];

    const { data, setData, post, put, reset, errors } = useForm({
        description: values ? values.description : '',
        name: values ? values.name : '',
        permissions: values ? permissionNames : [],
    });

    const [permissions, setPermissions] = useState([])

    useEffect(() => {

        axios.get(route('api.permissions.index')).then((response) => {

            if (response.data.data) {
                setPermissions(response.data.data);
            }
        });

        return () => {

        }
    }, []);

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('roles.store'), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal()
                },
            });
        } else {
            put(route('roles.update', id), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal()
                },
            });
        }

    }

    const onPermissionChecked = (name: any, checked: any) => {
        // console.log('fionPermissionCheckedrst: ' + id, checked)

        if (checked) {
            if (!data.permissions.includes(name)) {
                setData('permissions', [...data.permissions, name]);
            }
        } else {
            if (data.permissions.includes(name)) {
                const temp = data.permissions.filter((permission: any) => permission !== name)
                setData('permissions', temp);
            }
        }
    }


    return (
        <>
            <form onSubmit={onSubmit}>
                <AppInput label='Description' required id='description' values={data} errors={errors} onChange={(e: any) => setData('description', e.target.value)} />
                <AppInput label='Name' required id='name' values={data} errors={errors} onChange={(e: any) => setData('name', e.target.value)} disabled={!!id} />

                <Text my={10}>Permissions</Text>
                <Table withTableBorder maw={250}>
                    <Table.Tbody>
                        {permissions.map((permission: any, index: any) => {
                            return <Table.Tr key={index}>
                                <Table.Td>
                                    <Text>{permission.label}</Text>
                                </Table.Td>
                                <Table.Td align='right'>
                                    <Group justify="flex-end">
                                        <Checkbox
                                            size="md"
                                            checked={data.permissions.includes(permission.value)}
                                            onChange={(e) => onPermissionChecked(permission.value, e.target.checked)}
                                        />
                                    </Group>

                                </Table.Td>
                            </Table.Tr>
                        })}
                    </Table.Tbody>
                </Table>

                <Group justify="flex-end" mt={'xl'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
