import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButton, UpdateButtonModal, AppButton, TableColCapitalize, DeleteButton } from '@/Components';
import { Group, Button, Paper, Box, SimpleGrid, Stack, SegmentedControl, Text } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import BrandForm from './BrandForm';
import ModelForm from './ModelForm';
import VariantForm from './VariantForm';
import { IconList, IconPhoto } from '@tabler/icons-react';

export default function Index() {

    const { brands }: any = usePage().props;
    const [activeBrand, setActiveBrand] = useState<any>();
    const [activeModel, setActiveModel] = useState<any>();
    const [brandSegment, setBrandSegment] = useState<any>('japanese');
    const [segment, setSegment] = useState<any>();

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {

            // console.log(brandSegment, value.type)

            if (brandSegment != value.type) {
                // console.log(brandSegment, value.type)
                return;
            }

            values.push({
                'name': <TableColCapitalize text={value.name} />,
                'action':
                    <Group justify='right' gap='xs'>
                        <DeleteButton onDelete={() => onDeleteBrand(value.id)} />
                        <UpdateButtonModal title='Update Brand'>
                            <BrandForm values={value} />
                        </UpdateButtonModal>
                        <AppButton onClick={() => { setActiveBrand(value); setSegment('m') }} color='orange'>View Models</AppButton>
                        <AppButton onClick={() => { setActiveBrand(value); setSegment('v') }} color='pink'>View Variants</AppButton>
                    </Group>
            });
        })
        return values;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    const tableDataModel = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'type': <TableColCapitalize text={value.type} />,
                'name': <TableColCapitalize text={value.name} />,
                'action':
                    <Group justify='right' gap={10}>
                        <DeleteButton onDelete={() => onDeleteModel(value.id)} />
                        <UpdateButtonModal title='Update Model'>
                            <ModelForm brandCode={activeBrand.code} values={value} />
                        </UpdateButtonModal>
                    </Group>
            });
        })
        return values;
    }

    const tableDataVariant = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'name': <TableColCapitalize text={value.name} />,
                'action':
                    <Group justify='right' gap={10}>
                        <DeleteButton onDelete={() => onDeleteVariant(value.id)} />
                        <UpdateButtonModal title='Update Model'>
                            <VariantForm brandCode={activeBrand.code} values={value} />
                        </UpdateButtonModal>
                    </Group>
            });
        })
        return values;
    }

    useEffect(() => {
        // if (japan_brands) {
        //     const findBrand = activeBrand ? japan_brands.data.find((brand: any) => brand.id == activeBrand.id) : null;
        //     if (findBrand) {
        //         setActiveBrand(findBrand);
        //     }
        // }
        if (brands) {
            const findBrand = activeBrand ? brands.data.find((brand: any) => brand.id == activeBrand.id) : null;
            if (findBrand) {
                setActiveBrand(findBrand);
            }
        }
    }, [brands])

    const onDeleteBrand = (id: any) => {
        router.delete(route('vehicle-brands.destroy', id));
    }

    const onDeleteModel = (id: any) => {
        router.delete(route('vehicle-models.destroy', id));
    }

    const onDeleteVariant = (id: any) => {
        router.delete(route('vehicle-variants.destroy', id));
    }

    return (
        <div>
            <SimpleGrid cols={2}>
                <Stack>
                    <Paper p={10} radius={'lg'} shadow='sm'>
                        <Text p={'xs'}>Choose Brand Type: </Text>
                        <SegmentedControl color="primary" fullWidth data={[
                            { value: 'japanese', label: 'Japanese' },
                            { value: 'continental', label: 'Continental' },
                            { value: 'local', label: 'Local' },
                            { value: 'korean', label: 'korean' },
                        ]} value={brandSegment} onChange={(e) => setBrandSegment(e)} radius="xl" />
                    </Paper>
                    <AppCard title='Vehicle Brands' rightComponent={
                        <AddButtonModal title='Add Brand' label={'Add ' + brandSegment + ' Brand'} >
                            <BrandForm type={brandSegment} />
                        </AddButtonModal>
                    }>
                        <AppTable headerOptions={headerOptions} data={tableData(brands.data)} />
                    </AppCard>
                </Stack>


                {activeBrand && segment == 'm' && <Box mt={200}>
                    <AppCard title={activeBrand.name + " Model's"} rightComponent={<AddButtonModal title='Add Model' >
                        <ModelForm brandCode={activeBrand.code} />
                    </AddButtonModal>}>
                        <AppTable headerOptions={headerOptions} data={tableDataModel(activeBrand.models)} />
                    </AppCard>
                </Box>}

                {activeBrand && segment == 'v' && <Box mt={200}>
                    <AppCard title={activeBrand.name + " Variant's"} rightComponent={<AddButtonModal title='Add Variant' >
                        <VariantForm brandCode={activeBrand.code} />
                    </AddButtonModal>}>
                        <AppTable headerOptions={headerOptions} data={tableDataVariant(activeBrand.variants)} />
                    </AppCard>
                </Box>}

                {/* {activeModel && <Box mt={100}>
                    <AppCard title='Edit Model'>
                        <ModelForm values={activeModel} brandCode={activeBrand.code} />
                        <Divider my={'md'} />
                        <Group justify="space-between">
                            <Text fz={18} fw={'bolder'} ml={'sm'}>Model Variants</Text>
                            <AddButtonModal title='Add Variant' >
                                <VariantForm modelCode={activeModel.code} />
                            </AddButtonModal>
                        </Group>
                        <Divider mt={'md'} />
                        <AppTable headerOptions={headerOptions} data={tableDataVariant(activeModel.variants)} />
                    </AppCard>
                </Box>} */}

            </SimpleGrid>

        </div >
    )
}


Index.layout = (page: any) => <AdminLayout children={page} title='Manage Vehicle Brands' />;