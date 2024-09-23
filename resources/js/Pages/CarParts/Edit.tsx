import { AddButtonModal, AppCard, AppSelect, AppTable, DeleteButton, UpdateButtonModal } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import { Box, Divider, Group, SimpleGrid, Text, TextInput } from '@mantine/core';
import CarPartsForm from './CarPartsForm';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';

export default function CartPartsEdit() {
    const { data }: any = usePage().props;

    return <>
        <SimpleGrid cols={2}>
            <AppCard title='Car Parts'>
                <CarPartsForm values={data} />
            </AppCard>
        </SimpleGrid>
    </> 
}

CartPartsEdit.layout = (page: any) => <AdminLayout children={page} title='Edit Car Part' />;
