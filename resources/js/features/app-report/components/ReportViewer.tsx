import cx from 'clsx';
import { useState, useMemo, useEffect } from 'react';
import { Table, ScrollArea, Text, Paper, Flex, Pagination, NativeSelect, Input, Tooltip, Button, Group } from '@mantine/core';
import classes from './AppTable.module.css';
import { router } from '@inertiajs/react';
import { useDidUpdate } from '@mantine/hooks';
import { IconSortAscending, IconSortDescending, IconArrowsSort, IconFileSpreadsheet } from '@tabler/icons-react';

const defaultHeaderOptions = {
    'action': { ta: 'right' }
}

export default function ReportViewer({ data, options, headerOptions = defaultHeaderOptions, children, height = 'auto', meta, canSort = [], searchPlaceholder = 'Search', filter }: any) {
    const queryParams = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState<any>((meta && meta.search) ? meta.search : '');
    const [perPage, setPerPage] = useState<any>((meta && meta.per_page) ? meta.per_page : 10);
    const [page, setPage] = useState<any>((meta && meta.current_page) ? meta.current_page : 1);
    const [sortBy, setSortBy] = useState<any>((meta && meta.sort_by) ? meta.sort_by : '');
    const [orderBy, setOrderBy] = useState<any>((meta && meta.order_by) ? meta.order_by : 'asc');


    console.log('meta', meta)

    const headers = useMemo(() => {
        return data[0] ? Object.keys(data[0]) : [];
    }, [data])

    const [scrolled, setScrolled] = useState(false);

    const rows = data.map((row: any, index: any) => (
        <Table.Tr key={index}>
            <Table.Td>{index + 1}.</Table.Td>
            {headers.map((header: any, index2) => {
                return <Table.Td key={index2} {...(headerOptions[header] ? headerOptions[header] : {})}>{row[header]}</Table.Td>;
            })}
        </Table.Tr>
    ));

    // useDidUpdate(() => {

    //     console.log('filter useDidUpdate', filter)

    //     if (!filter) {
    //         return
    //     }

    //     filter.forEach((filt: any) => {
    //         console.log('filt', filt)
    //         queryParams.set(filt.label, filt.value);
    //     });

    // }, [filter]);


    const handleOnChange = async () => {
        // setLoading(true)
        queryParams.set('page', page);
        queryParams.set('per_page', perPage);

        sortBy ? queryParams.set('sort_by', sortBy) : false;
        orderBy ? queryParams.set('order_by', orderBy) : false;
        search ? queryParams.set('search', search) : queryParams.delete('search');

        // console.log('search', search)

        if (filter) {
            // filter.forEach((filt: any) => {
            //     console.log('filt', filt)
            //     // queryParams.set(filt.label, filt.value);
            // });

            for (var key of Object.keys(filter)) {
                queryParams.set(key, filter[key]);
            }
        }

        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${queryParams}`;
        router.get(newUrl);
    }

    const onChangeSort = (column_name: any) => {
        if (sortBy == column_name) {
            setSortBy(column_name);
            setOrderBy((orderBy == 'asc') ? 'desc' : 'asc');
        } else {
            setSortBy(column_name);
            setOrderBy('asc');
        }
    }

    // console.log('meta', meta)

    useDidUpdate(() => {

        handleOnChange();

    }, [page, perPage, sortBy, orderBy, filter])

    const onSearch = (e: any) => {
        e.preventDefault();
        handleOnChange();
    }

    const exportExcel = () => {
        queryParams.set('type', 'export');
        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${queryParams}`;
        window.open(newUrl, '_blank');
    }

    return (
        // <Paper shadow="xs" radius="xs" p="xl">
        <>
            {meta && <Flex justify={'space-between'} my={10}>
                <Flex gap={10}>
                    <Group gap={2}>
                        <Text size={'xs'} pt={3}>Show</Text>
                        <NativeSelect
                            data={['5', '10', '20', '50', '100']}
                            value={meta.per_page.toString()}
                            onChange={(e) => { console.log('e per_page', e); setPerPage(Number(e.target.value)) }}
                            mx={5}
                            w={70}
                            size='xs'
                        />
                        <Text size={'xs'}>entries</Text>
                    </Group>
                    <Button size={'xs'} ml={20} bg='green.9' leftSection={<IconFileSpreadsheet stroke={0.8} />} onClick={exportExcel}>Export</Button>
                </Flex>
                <Flex>
                    <form onSubmit={onSearch}>
                        <Tooltip label="Click enter to search">
                            <Input
                                placeholder={searchPlaceholder}
                                size='sm'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                radius={'xl'}
                                style={{ marginLeft: '10px', borderTopLeftRadius: '0px !important', borderBottomLeftRadius: 25 }}
                                w={250}
                            />
                        </Tooltip>
                    </form>
                </Flex>
            </Flex>}
            <ScrollArea h={height} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table highlightOnHover {...options} >
                    <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                        <Table.Tr>
                            <Table.Th w={50}>#</Table.Th>
                            {headers.map((header: any, index: any) => {

                                const canSortColumn = canSort.find((e: any) => e.label === header);

                                return <Table.Th key={index} tt="capitalize" {...(headerOptions[header] ? headerOptions[header] : {})} >
                                    {/* {header} */}
                                    <Flex justify={'space-between'} align={'center'} onClick={() => canSortColumn ? onChangeSort(canSortColumn.value) : null}>
                                        <Text fz={13} pr={5} fw={'bold'} {...(headerOptions[header] ? headerOptions[header] : {})}>{header}</Text>
                                        {canSortColumn ?
                                            <>
                                                {/* {orderBy ? <IconSortAscending size="1rem" /> : <IconSortDescending size="1rem" />} */}
                                                {(sortBy && sortBy == canSortColumn.value) ? <>
                                                    {(orderBy == 'asc') ? <IconSortAscending size="1rem" /> : <IconSortDescending size="1rem" />}
                                                </> :
                                                    <>
                                                        <IconArrowsSort size="1rem" />
                                                    </>}

                                            </> :
                                            <>
                                                {/* <IconArrowsSort size="1rem" /> */}
                                            </>}
                                    </Flex>
                                </Table.Th>;
                            })}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {children ? children : rows}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
            {meta && <Flex justify={'space-between'} my={20}>
                <Text fz={14}>Showing {meta.from} to {meta.to} of {meta.total} entries</Text>
                <Pagination
                    total={meta.last_page}
                    color='green'
                    size={'md'}
                    withEdges
                    siblings={2}
                    boundaries={4}
                    defaultValue={Number(meta.current_page)}
                    onChange={(e: any) => setPage(Number(e))}
                />
            </Flex>}
        </>
        // </Paper>
    );
}
