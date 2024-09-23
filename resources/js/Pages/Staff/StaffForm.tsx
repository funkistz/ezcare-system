import React, { useEffect, useState } from 'react'
import AppInput from '@/Components/Forms/AppInput'
import { useForm, usePage } from '@inertiajs/react'
import axios from 'axios';
import { Table, Checkbox, Text, Group, Button, Stack, Switch } from '@mantine/core';
import AppSwitch from '@/Components/Forms/AppSwitch';
import { PageProps } from '@/types';

export default function StaffForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const { branches }: any = usePage<PageProps>().props;

    const id = values ? values.id : null;
    const roleNames = values ? values.roles.map((role: any) => role.name) : [];

    const { data, setData, post, put, reset, errors } = useForm({
        email: values ? values.email : '',
        name: values ? values.name : '',
        password: '',
        active: values ? (values.active == 1 ? true : false) : false,
        is_exclude_report: values ? (values.is_exclude_report ? true : false) : false,
        roles: values ? roleNames : [],
        branches: values ? values.branches : [],
    });
    const [confirmPassword, setConfirmPassword] = useState('')

    const [roles, setRoles] = useState([])

    console.log('data branches', data.branches)

    useEffect(() => {

        axios.get(route('api.roles.index')).then((response) => {

            if (response.data.data) {
                console.log('roles', roles)
                setRoles(response.data.data);
            }
        });

        return () => {

        }
    }, []);

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (data.password !== confirmPassword) {
            return;
        }

        if (!id) {
            post(route('staffs.store'), {
                data,
                onSuccess: () => {
                    reset(),
                        closeModal()
                },
            });
        } else {
            put(route('staffs.update', id), {
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
            if (!data.roles.includes(name)) {
                setData('roles', [...data.roles, name]);
            }
        } else {
            if (data.roles.includes(name)) {
                const temp = data.roles.filter((permission: any) => permission !== name)
                setData('roles', temp);
            }
        }
    }

    const onBranchChecked = (id: any, checked: any) => {
        // console.log('fionPermissionCheckedrst: ' + id, checked)

        const branchCheck = data.branches.find((e: any) => e.id == id);
        const branch = branches.find((e: any) => e.id == id);

        if (checked) {
            if (!branchCheck) {
                setData('branches', [...data.branches, branch]);
            }
        } else {
            if (branchCheck) {
                const temp = data.branches.filter((b: any) => b.id !== id)
                setData('branches', temp);
            }
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <AppInput label='Name' required id='name' values={data} errors={errors} onChange={(e: any) => setData('name', e.target.value)} />
                <AppInput label='Email' required id='email' values={data} errors={errors} onChange={(e: any) => setData('email', e.target.value)} disabled={!!id} />
                <AppInput type='password' label='Password' required={!id} id='password' values={data} errors={errors} onChange={(e: any) => setData('password', e.target.value)} />
                <AppInput type='password' label='Confirm Password' required={!id} value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)}
                    error={(data.password !== confirmPassword) ? 'Password do not matched!' : false} />

                <Stack gap={0} my={20}>
                    <Text>Is Active</Text>
                    <Switch size='md' checked={data.active} onChange={(e: any) => setData('active', e.target.checked)} />
                </Stack>

                <Stack gap={0} my={20}>
                    <Text>Exclude Mo Report</Text>
                    <Switch size='md' checked={data.is_exclude_report} onChange={(e: any) => setData('is_exclude_report', e.target.checked)} />
                </Stack>

                <Group grow align='start'>
                    <Stack gap={0}>
                        <Text my={10}>Branches</Text>
                        <Table withTableBorder maw={250} mb={20}>
                            <Table.Tbody>
                                {branches.map((branch: any, index: any) => {
                                    return <Table.Tr key={index}>
                                        <Table.Td>
                                            <Text>{branch.name}</Text>
                                        </Table.Td>
                                        <Table.Td align='right'>
                                            <Group justify="flex-end">
                                                <Checkbox
                                                    size="md"
                                                    checked={data.branches.find((e: any) => e.id == branch.id)}
                                                    onChange={(e) => onBranchChecked(branch.id, e.target.checked)}
                                                />
                                            </Group>

                                        </Table.Td>
                                    </Table.Tr>
                                })}
                            </Table.Tbody>
                        </Table>
                    </Stack>
                    <Stack gap={0}>
                        <Text my={10}>Roles</Text>
                        <Table withTableBorder maw={250}>
                            <Table.Tbody>
                                {roles.map((permission: any, index: any) => {
                                    return <Table.Tr key={index}>
                                        <Table.Td>
                                            <Text>{permission.label}</Text>
                                        </Table.Td>
                                        <Table.Td align='right'>
                                            <Group justify="flex-end">
                                                <Checkbox
                                                    size="md"
                                                    checked={data.roles.includes(permission.value)}
                                                    onChange={(e) => onPermissionChecked(permission.value, e.target.checked)}
                                                />
                                            </Group>

                                        </Table.Td>
                                    </Table.Tr>
                                })}
                            </Table.Tbody>
                        </Table>
                    </Stack>

                </Group>


                <Group justify="flex-end" mt={'xl'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form>
        </>
    )
}
