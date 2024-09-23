import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Group, Button, Modal, Grid, Image, Badge, ActionIcon, Text, Switch, Paper, Divider } from '@mantine/core';
import { IconPlus, IconArrowUp, IconArrowDown } from '@tabler/icons-react';
// import AppTable from '@/Components/AppTable';
import { useEffect, useMemo, useState } from 'react';
import DeleteDialog from '@/Components/DefaultForms/DeleteDialog';
import BannerForm from './form';
import UpdateButton from '@/Components/Buttons/UpdateButton';
import { Carousel } from '@mantine/carousel';
import BannerCarousell from '@/Components/Generals/BannerCarousell';
import AdminLayout from '@/Components/layout/AdminLayout';
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal } from '@/Components';


export default function Banner() {
    const { banners }: any = usePage<PageProps>().props;
    const [modalOpened, setModalOpened] = useState(false);
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [banner, setBanner] = useState<any>([]);
    const [deleteModal, setDeleteModal] = useState<any>();

    console.log('banners', banners.data);

    function CreateButton() {
        return (
            <Button leftSection={<IconPlus />} onClick={() => setModalOpened(true)} color='green'>
                Add New
            </Button>
        )
    }

    const onEdit = (brand: any) => {
        console.log('onEdit', brand);
        setBanner(brand);
    }

    const onModelEdit = (model: any) => {
        setBanner(model);
        setEditModalOpened(true);
    }

    const afterSubmitModel = () => {
        setModalOpened(false);
        setEditModalOpened(false);
    }

    const onDelete = (model: any) => {
        setBanner(model);
        setDeleteModal(true);
    }

    const confirmDelete = () => {
        router.delete(
            route('banner.destroy', banner.id),
            {
                onSuccess: () => {
                    setDeleteModal(false)
                    setBanner(null);
                }
            });
    }

    const onPositionChange = (banner: any, position: any) => {
        setBanner(banner);
        router.put('banner/' + banner.id + '/change_position', {
            position: position
        }, { preserveScroll: true });
    }

    const onChangeActive = (banner: any, is_active: any) => {
        setBanner(banner);
        router.put('banner/' + banner.id + '/change_active', {
            is_active: is_active
        }, { preserveScroll: true });
    }

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'image': <Image w={120} radius="md" src={value.image_url} alt="image" />,
                'name': value.name,
                'action':
                    <>
                        <Group justify='right'>
                            <Switch onLabel="Active" offLabel="Inactive" defaultChecked={value.is_active} size='md' onClick={() => { onChangeActive(value, !value.is_active) }} />
                            <UpdateButtonModal title='Update Branch'>
                                <BannerForm values={value} />
                            </UpdateButtonModal>
                            <Group gap={5}>
                                <ActionIcon color="dark.5" radius="xl" variant="filled" onClick={() => { onPositionChange(value, value.position - 1) }}>
                                    <IconArrowUp size="1.125rem" />
                                </ActionIcon>
                                <ActionIcon color="dark.5" radius="xl" variant="filled" onClick={() => { onPositionChange(value, value.position + 1) }}>
                                    <IconArrowDown size="1.125rem" />
                                </ActionIcon>
                            </Group>
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
            <AppCard title='Banners' rightComponent={<AddButtonModal title='Add Banner'><BannerForm /></AddButtonModal>}>
                <AppTable headerOptions={headerOptions} data={tableData(banners.data)} />
            </AppCard>
        </>
    );
}

Banner.layout = (page: any) => <AdminLayout children={page} title='Manage Desktop Banners' />;
