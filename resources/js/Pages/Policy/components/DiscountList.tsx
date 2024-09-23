import { AddButtonModal, AppPrice, AppTable, DeleteButton, HasPermission } from '@/Components'
import { router, usePage } from '@inertiajs/react';
import moment from 'moment';
import React from 'react'
import { Alert, Group, Stack, Text } from '@mantine/core';
import DiscountForm from './DiscountForm';
import FreePromoForm from './FreePromoForm';
import CoverageForm from './CoverageForm';

export default function DiscountList({ policy }: { policy: any }) {

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'name': <Text tt='capitalize' fz={14}>{value.name}</Text>,
                'amount': <Text tt='uppercase' fz={14}><AppPrice price={value.pivot.amount} /></Text>,
                'action': <Group justify='end'>
                    <HasPermission permission='policy.edit' author={policy.created_by}>
                        <DeleteButton onDelete={() => onDeleteDiscount(value.id)} />
                    </HasPermission>
                </Group>
            });
        })
        return values;
    }

    const onDeleteDiscount = (id: any) => {
        router.delete(route('policy.deleteDiscount', policy.id), {
            data: {
                discount_id: id
            },
        });
    }
    const onDeleteFreePromo = (id: any) => {
        router.delete(route('policy.deleteFreePromo', policy.id), {
            data: {
                free_promo_id: id
            },
        });
    }
    const onDeleteCoverage = (id: any) => {
        router.delete(route('policy.deleteCoverage', policy.id), {
            data: {
                coverage_id: id
            },
        });
    }

    const tableDataPromo = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'name': <Text tt='capitalize' fz={14}>{value.name}</Text>,
                'amount': <Text tt='capitalize' fz={14}>{value.real_amount}</Text>,
                'action': <Group justify='end'>
                    <HasPermission permission='policy.edit' author={policy.created_by}>
                        <DeleteButton onDelete={() => onDeleteFreePromo(value.id)} />
                    </HasPermission>
                </Group>
            });
        })
        return values;
    }
    const headerOptions = {
        'image': { w: 200 },
        'action': { ta: 'right' }
    }

    const tableDataCoverage = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'name': <Text tt='capitalize' fz={14}>{value.name}</Text>,
                'price': <Text tt='capitalize' fz={14}>{value.price}</Text>,
                'dealer price': <Text tt='capitalize' fz={14}>{value.dealer_price}</Text>,
                'period (year)': <Text tt='capitalize' fz={14}>{value.pivot.period}</Text>,
                'action': <Group justify='end'>
                    <HasPermission permission='policy.edit' author={policy.created_by}>
                        <DeleteButton onDelete={() => onDeleteCoverage(value.id)} />
                    </HasPermission>
                </Group>
            });
        })
        return values;
    }

    console.log('policy', policy)

    return (
        <>
            <Alert variant='light' color="red" radius="lg" title="Warning" >
                Payee will be reset after any action on this tab!
            </Alert>
            <Group justify='space-between' mt={25}>
                <Text>Add-On Coverages</Text>
                <HasPermission permission='policy.edit' author={policy.created_by} users={[policy.marketingOfficer?.id]}>
                    <AddButtonModal title='Add Coverage' label='Add Coverage'>
                        <CoverageForm policy={policy} />
                    </AddButtonModal>
                </HasPermission>
            </Group>
            <AppTable headerOptions={headerOptions} data={tableDataCoverage(policy.coverages)} />
            <Group justify='space-between' mt={20}>
                <Text>Discounts</Text>
                <HasPermission permission='policy.edit' author={policy.created_by} users={[policy.marketingOfficer?.id]}>
                    <AddButtonModal title='Add Discount' label='Add Discount'>
                        <DiscountForm policy={policy} />
                    </AddButtonModal>
                </HasPermission>
            </Group>
            <AppTable headerOptions={headerOptions} data={tableData(policy.discounts)} />
            <Group justify='space-between' mt={20}>
                <Text>Free Promos</Text>
                <HasPermission permission='policy.edit' author={policy.created_by} users={[policy.marketingOfficer?.id]}>
                    <AddButtonModal title='Add Free Promos' label='Add Free Promos'>
                        <FreePromoForm policy={policy} />
                    </AddButtonModal>
                </HasPermission>
            </Group>
            <AppTable headerOptions={headerOptions} data={tableDataPromo(policy.free_promos)} />
        </>
    )
}
