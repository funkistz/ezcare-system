import { router, useForm } from '@inertiajs/react';
import { Group, Table, Button, TextInput, Stack } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { DeleteButton } from '@/Components';

export default function ChildForm({ index, item }: any) {

    const { data, setData, post, put, reset, errors } = useForm({
        name: item ? item.name : '',
        code: item ? item.code : '',
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

        put(route('warranty-plan-item-childs.update', item.id), {
            preserveState: true,
            onSuccess: () => {
                setIsEdit(false)
            },
        })
    }

    const deleteItem = () => {
        router.delete(route('warranty-plan-item-childs.destroy', item.id), {
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
        </>
    )
}
