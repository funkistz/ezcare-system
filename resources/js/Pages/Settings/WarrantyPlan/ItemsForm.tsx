import React, { useState } from 'react';
import { AppInput, ConfigCodeInput } from '@/Components';
import { useForm, router } from '@inertiajs/react'
import { Group, Button, Stack, Text, TextInput, Paper, Table } from '@mantine/core';
import ItemForm from './ItemForm';

export default function ItemsForm({ values, closeModal }: { values?: any, closeModal?: any }) {

    const id = values ? values.id : null;

    console.log('values', values)

    const { data, setData, post, put, reset, errors } = useForm({
        name: values ? values.name : '',
        code: values ? values.code : '',
        description: (values && values.description) ? values.description : '',
        covered_items: (values && values.covered_items) ? values.covered_items : [],
        addon_items: (values && values.addon_items) ? values.addon_items : [],
    });
    const [item, setItem] = useState<any>('')
    const [addonItem, setAddonItem] = useState<any>('')

    const addItem = (name: any, type: any) => {

        // warranty-plan-items
        router.visit(route('warranty-plan-items.store'), {
            method: 'post',
            data: {
                name: name,
                type: type,
                code: urlSafe(name),
                warranty_plan_id: id,
            },
            preserveState: true,
            onFinish: () => {
                setAddonItem('');
                setItem('');
            },
            onSuccess: () => {
                // closeModal && closeModal()
                addonItem('');
                setItem('');
            },
        })
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!id) {
            post(route('warranty-plans.store'), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        } else {
            put(route('warranty-plans.update', id), {
                data,
                onSuccess: () => {
                    closeModal && closeModal()
                },
            });
        }
    }

    function urlSafe(value: String) {
        return value == undefined ? '' : value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                {values && <><Stack mt={'md'}>
                    <Text>Covered Item</Text>
                    <Group gap={'xs'}>
                        <TextInput placeholder='Covered Item' onChange={(e: any) => setItem(e.target.value)} value={item} onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} />
                        <Button onClick={() => addItem(item, 'covered')} disabled={!item}>Add Item</Button>
                    </Group>
                    <Table withRowBorders withTableBorder>
                        <Table.Tbody>
                            {values.covered_items.map((item: any, index: any) => {
                                return (
                                    <ItemForm key={index} index={index + 1} item={item} type='covered' />
                                )
                            })}
                        </Table.Tbody>
                    </Table>
                </Stack>
                    <Stack mt={'md'}>
                        <Text>Addon Item</Text>
                        <Group gap={'xs'}>
                            <TextInput placeholder='Addon Item' onChange={(e: any) => setAddonItem(e.target.value)} value={addonItem} onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} />
                            <Button onClick={() => addItem(addonItem, 'addon')} disabled={!addonItem}>Add Item</Button>
                        </Group>
                        <Table withRowBorders withTableBorder>
                            <Table.Tbody>
                                {values.addon_items.map((item: any, index: any) => {
                                    return (
                                        <ItemForm key={index} index={index + 1} item={item} type='addon' />
                                    )
                                })}
                            </Table.Tbody>
                        </Table>
                    </Stack>
                </>}

                <Group justify="flex-end" mt={'md'}>
                    <Button type='submit' color='green'>Submit</Button>
                </Group>
            </form >
        </>
    )
}
