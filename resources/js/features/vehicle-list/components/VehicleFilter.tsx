import { Paper, Flex, Text, Group, Stack, Input, Box } from "@mantine/core";
import { useState, useEffect } from "react";
import AppSelect from "@/Components/Forms/AppSelect";
import { IconSearch } from "@tabler/icons-react";
import axios from 'axios';
import { useUpdateEffect } from 'react-use';
import { useDebouncedValue } from '@mantine/hooks';

function VehicleFilter({ onFilter, title = true, advanced = false }: any) {

    const marks = [
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
    ];
    const [yearRange, setYearRange] = useState();
    const [brands, setBrands] = useState();
    const [colors, setColors] = useState();

    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebouncedValue(search, 500);

    const [priceMin, setPriceMin] = useState('');
    const [debouncedPriceMin] = useDebouncedValue(priceMin, 500);
    const [priceMax, setPriceMax] = useState('');
    const [debouncedPriceMax] = useDebouncedValue(priceMax, 500);

    const [brandCode, setBrandCode] = useState();
    const [colorCode, setColorCode] = useState();
    const [year, setYear] = useState();

    useUpdateEffect(() => {

        onFilter({
            search: debouncedSearch,
            brandCode,
            colorCode,
            year,
            priceMin: debouncedPriceMin,
            priceMax: debouncedPriceMax,
        });

    }, [debouncedSearch, brandCode, colorCode, year, debouncedPriceMax, debouncedPriceMin])

    useEffect(() => {
        setYearRange(getYearRange());

        axios.get(route('brand.ajax')).then((response) => {
            setBrands(response.data.data);
        });
        axios.get(route('color.ajax')).then((response) => {
            setColors(response.data.data);
        });

    }, [])

    const getYearRange: any = () => {
        const start = (new Date()).getFullYear();
        const stop = 30;
        const step = -1;
        return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step)).map((year: any) => {
            return {
                label: year,
                value: year,
            }
        })
    };

    return (
        <>
            {true && <Stack gap="xs" >
                {title && <Text fz='lg' fw='bold'>Search Car</Text>}
                <Group mb='sm'>
                    <Input
                        // icon={<IconSearch />}
                        placeholder="Search by stock, chassis or specifications"
                        w={350}
                        mt='sm'
                        onChange={(e: any) => { setSearch(e.target.value); }} value={search}
                    />
                    {/* <AppSelect id='brand_code' placeholder='Brand' data={brands} onChange={(e: any) => { setBrandCode(e.target.value); }} value={brandCode} />
                    <AppSelect id='color_code' placeholder='Color' data={colors} onChange={(e: any) => { setColorCode(e.target.value); }} value={colorCode} />
                    <AppSelect
                        id='year'
                        placeholder="Year"
                        data={yearRange}
                        onChange={(e: any) => { setYear(e.target.value); }} value={year}
                    /> */}
                </Group>
                <Group >
                    <Box>
                        <Text fz="sm" mb={5}>Price:</Text>
                        <Group>
                            <Input
                                placeholder="Min"
                                w={100}
                                onChange={(e: any) => { setPriceMin(e.target.value); }}
                            />
                            <Input
                                placeholder="Max"
                                w={100}
                                onChange={(e: any) => { setPriceMax(e.target.value); }}
                            />
                        </Group>
                    </Box>
                </Group>
            </Stack>
            }
        </>
    );
}

export default VehicleFilter;