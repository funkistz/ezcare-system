import { AppSelect, AppSegmentControl, AppInput } from '@/Components'
import { router, useForm, usePage } from '@inertiajs/react';
import { Stack, Flex, Card, Group, Text } from '@mantine/core'
import { useDebouncedState, useDidUpdate } from '@mantine/hooks';
import moment, { Moment } from 'moment';
import React, { useEffect, useRef, useState } from 'react'

export default function InspectionFilter({ types }: any) {

    const { permissions, branches }: any = usePage().props;

    const [dateList, setDateList] = useState<any>([]);
    const [currentDate, setCurrentDate] = useState(moment());
    const ref = useRef<any>(null);
    let query: any = usePage().props.ziggy;
    query = query.query;

    console.log('types', types)

    const { data, setData, post, put, reset, errors } = useForm({
        type: query.type ? query.type : types[0].value,
        date: query.date ? query.date : '',
        branch: query.branch ? query.branch : '',
        search: query.search ? query.search : '',
    });
    const [search, setSearch] = useDebouncedState(query.search ? query.search : '', 200);

    useDidUpdate(() => {
        setData('search', search);
    }, [search])

    useDidUpdate(() => {
        setData('date', currentDate);
    }, [currentDate])

    useDidUpdate(() => {

        const newData = { ...data };
        newData.date = data.date ? moment(data.date).format('YYYY-MM-DD') : null;

        router.reload({
            data: newData,
            preserveState: true
        });

    }, [data]);

    useEffect(() => {
        const dateList = generateDateList(currentDate);
        setDateList(dateList);
    }, [])
    useEffect(() => {
        if (ref) {
            ref.current.scrollLeft = 1000;
        }
    }, [dateList])

    const generateDateList = (currentDate: Moment) => {

        const startDate = currentDate.clone().subtract(30, 'days');
        const endDate = currentDate.clone().add(2, 'days');
        const dates = [];

        while (startDate.isSameOrBefore(endDate)) {
            dates.push(startDate.clone());
            startDate.add(1, 'days');
        }
        return dates;
    }

    return (
        <>
            <Stack gap={0}>
                <Flex direction='row' style={{ overflow: 'scroll' }} gap={10} px={10} pb={5} align='center' ref={ref} py={20}>
                    {
                        dateList.map((date: any, index: any) => {
                            return (<Card key={index} w={70} miw={70} h={70} withBorder radius='lg' p={15}
                                bg={(currentDate.format('D/M/YYYY') == date.format('D/M/YYYY')) ? 'primary' : ''}
                                onClick={() => { setCurrentDate(date) }}
                            >
                                <Stack justify='center' align='center' gap={0}>
                                    <Text fw='bolder' fz={20} lh={1} c={(currentDate.format('D/M/YYYY') == date.format('D/M/YYYY')) ? 'white' : ''}>{date.format('D')}</Text>
                                    <Text fz={16} lh={1} c={(currentDate.format('D/M/YYYY') == date.format('D/M/YYYY')) ? 'white' : ''}>{date.format('ddd')}</Text>
                                </Stack>
                            </Card>)
                        })
                    }
                </Flex>
                <Group gap='xl' grow align='start'>
                    <Group gap='md'>
                        <AppSelect label='Branch:' my={0} value={data.branch} data={branches} onChange={(e: any) => setData('branch', e)} />
                        <AppSegmentControl label='Type:' value={data.type} onChange={(e: any) => setData('type', e)} data={types} w={300} />
                        <AppInput label='Chassis:' my={0} value={data.search} onChange={(e: any) => setData('search', e.target.value)} />
                    </Group>

                    <Group gap={8} mt={30} justify='end' pr={20}>
                        <Text fz={20} fw='bold'>{currentDate.format('D')}</Text>
                        <Text fz={20} fw='bold'>{currentDate.format('MMM')}</Text>
                        <Text fz={20} fw='bold'>{currentDate.format('YYYY')}</Text>
                    </Group>
                </Group>
            </Stack>
        </>
    )
}
