import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AppButton, DeleteButton } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, Divider, Switch, ActionIcon, Spoiler, Flex, Stack, BackgroundImage } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import VacancyForm from './VacancyForm';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';


export default function Index() {

    const { vacancy }: any = usePage().props;

    console.log(vacancy)

    const onChangeActive = (vacancy: any, is_active: any) => {
        router.put(route('vacancy.change_active', vacancy.id), {
            is_active: is_active
        }, { preserveScroll: true });
    }

    const onPositionChange = (vacancy: any, position: any) => {
        console.log(vacancy.id)
        router.put(route('vacancy.change_position', vacancy.id), {
            position: position
        }, { preserveScroll: true });
    }

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any, i:any) => {
            values.push({
                'name': <Stack w={200}>
                    <Text ta={'start'} truncate="end">{value.name}</Text>
                </Stack>,
                'Description': <Box w={150} >
                  <Text truncate="end">
                      {value.description}
                  </Text>
              </Box>,
                'action':
                    <Group justify='right' gap='xs'>
                        <Switch onLabel="Active" offLabel="Inactive" checked={value.is_active} size='md' onClick={() => { onChangeActive(value, !value.is_active) }} />
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButtonModal title='Update Branch'>
                            <VacancyForm values={value} />
                        </UpdateButtonModal>
                        <Group gap={5}>
                            <ActionIcon color="dark.5" radius="xl" variant="filled" disabled={0 == i} onClick={() => { onPositionChange(value, value.position - 1) }}>
                                <IconArrowUp size="1.125rem" />
                            </ActionIcon>
                            <ActionIcon color="dark.5" radius="xl" variant="filled" disabled={vacancy.data.length - 1 == i} onClick={() => { onPositionChange(value, value.position + 1) }}>
                                <IconArrowDown size="1.125rem" />
                            </ActionIcon>
                        </Group>
                    </Group>
            });
        })
        return values;
    }
    const headerOptions = {
        'action': { ta: 'right' }
    }

    const onDelete = (id: any) => {
        router.delete(route('vacancy.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={1}>
                <AppCard title='Vacancy' rightComponent={
                    <AddButtonModal title='Add Vacancy' >
                        <VacancyForm />
                    </AddButtonModal>
                }>
                    <AppTable headerOptions={headerOptions} data={tableData(vacancy.data)} />
                </AppCard>
            </SimpleGrid>

        </div>
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Vacancy' />;