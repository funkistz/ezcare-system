import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, SimpleGrid, Button, Paper, ThemeIcon, Group, Divider, ScrollArea, Flex, Card, Table, List } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1, EzGetQuotation, EzCoverage } from '@/features/app-blog';
import { EzHeroTitle } from '@/features/app-blog/componenst/EzHeroTitle';
import classes from './OurProducts.module.css';
import { ContactIconsList } from './ContactIcons';
import { IconArrowRight, IconCar, IconCheck, IconFileCertificate, IconSignRight } from '@tabler/icons-react';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function OurProduct() {

    const { banners }: any = usePage<PageProps>().props;
    const { t } = useLaravelReactI18n();

    const ItemWrapper = ({ label }: any) => {

        return <Group>
            <ThemeIcon color='lime' size='sm'>
                <IconCheck color='white' />
            </ThemeIcon>
            <Text fz='md'>{label}</Text>
        </Group>

    }

    const PlanWrapper = ({ label1, label2, items, color }: any) => {

        return <Paper className={classes.wrapperColor1} mt={40} shadow='xl' style={{ borderColor: '#ccc' }}>
            <ThemeIcon variant='transparent' size={130} pos={'absolute'} top={20} right={30} opacity={0.2} color={'black'}>
                <IconFileCertificate size={130} />
            </ThemeIcon>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
                <div>
                    <Group>
                        <Title className={classes.title} c={color} size={10}>{label1}</Title>
                    </Group>
                    <Text className={classes.description} mt="sm" fz={25} mb={30} pb={5} style={{ borderBottom: '2px solid #666' }} w={'80%'}>
                        {label2}
                    </Text>
                    <Button color={'orange'} radius={'md'} rightSection={<IconArrowRight />}>Get a FREE Quote</Button>
                </div>
                <Stack gap={5}>
                    <Text className={classes.description} fz={25}>
                        Coverage Items
                    </Text>
                    <Stack mt={20} gap={10}>
                        {items.map((item: any) => {
                            return <ItemWrapper label={item} />
                        })}
                    </Stack>
                </Stack>
            </SimpleGrid>
        </Paper>

    }

    const ItemRow = ({ label, checked, checked2 }: any) => {

        return <Table.Tr>
            <Table.Td w={'40%'} tt='uppercase' fw='bolder'>{label}</Table.Td>
            <Table.Td tt='uppercase' ta='center'>
                {checked && <ThemeIcon color='lime' size='sm' mt={5}>
                    <IconCheck color='white' />
                </ThemeIcon>}
            </Table.Td>
            <Table.Td tt='uppercase' ta='center'>
                {checked2 && <ThemeIcon color='lime' size='sm' mt={5}>
                    <IconCheck color='white' />
                </ThemeIcon>}
            </Table.Td>
        </Table.Tr>
    }

    const PlanWrapper2 = ({ label1, color, descriptionList, items, check1 }: { label1: string, color: string, descriptionList?: Array<any>, items: Array<any>, check1?: number }) => {

        return <Paper className={classes.wrapperColor1} p={'md'} mt={0} shadow='xl' withBorder style={{ borderColor: '#ccc' }} w={'100%'} ff='Lato' bg={'grape.0'}>
            <div>
                <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }} >
                    <Stack justify='flex-start' p={{ base: 'xs', sm: 'xs', lg: 'xl' }}>
                        <Text
                            w={350}
                            fz={32} fw={900} ff='Lato'
                            component="span"
                            inherit
                            c={'white'}
                            variant="gradient"
                            gradient={{ from: 'violet.6', to: 'orange.8' }}
                        >
                            {label1}
                        </Text>
                        <List size="xl">
                            {descriptionList && descriptionList.map((description: any) => {
                                return <List.Item>{description}</List.Item>
                            })
                            }
                        </List>
                        {descriptionList && <Button color={'orange'} radius={'md'} rightSection={<IconArrowRight />} maw={200} my={20}>Get a FREE Quote</Button>}
                    </Stack>
                    <Stack gap={5} mb={0} p={{ base: 'xs', sm: 'xs', lg: 'xl' }}>
                        <Card withBorder radius='xl' p='lg' shadow={'xs'}>
                            <Table>
                                {check1 && <Table.Tr>
                                    <Table.Td w={'40%'}></Table.Td>
                                    <Table.Td tt='uppercase'>
                                        <Text fw='bolder' ta='center'>Basic Plan</Text>
                                    </Table.Td>
                                    <Table.Td tt='uppercase'>
                                        <Text fw='bolder' ta='center'>Premier Plan</Text>
                                    </Table.Td>
                                </Table.Tr>
                                }
                                {items.map((item: any, index) => {
                                    return <ItemRow label={item} checked={check1 ? index < (check1) : false} checked2 />
                                })
                                }
                            </Table>
                        </Card>
                    </Stack>
                </SimpleGrid>
            </div>
        </Paper>

    }

    const PlanWrapper3 = ({ label1, color, description, items, check1 }: { label1: string, color: string, description?: any, items: Array<any>, check1?: number }) => {

        return <Paper className={classes.wrapperColor1} p={'md'} mt={0} shadow='xl' withBorder style={{ borderColor: '#ccc' }} w={'100%'} ff='Lato' bg={'grape.0'}>
            <div>
                <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }} >
                    <Stack justify='flex-start' p={{ base: 'xs', sm: 'xs', lg: 'xl' }}>
                        <Text
                            w={350}
                            fz={32} fw={900} ff='Lato'
                            component="span"
                            inherit
                            c={'white'}
                            variant="gradient"
                            gradient={{ from: 'violet.6', to: 'orange.8' }}
                        >
                            {label1}
                        </Text>
                        {description}
                    </Stack>
                    <Stack gap={5} mb={0} p={{ base: 'xs', sm: 'xs', lg: 'xl' }}>
                        <Card withBorder radius='xl' p='lg' shadow={'xs'}>
                            <Table>
                                {check1 && <Table.Tr>
                                    <Table.Td w={'40%'}></Table.Td>
                                    <Table.Td tt='uppercase'>
                                        <Text fw='bolder' ta='center'>Basic Plan</Text>
                                    </Table.Td>
                                    <Table.Td tt='uppercase'>
                                        <Text fw='bolder' ta='center'>Premier Plan</Text>
                                    </Table.Td>
                                </Table.Tr>
                                }
                                {items.map((item: any, index) => {
                                    return <ItemRow label={item} checked={check1 ? index < (check1) : false} checked2 />
                                })
                                }
                            </Table>
                        </Card>
                    </Stack>
                </SimpleGrid>
            </div>
        </Paper>

    }

    const autoplay = useRef(Autoplay({ delay: 3000 }));
    const SectionTitle = ({ label, label2 }: any) => {
        return (<Stack mb={40} justify='center'>
            <Text fw={900} fz={{ base: 35, sm: 35, lg: 40 }} variant="gradient" gradient={{ from: 'violet.7', to: 'orange.5' }} ta='center' lh={1.2}>
                {label}
            </Text>
            {label2 && <Text fw={900} fz={{ base: 35, sm: 35, lg: 40 }} variant="gradient" gradient={{ from: 'violet.7', to: 'orange.5' }} ta='center' lh={0.8}>
                {label2}
            </Text>}
        </Stack>)
    }

    return (
        <>
            <Head title='Ezcare' />

            <EzHeroTitle title={'Warranty Plan'}
                description={t('op_2')}
            // image={'/images/banner/3cars.png'}
            />

            <Container size={'xl'} mt={40}>

                <Stack align='start' gap={50}>
                    <PlanWrapper2 color='#7048E8'
                        label1='PROGRAM GARANSI MOBIL BARU IMPOR'
                        items={['Engine', 'Transmission', 'ECU', 'Stering Mechanism', 'Braking System', 'Air Conditioning', 'Turbo', 'Supercharger', 'Fuel Sytem', 'Electrical Components', 'Cooling System', 'Ignition System', 'Rear Axle', 'Front Wheel & 4 Wheel Drive', 'Major Oil Leaks (Labour Only)']}
                        check1={8}
                        descriptionList={['Tanpa Batas Jarak KM', 'Tanpa Batas Klaim', 'Bebas Pilih Bengkel', 'Proces Klaim Yang Cepat', 'Gratis Layanan Towing & Derek 24/7', 'Lebih Dari 80 Komponen Utama Dilindungi', 'Akses Mudah Info Polis Melalui Aplikasi Seluler']}
                    />
                    <PlanWrapper2 color='#7048E8'
                        label1='PROGRAM GARANSI MOBIL BEKAS'
                        items={['Engine', 'Transmission', 'ECU', 'ECM', 'Turbo', 'Supercharger', 'Fuel Sytem', 'Braking System', 'Air Conditioning', 'Stering Mechanism']}
                        check1={4}
                        descriptionList={['Tanpa Batas Jarak KM', 'Tanpa Batas Klaim', 'Bebas Pilih Bengkel', 'Proces Klaim Yang Cepat', 'Gratis Layanan Towing & Derek 24/7', 'Lebih Dari 70 Komponen Utama Dilindungi', 'Akses Mudah Info Polis Melalui Aplikasi Seluler']}
                    />
                    <PlanWrapper2 color='#7048E8'
                        label1='PROGRAM GARANSI SUPERCAR'
                        items={['Engine', 'Transmission', 'ECU', 'Stering Mechanism', 'Braking System', 'Air Conditioning', 'Turbo', 'Supercharger', 'Fuel Sytem', 'Electrical Components', 'Cooling System', 'Ignition System', 'Rear Axle', 'Front Wheel & 4 Wheel Drive', 'Major Oil Leaks (Labour Only)']}
                        descriptionList={['Tanpa Batas Jarak KM', 'Tanpa Batas Klaim', 'Bebas Pilih Bengkel', 'Proces Klaim Yang Cepat', 'Gratis Layanan Towing & Derek 24/7', 'Lebih Dari 80 Komponen Utama Dilindungi', 'Akses Mudah Info Polis Melalui Aplikasi Seluler']}
                    />
                    <PlanWrapper3 color='#7048E8'
                        label1='OPTIONAL COVERAGE HYBRID'
                        // description={
                        //     <Stack gap={0}>
                        //         <Text fz={20}>Battery Retention Must Atleast 70% Of Health</Text>
                        //         <Text fs='italic' fw={200} fz={14}>(Term & Condition Apply)</Text>
                        //     </Stack>
                        // }
                        items={['High Voltage Battery', 'Electric Motor', 'Inverter']}
                    // descriptionList={['Tanpa Batas Jarak KM', 'Tanpa Batas Klaim', 'Bebas Pilih Bengkel', 'Proces Klaim Yang Cepat', 'Gratis Layanan Towing & Derek 24/7', 'Lebih Dari 70 Komponen Utama Dilindungi', 'Akses Mudah Info Polis Melalui Aplikasi Seluler']}
                    />
                    {/* <PlanWrapper2 color='#7048E8' label1='EZ B - PREMIER PLAN' label2='Used Vehicle' items={['Engine', 'Transmission', 'ECU', 'ECM', 'Turbo', 'Supercharger', 'Fuel System', 'Braking System', 'Air Conditioning', 'Steering Rack']} />
                    <PlanWrapper2 color='#228BE6' label1='EZ A - BASIC PLAN' label2='Reconditioned Vehicle' items={['Engine', 'Transmission', 'ECU', 'Steering Mechanism', 'Braking System', 'Air Conditioning​', 'Turbo', 'Supercharger']} />
                    <PlanWrapper2 color='#7048E8' label1='EZ B - PREMIER PLAN' label2='Reconditioned Vehicle' items={['Engine', 'Transmission', 'ECU',
                        'Fuel System', 'Steering Mechanism', 'Braking System', 'Air Conditioning', 'Electrical Components', 'Cooling System', 'Ignition System', 'Rear Axle', 'Front Wheel & 4-Wheels Drive', 'Turbo', 'Supercharger', 'Major Oil Leaking (Labour Only)']} />
                    <PlanWrapper2 color='#7048E8' label1='EZ B - PREMIER PLAN' label2='Reconditioned Vehicle' items={['Engine', 'Transmission', 'ECU',
                        'Fuel System', 'Steering Mechanism', 'Braking System', 'Air Conditioning', 'Electrical Components', 'Cooling System', 'Ignition System', 'Rear Axle', 'Front Wheel & 4-Wheels Drive', 'Turbo', 'Supercharger', 'Major Oil Leaking (Labour Only)']} />

                    <PlanWrapper2 color='#7048E8' label1='EZ B - PREMIER PLAN' label2='Reconditioned Vehicle' items={['Engine', 'Transmission', 'ECU',
                        'Fuel System', 'Steering Mechanism', 'Braking System', 'Air Conditioning', 'Electrical Components', 'Cooling System', 'Ignition System', 'Rear Axle', 'Front Wheel & 4-Wheels Drive', 'Turbo', 'Supercharger', 'Major Oil Leaking (Labour Only)']} /> */}
                </Stack>

                <Box py={80} mt={80}>
                    <Group justify='center'>
                        <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }} mb={40}>
                            {/* <Card radius="xl" style={{ overflow: 'hidden', }} p={0} mx={{ base: 10, sm: 10, lg: 40 }}>
                                <Image
                                    radius="xl"
                                    src="/images/mechanic_EZC07126.jpeg"
                                />
                            </Card> */}
                            <Carousel
                                mx={{ base: 10, sm: 10, lg: 40 }}
                                withIndicators
                                plugins={[autoplay.current]}
                                onMouseEnter={autoplay.current.stop}
                                onMouseLeave={autoplay.current.reset}
                                loop
                            >
                                <Carousel.Slide>
                                    <Image src={'/images/banner/EZC06837.JPG'} />
                                </Carousel.Slide>
                                <Carousel.Slide>
                                    <Image src={'/images/banner/EZC06782.JPG'} />
                                </Carousel.Slide>
                                <Carousel.Slide>
                                    <Image src={'/images/banner/EZC07122.JPG'} />
                                </Carousel.Slide>
                                <Carousel.Slide>
                                    <Image src={'/images/banner/EZC02686.JPG'} />
                                </Carousel.Slide>
                                <Carousel.Slide>
                                    <Image src={'/images/banner/EZC02690.JPG'} />
                                </Carousel.Slide>
                            </Carousel>
                            <Stack gap={0} ml={{ base: 20, sm: 20, lg: 0 }}>
                                <Text fw={'bolder'} fz={60} variant="gradient"
                                    gradient={{ from: 'violet.6', to: 'orange.8' }}>{t('op_3')}</Text>
                                <Text fw={'bolder'} fz={60} >{t('op_4')}</Text>
                            </Stack>

                        </SimpleGrid>
                        <Text ta='justify' fz={25} px={30} style={{ wordBreak: 'keep-all' }}>
                            {t('op_5')}
                        </Text>
                    </Group>


                </Box>

                <Box py={80} mt={0} >
                    <Group justify='center'>
                        <Stack gap={0} mb={40}>
                            <Text fw={'bolder'} fz={60} variant="gradient"
                                gradient={{ from: 'violet.6', to: 'orange.8' }}>{t('op_6')}</Text>
                        </Stack>
                        <SimpleGrid spacing={20} cols={{ base: 1, sm: 1, lg: 2 }}>
                            <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={0}>
                                <Container size="xl">
                                    <Box p="md">
                                        <SectionTitle label={t('op_7')} />
                                        <Text fw={'normal'} mb={10} fz={20} style={{ wordBreak: 'keep-all' }} ta='justify'>
                                            {t('op_8')}
                                        </Text>
                                    </Box>
                                </Container>
                            </Paper>
                            <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={0}>
                                <Container size="xl">
                                    <Box p="md">
                                        <SectionTitle label={t('op_9')} />
                                        <Text fw={'normal'} mb={10} fz={20} style={{ wordBreak: 'keep-all' }} ta='justify'>
                                            {t('op_10')}
                                        </Text>
                                    </Box>
                                </Container>
                            </Paper>
                            <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={0}>
                                <Container size="xl">
                                    <Box p="md">
                                        <SectionTitle label={t('op_11')} />
                                        <Text fw={'normal'} mb={10} fz={20} style={{ wordBreak: 'keep-all' }} ta='justify'>
                                            {t('op_12')}
                                        </Text>
                                    </Box>
                                </Container>
                            </Paper>
                            <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={0}>
                                <Container size="xl">
                                    <Box p="md">
                                        <SectionTitle label={t('op_13')} />
                                        <Text fw={'normal'} mb={10} fz={20} style={{ wordBreak: 'keep-all' }} ta='justify'>
                                            {t('op_14')}
                                        </Text>
                                    </Box>
                                </Container>
                            </Paper>
                        </SimpleGrid>

                    </Group>


                </Box>

            </Container>

            {/* <Group mt={10} justify='center' gap={30}>
                <Card shadow='lg' p='lg' w={300} radius='xl' withBorder h={450}>
                    <Image
                        src="/images/features/nationwidecoverage.png"
                        width={'100%'}
                        p={50}
                    />
                    <Text ta='center' fw={'bolder'} fz={18} mt={20}>Nationwide Coverage</Text>
                    <Text ta='center' mt={10} lh={1.3}>Our warranty programs provide full coverage in Malaysia.</Text>
                </Card>
                <Card shadow='lg' p='lg' w={300} radius='xl' withBorder h={450}>
                    <Image
                        src="/images/features/hasslefree.png"
                        width={'100%'}

                        p={50}
                    />
                    <Text ta='center' fw={'bolder'} fz={18} mt={20}>Hassle Free</Text>
                    <Text ta='center' mt={10} lh={1.3}>We provide better coverage for replacement parts based on convenience when a claim is made.</Text>
                </Card>
                <Card shadow='lg' p='lg' w={300} radius='xl' withBorder h={450}>
                    <Image
                        src="/images/features/hasslefree.png"
                        width={'100%'}

                        p={50}
                    />
                    <Text ta='center' fw={'bolder'} fz={18} mt={20}>Peace of Mind</Text>
                    <Text ta='center' mt={10} lh={1.3}>We assist our customers to provide assurance that the purchased vehicle is protected in the event of product failure.</Text>
                </Card>
                <Card shadow='lg' p='lg' w={300} radius='xl' withBorder h={450}>
                    <Image
                        src="/images/features/claim.png"
                        width={'100%'}

                        p={50}
                    />
                    <Text ta='center' fw={'bolder'} fz={18} mt={20}>Unlimited Claims</Text>
                    <Text ta='center' mt={10} lh={1.3}>We offer an unlimited claims and unlimited mileage coverage within the warranty period.

                    </Text>
                </Card>
            </Group> */}



            {/* <WAFloatingButton /> */}
        </>
    );
}

OurProduct.layout = (page: any) => <Guestlayout children={page} />;
