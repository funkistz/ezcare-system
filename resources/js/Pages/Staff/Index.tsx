import { Head, usePage, router, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Group, Button, Modal, Grid, Text, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteDialog from '@/Components/DefaultForms/DeleteDialog';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, DeleteButton, AppSelect } from '@/Components';
import StaffForm from './StaffForm';
import { useDidUpdate } from '@mantine/hooks';

export default function RolePage() {
    const { users, roles }: any = usePage<PageProps>().props;

    const [addModalOpened, setAddModalOpened] = useState(false);
    const [modelModalOpened, setModelModalOpened] = useState(false);
    const [eModelModalOpened, setEModelModalOpened] = useState(false);
    const [role, setRole] = useState<any>();
    const [permissions, setPermissions] = useState<any>([]);
    const [model, setModel] = useState<any>();
    const [deleteBrandModal, setDeleteBrandModal] = useState<any>();
    const [deleteModelModal, setModelDeleteModal] = useState<any>();

    console.log('users', users);

    let query: any = usePage().props.ziggy;
    query = query.query;

    const { data, setData, post, put, reset, errors } = useForm({
        role: query ? query.role : '',
    });

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

    useDidUpdate(() => {

        const newData = { ...data };

        router.reload({
            data: newData,
            preserveState: true
        });

    }, [data.role]);

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
                'name': value.name,
                'roles': <Group gap={3}>
                    {value.roles ? value.roles.map((e: any, index: any) => <Badge key={index} size='xs' color='gray.6' tt='none'>{e.description ? e.description : e.name}</Badge>) : ''}
                </Group>,
                'exclude MO report': value.is_exclude_report ? 'Yes' : 'No',
                'status': (value.active == 1) ? <Badge bg='green'>Active</Badge> : <Badge bg='red'>Inactive</Badge>,
                'action':
                    <>
                        <Group justify='right'>
                            <DeleteButton onDelete={() => onDelete(value.id)} />
                            <UpdateButtonModal title='Update Staff' size='xl'>
                                <StaffForm values={value} />
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

    const onDelete = (id: any) => {
        router.delete(route('staffs.destroy', id));
    }

    return (
        <>
            {/* <DeleteDialog opened={deleteBrandModal} setModal={setDeleteBrandModal} onConfirm={confirmDeleteBrand}></DeleteDialog>
            <DeleteDialog opened={deleteModelModal} setModal={setModelDeleteModal} onConfirm={confirmDeleteModel}></DeleteDialog> */}

            <AppCard title='Staff' rightComponent={<AddButtonModal title='Add Staffxx' ><StaffForm /></AddButtonModal>}>

                <Group>
                    <AppSelect label='Roles:' my={0} data={roles} value={data.role} onChange={(e: any) => setData('role', e)} />
                </Group>

                <AppTable headerOptions={headerOptions} data={tableData(users.data)} meta={users.meta} withSearch />
            </AppCard>

        </>
    );
}

RolePage.layout = (page: any) => <AdminLayout children={page} title='Manage Staff' />;
