import { AddButton, AddButtonModal, AppCard, AppSelect, AppTable, DeleteButton, UpdateButton, UpdateButtonModal } from '@/Components';
import AdminLayout from '@/Components/layout/AdminLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import { Box, Divider, Group, SimpleGrid, Text, TextInput } from '@mantine/core';
import CarPartsForm from './CarPartsForm';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';

export default function CartPartsPage() {

    const { carparts, model }: any = usePage().props;
    let query: any = usePage().props.ziggy;
    query = query.query;

    const onDelete = (id: any) => {
        router.delete(route('car-parts.destroy', id));
    }

    const { data, setData, post, put, reset, errors } = useForm({
        model: query ? query.model : '',
        year: query ? query.year : '',
        name: query ? query.name : '',
    });

    const [nameSearchDebounced] = useDebouncedValue(data.name, 500);
    const [yearearchDebounced] = useDebouncedValue(data.year, 500);

    useDidUpdate(() => {

        const newData = { ...data };
        newData.model = data.model ? data.model : '';
        newData.year = data.year ? data.year : '';
        newData.name = data.name ? data.name : '';

        router.reload({
            data: newData,
            preserveState: true
        });

    }, [nameSearchDebounced, yearearchDebounced, data.model]);

    const tableData = (carparts: any) => {

        const data = { ...carparts };
        const values: any = [];

        carparts.data.map((value: any) => {
            values.push({
                'name': value.name,
                'description': value.description,
                'model': value.vehicle_model.name,
                'year': value.year,
                'action':
                    <Group justify='right' gap='xs'>
                        <DeleteButton onDelete={() => onDelete(value.id)} />
                        <UpdateButton link={route('car-parts.show', { id: value.id })} />
                    </Group>
            });
        })
        data.data = values;

        return data;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    return <>
        <SimpleGrid cols={1}>
            <AppCard title='Car Parts' rightComponent={<AddButton link={route('car-parts.create')} />}>
                <Box p={'md'} mb={'md'}>
                    <Text fw={'bold'} mb={5}>Filter:</Text>
                    <Group gap={10}>
                        <TextInput mt={8} label="Name:" placeholder='Search by Name' my={0} w={350} value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <TextInput mt={8} label="Year:" placeholder='Search by Year' my={0} w={350} value={data.year} onChange={(e) => setData('year', e.target.value)} />
                        <AppSelect clearable searchable label='Model:' my={0} data={model} value={data.model} onChange={(e: any) => setData('model', e)} />
                    </Group>
                </Box>
                <Divider color='gray.2' />
                <AppTable headerOptions={headerOptions} data={tableData(carparts)} meta={carparts.meta} />
            </AppCard>
        </SimpleGrid>
    </>
}

CartPartsPage.layout = (page: any) => <AdminLayout children={page} title='Car Parts' />;
