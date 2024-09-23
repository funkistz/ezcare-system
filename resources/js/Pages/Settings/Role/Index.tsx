import { Head, usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Group, Button, Modal, Grid, Text, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteDialog from '@/Components/DefaultForms/DeleteDialog';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal } from '@/Components';
import RoleForm from './RoleForm';

export default function RolePage() {
    const { roles }: any = usePage<PageProps>().props;

    const [addModalOpened, setAddModalOpened] = useState(false);
    const [modelModalOpened, setModelModalOpened] = useState(false);
    const [eModelModalOpened, setEModelModalOpened] = useState(false);
    const [role, setRole] = useState<any>();
    const [permissions, setPermissions] = useState<any>([]);
    const [model, setModel] = useState<any>();
    const [deleteBrandModal, setDeleteBrandModal] = useState<any>();
    const [deleteModelModal, setModelDeleteModal] = useState<any>();

    useEffect(() => {
        console.log('refresh');
        if (!role) {
            setPermissions(null)
            return;
        };

        console.log('before ajax', role);
        axios.get(route('permission.ajax', { role_id: role.id })).then((response) => {
            const data = response.data.data.map((data: any) => data);
            setPermissions(data);
            console.log('refresh ajax', data);

        });
        console.log('after ajax', role);
    }, [role, eModelModalOpened, modelModalOpened, deleteBrandModal, deleteModelModal])

    const onEdit = (role: any) => {
        setRole(role);
    }

    const onModelEdit = (model: any) => {
        setModel(model);
        setEModelModalOpened(true);
    }

    const afterSubmitModel = () => {
        setModelModalOpened(false);
        setEModelModalOpened(false);
    }

    const onBrandDelete = (brand: any) => {
        setRole(brand);
        setDeleteBrandModal(true);
    }

    const onModelDelete = (model: any) => {
        setModel(model);
        setModelDeleteModal(true);
    }

    // const confirmDeleteBrand = () => {
    //     console.log('confirmDeleteBrand', role);
    //     router.delete(
    //         route('brand.destroy', role.id),
    //         {
    //             onSuccess: () => {
    //                 setDeleteBrandModal(false)
    //                 setRole(null);
    //             }
    //         });
    // }

    // const confirmDeleteModel = () => {
    //     router.delete(
    //         route('model.destroy', model.id),
    //         {
    //             onSuccess: () => {
    //                 setModelDeleteModal(false)
    //                 setModel(null);
    //             }
    //         });
    // }

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'description': value.description,
                'name': value.name,
                'permissions': <Group gap={3}>
                    {value.permissions ? value.permissions.map((e: any) => <Badge size='xs' color='gray.6' tt='none'>{e.description ? e.description : e.name}</Badge>) : ''}
                </Group>,
                'action':
                    <>
                        <Group justify='right'>
                            <UpdateButtonModal title='Update Role' >
                                <RoleForm values={value} />
                            </UpdateButtonModal>
                        </Group>
                    </>
            });
        })
        return values;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    return (
        <>
            {/* <DeleteDialog opened={deleteBrandModal} setModal={setDeleteBrandModal} onConfirm={confirmDeleteBrand}></DeleteDialog>
            <DeleteDialog opened={deleteModelModal} setModal={setModelDeleteModal} onConfirm={confirmDeleteModel}></DeleteDialog> */}

            <AppCard title='Roles' rightComponent={<AddButtonModal title='Add Role' ><RoleForm /></AddButtonModal>}>
                <AppTable headerOptions={headerOptions} data={tableData(roles.data)} meta={roles.meta} />
            </AppCard>
            <Grid>
                <Grid.Col span={6}>

                </Grid.Col>
                <Grid.Col span={6}>
                    {/* {!!brand && !!models &&
                        <AppCard title={'Edit ' + brand.name} >
                            <ConfigFormAdd route={route('brand.update', brand ? brand.id : null)} values={brand} close={() => setBrand(null)} />
                            <Group position='apart' my='xl'>
                                <Text size="lg">{brand.name} Models</Text>
                                <Button leftIcon={<IconPlus />} onClick={() => setModelModalOpened(true)} color='green' >
                                    Create New
                                </Button>
                            </Group>
                            <AppTable data={models} header={['code', 'name']} onEdit={onModelEdit} onDelete={onModelDelete}>

                            </AppTable>
                        </AppCard>
                    } */}
                </Grid.Col>
            </Grid>

        </>
    );
}

RolePage.layout = (page: any) => <AdminLayout children={page} title='Manage Role' />;
