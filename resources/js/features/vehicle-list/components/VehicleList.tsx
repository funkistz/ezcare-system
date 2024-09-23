import React, { useState } from 'react'
import VehicleFilter from './VehicleFilter';
import { Box, Paper, Group, ActionIcon, Stack, SimpleGrid, Title, Text } from '@mantine/core';
import { IconLayoutGrid, IconListDetails } from '@tabler/icons-react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, router } from '@inertiajs/react';
import VehiclePreviewBox from '@/Components/Vehicle/VehiclePreviewBox';
import VehiclePreview from '@/Components/Vehicle/VehiclePreview';

export default function VehicleList() {

    const { vehicles }: any = usePage<PageProps>().props;
    const [viewBy, setViewBy] = useState('grid');

    const onFilter = (filter: any) => {

        console.log('filtering', filter);

        router.reload({
            data: {
                'search': filter.search,
                'brand_code': filter.brandCode,
                'color_code': filter.colorCode,
                'year': filter.year,
                'priceMin': filter.priceMin,
                'priceMax': filter.priceMax,
            },
            preserveState: true
        });

    }
    return (
        <>
            <Box mb={40} style={{ zIndex: 999 }}>
                <Paper p='lg' w='100%' shadow='xl' radius='lg'>
                    <Title order={2} size="h1">Find Your Car</Title>
                    <Group>
                        <VehicleFilter title={false} onFilter={onFilter} />
                    </Group>
                    <Group >
                        <ActionIcon color="blue" size="lg" variant={viewBy == 'grid' ? 'filled' : 'outline'} onClick={() => setViewBy('grid')}>
                            <IconLayoutGrid size="1.625rem" />
                        </ActionIcon>
                        <ActionIcon color="blue" size="lg" variant={viewBy == 'list' ? 'filled' : 'outline'} onClick={() => setViewBy('list')}>
                            <IconListDetails size="1.625rem" />
                        </ActionIcon>
                    </Group>
                </Paper>
            </Box>
            {vehicles.length > 0 && <Text size='xl' mb='sm'>{vehicles.length} result(s)</Text>}
            {vehicles.length == 0 && <Text size='xl' mb='sm'>No result found</Text>}
            <Stack justify="flex-start">
                {viewBy == 'grid' &&
                    <SimpleGrid cols={4} >
                        {vehicles && vehicles.map((vehicle: any, index: any) => {
                            return <VehiclePreviewBox key={index} vehicle={vehicle} />
                        })}
                    </SimpleGrid>
                }
                {viewBy == 'list' &&
                    <Stack>
                        {vehicles && vehicles.map((vehicle: any, index: any) => {
                            return <VehiclePreview key={index} vehicle={vehicle} />
                        })}
                    </Stack>
                }
            </Stack>
        </>
    )
}
