import cx from 'clsx';
import { useState, useMemo, useEffect } from 'react';
import { Table, ScrollArea, Text, Paper, Flex, Pagination, TextInput, Group, Button } from '@mantine/core';
import classes from './AppTable.module.css';
import { router } from '@inertiajs/react';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';

const defaultHeaderOptions = {
    'action': { ta: 'right' }
}

export default function AppTable({ data, meta, options, headerOptions = defaultHeaderOptions, children, height = 'auto', withSearch, searchPlaceholder }: any) {

    const queryParams: any = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState(queryParams.get('search') ? queryParams.get('search') : '')
    const [debouncedSearch] = useDebouncedValue(search, 400);

    // console.log('queryParams', queryParams.get('search'))

    const realData = Array.isArray(data) ? data : data.data;
    const pagination = !Array.isArray(data) ? true : false;

    const headers = useMemo(() => {

        // const heads = Object.keys(data[0]).map((head: any) => {
        //     return {
        //         label: head
        //     }
        // });


        return realData[0] ? Object.keys(realData[0]) : [];
    }, [realData])

    const [scrolled, setScrolled] = useState(false);

    const rows = (data: any) => {

        if (!data) {
            return <></>
        }

        return realData.map((row: any, index: any) => (
            <Table.Tr key={index}>
                <Table.Td>{index + 1}.</Table.Td>
                {headers.map((header: any, index2) => {
                    return <Table.Td key={index2} {...(headerOptions[header] ? headerOptions[header] : {})}>{row[header]}</Table.Td>;
                })}
            </Table.Tr>
        ))
    }

    const calPagination = () => {
        const result = meta.total / meta.per_page;

        if (result % 1) {
            return Math.floor(result) + 1;
        }

        return Number(result);
    }

    const handleOnChange = async (e: any, params: any) => {
        // setLoading(true)
        if (params) {
            queryParams.set(params, e);
        }

        // search will change page to 1
        if (params == "search") {
            queryParams.set('page', '1');
            if (e.length == 0) {
                queryParams.delete('search');
            }
        }

        if (params == "filter") {
            queryParams.set('filter', e);
            queryParams.set('page', '1');
        }

        // sort 
        // if (params == "sort") {
        //     queryParams.set('sort', e);
        //     queryParams.set('order', !orderBy ? 'asc' : 'desc');

        //     await setSort(e);
        // }

        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${queryParams}`;
        router.get(newUrl);
    }

    useDidUpdate(() => {
        console.log('debouncedSearch', debouncedSearch)
        // handleOnChange(debouncedSearch, 'search')
    }, [debouncedSearch])

    const onSearch = (e: any) => {
        e.preventDefault();
        handleOnChange(debouncedSearch, 'search')
    }

    return (
        <>
            {/* <ScrollArea h={height} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}> */}
            {withSearch && <form onSubmit={onSearch}>
                <Group gap={10} my={20}>

                    <TextInput
                        radius="xl"
                        placeholder={searchPlaceholder ? searchPlaceholder : "Search"}
                        miw={300}
                        value={search}
                        onChange={(e: any) => setSearch(e.target.value)}
                    />
                    <Button radius="xl" color='primary' type='submit'>Search</Button>
                </Group>
            </form>}

            <Table highlightOnHover {...options} >
                <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <Table.Tr>
                        <Table.Th w={50}>#</Table.Th>
                        {headers.map((header: any, index: any) => {
                            return <Table.Th key={index} tt="capitalize" {...(headerOptions[header] ? headerOptions[header] : {})}>
                                {header}
                            </Table.Th>;
                        })}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {children ? children : rows(realData)}
                </Table.Tbody>
            </Table>
            {meta && <Flex justify={'space-between'} my={20}>
                <Text fz={14}>Showing {meta.from} to {meta.to} of {meta.total} entries</Text>
                <Pagination
                    total={calPagination()}
                    color='green'
                    size={'md'}
                    withEdges
                    siblings={0}
                    boundaries={0}
                    defaultValue={Number(meta.current_page)}
                    onChange={(e: any) => handleOnChange(Number(e), 'page')}
                />
            </Flex>}
            {/* </ScrollArea> */}
        </>
    );
}