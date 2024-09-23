import React, { useEffect, useRef, useState } from 'react'
import moment, { Moment } from 'moment'
import { Box, Button, Group, Text, ActionIcon, Stack, Flex, Card, Divider, SimpleGrid, Center, SegmentedControl, Select, Badge, TextInput, Textarea } from '@mantine/core';
import { IconArrowLeft, IconBuildingStore, IconCalendar, IconCar, IconCarCrash, IconCertificate2, IconChevronLeft, IconChevronRight, IconClipboardText, IconDiscount2, IconMap2, IconMinus, IconPlus, IconRoad, IconUserCog, IconUserDollar } from '@tabler/icons-react';
import { useForm, usePage } from '@inertiajs/react';
import { AppDateTimePicker, AppInput, AppSelect, AppTextArea } from '@/Components';

const RejectForm = ({ transaction, closeModal }: any) => {

    const { data, setData, post, put, reset, errors } = useForm({
        id: transaction.id,
        remarks: '',
        status: 'rejected',
    });

    console.log('transaction', transaction)

    const onSubmit = async (e: any) => {
        e.preventDefault();

        put(route('approval.update', transaction.id), {
            data,
            onSuccess: () => {
                reset(),
                    closeModal()
            },
        });

    }

    return (
        <Box bg='white' h='100%'>
            <form onSubmit={onSubmit}>
                <Stack pb={30} gap={10}>
                    <AppTextArea required placeholder='Remarks' id='remarks' errors={errors} value={data.remarks} onChange={(e: any) => setData('remarks', e.target.value)} />

                    <Divider my={10} variant="dashed" />

                    <Button type='submit' size='sm' radius='md' color='red'>Reject</Button>
                </Stack>
            </form>
        </Box>
    );
};

export default RejectForm;