import { router, useForm } from '@inertiajs/react';
import { Group, Table, Button, TextInput, Stack, Paper } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { DeleteButton } from '@/Components';
import ChildForm from './ChildForm';

export default function ItemForm({ index, item, type }: any) {

    const { data, setData, post, put, reset, errors } = useForm({
        name: item ? item.name : '',
        code: item ? item.code : '',
        type: type,
        items: item ? item.items : [],
    });
    const [isEdit, setIsEdit] = useState(false)
    const [child, setChild] = useState<any>('')

    const onSubmit = () => {
        updateItem();
    }

    const onDelete = () => {
        deleteItem();
    }

    const updateItem = () => {

        put(route('warranty-plan-items.update', item.id), {
            preserveState: true,
            onSuccess: () => {
                setIsEdit(false)
            },
        })
    }

    const deleteItem = () => {
        router.delete(route('warranty-plan-items.destroy', item.id), {
            preserveState: true,
            onSuccess: () => {
                setIsEdit(false)
            },
        })
    }

    function urlSafe(value: String) {
        return value == undefined ? '' : value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    useEffect(() => {
        if (data.name) {
            setData('code', urlSafe(data.name))
        }
    }, [data.name])

    const addItem = (name: any) => {

        // warranty-plan-items
        router.visit(route('warranty-plan-item-childs.store'), {
            method: 'post',
            data: {
                name: name,
                code: urlSafe(name),
                warranty_plan_item_id: item.id,
            },
            preserveState: true,
            onFinish: () => {
                setChild('');
            },
            onSuccess: () => {
                // closeModal && closeModal()
                setChild('');
            },
        })
    }

    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <Group>
                        <>{index}. </>
                        {!isEdit && item.name}
                        {isEdit && <TextInput size='xs' value={data.name} onChange={(e: any) => { setData('name', e.target.value); }} onKeyDown={(e) => { e.key === 'Enter' && (e.preventDefault(), onSubmit()) }} />}
                    </Group>
                </Table.Td>
                <Table.Td w={150}>
                    <Group gap={'xs'}>
                        {!isEdit && <Button size="compact-xs" color='blue' onClick={() => setIsEdit(true)}>Edit</Button>}
                        {!isEdit && <DeleteButton size="compact-xs" label='Delete' color='red' onDelete={onDelete} leftSection={null} />}
                        {isEdit && <Button size="compact-xs" color='green' onClick={onSubmit}>Submit</Button>}
                        {isEdit && <Button size="compact-xs" color='gray.5' onClick={() => setIsEdit(false)}>Cancel</Button>}
                    </Group>
                </Table.Td>

            </Table.Tr>
            <Table.Tr>
                <Table.Td>
                    <Group gap={'xs'} mb='sm'>
                        <TextInput size='xs' placeholder='Add child item' onChange={(e: any) => setChild(e.target.value)} value={child} onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} />
                        <Button size='xs' onClick={() => addItem(child)} disabled={!child}>Add Child</Button>
                    </Group>
                    <Table mb='md' withRowBorders withTableBorder>
                        {item.childs.map((item: any, index: any) => {
                            return (
                                <ChildForm key={index} index={index + 1} item={item} />
                            )
                        })}
                    </Table>
                </Table.Td>
            </Table.Tr>
        </>
    )
}
