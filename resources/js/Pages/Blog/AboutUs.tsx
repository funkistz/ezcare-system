import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, Affix, Button, Group, SimpleGrid, Paper, rem, BackgroundImage, List, Card } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1 } from '@/features/app-blog';
import classes from './ContactUs.module.css';
import { IconAt, IconPhone, IconMapPin, IconSun } from '@tabler/icons-react';
import { ContactIconsList } from './ContactIcons';
import { EzHeroTitle } from '@/features/app-blog/componenst/EzHeroTitle';
import {
    GooglePlayButton,
    AppGalleryButton,
    AppStoreButton,
    ButtonsContainer,
} from "react-mobile-app-button";
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function AboutUs() {

    const { t } = useLaravelReactI18n();

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

            <EzHeroTitle title={t('ab_1')}
                // image='/images/icon-512.webp'
                description={'Ezcare Warranty'} imageWidth={200} />

            <Container size={'xl'} mt={40} ff='Roboto'>

                <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={20}>
                    <Container size="xl" py={0} px={20}>
                        <Box py="lg">
                            <SectionTitle label={t('ab_3')} />

                            <Text fw={'normal'} mb={10} fz={20} ta='center' px={15}>
                                {t('ab_4')}
                            </Text>
                            <Text fw={'normal'} mb={10} fz={20} ta='center' px={15}>
                                {t('ab_5')}
                            </Text>
                        </Box>
                    </Container>
                </Paper>

                <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }}>
                    <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={20}>
                        <Container size="xl" py={0} px={20}>
                            <Box py="xl">
                                <SectionTitle label={t('ab_6')} label2={t('ab_6_1')} />

                                <Text fw={'normal'} mb={20} fz={20} ta='center' px={15}>
                                    {t('ab_7')}
                                </Text>
                                <Text fw={'normal'} mb={20} fz={20} ta='center' px={15}>
                                    {t('ab_8')}
                                </Text>
                            </Box>
                        </Container>
                    </Paper>

                    <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={20}>
                        <Container size="xl" py={0} px={20}>
                            <Box py="xl">
                                <SectionTitle label={t('ab_9')} />

                                <Text fw={'normal'} mb={20} fz={20} ta='center' px={15}>
                                    {t('ab_10')}
                                </Text>
                                <Text fw={'normal'} mb={20} fz={20} ta='center' px={15}>
                                    {t('ab_11')}
                                </Text>
                            </Box>
                        </Container>
                    </Paper>
                </SimpleGrid>


                <Paper bg={'primary.2'} p={'lg'} radius={'lg'} mb={20}>
                    <Container size="xl" py={0} px={20}>
                        <Box py="xl">
                            <SectionTitle label={t('ab_12')} />

                            <Text fw={'normal'} mb={20} fz={20} ta='center' px={15}>
                                {t('ab_13')}
                            </Text>
                            <Text fw={'normal'} mb={20} fz={20} ta='center' px={15}>
                                {t('ab_14')}
                            </Text>
                            <SimpleGrid cols={{ base: 3, sm: 3, lg: 3 }} p={{ base: 0, sm: 0, lg: 'xl' }} mt={40}>
                                <Image
                                    w={200}
                                    p={0} mx={{ base: 10, sm: 10, lg: 40 }}
                                    radius="xl"
                                    src="/images/No1Provider.png"
                                />
                                <Image
                                    w={200}
                                    p={0} mx={{ base: 10, sm: 10, lg: 40 }}
                                    radius="xl"
                                    src="/images/AsiaAward.png"
                                />
                                <Image
                                    w={200}
                                    p={0} mx={{ base: 10, sm: 10, lg: 40 }}
                                    radius="xl"
                                    src="/images/SuperbrandsLogo.png"
                                />
                            </SimpleGrid>

                        </Box>
                    </Container>
                </Paper>

                <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={20}>
                    <Container size="xl" py={0} px={20}>
                        <Box py="xl">
                            <SectionTitle label={t('ab_15')} />

                            <Text fw={'normal'} mb={20} fz={20} ta='center' px={15}>
                                {t('ab_16')}
                            </Text>
                            <Text fw={'normal'} mb={20} fz={20} ta='center' px={15}>
                                {t('ab_17')}
                            </Text>
                            <Group justify='center' p='xl'>
                                <Card radius={0} shadow='xl' style={{ overflow: 'hidden', }} p={0} mx={{ base: 0, sm: 0, lg: 40 }} w={150}>
                                    <Image
                                        src="/images/app home.png"
                                    />
                                </Card>
                                <Card radius={0} shadow='xl' style={{ overflow: 'hidden', }} p={0} mx={{ base: 0, sm: 0, lg: 40 }} w={150}>
                                    <Image
                                        src="/images/app service.png"
                                    />
                                </Card>
                                <Card radius={0} shadow='xl' style={{ overflow: 'hidden', }} p={0} mx={{ base: 0, sm: 0, lg: 40 }} w={150}>
                                    <Image
                                        src="/images/app login.png"
                                    />
                                </Card>
                            </Group>
                            <Group justify='center' mt={40}>
                                <Card bg='white' p={10}>
                                    <Text ta='center' mb={15} mt={5} fw='bold'>{t('ab_18')}</Text>
                                    <Group justify='center'>
                                        <AppStoreButton
                                            url={'https://apps.apple.com/my/app/ezcare-warranty/id1618380547'}
                                            theme={"light"}
                                            className={"custom-style"}
                                        />
                                        <GooglePlayButton
                                            url={'https://play.google.com/store/apps/details?id=io.ezcare.ezcare&pli=1'}
                                            theme={"light"}
                                            className={"custom-style"}
                                        />
                                        <AppGalleryButton
                                            url={'https://appgallery.huawei.com/#/app/C105764657'}
                                            theme={"light"}
                                            className={"custom-style"}
                                        />
                                    </Group>
                                </Card>
                            </Group>
                        </Box>
                    </Container>
                </Paper>

                <Paper bg={'indigo.0'} p={'lg'} radius={'lg'} mb={20}>
                    <Container size="xl" py={0} px={20}>
                        <Box py="xl">
                            <SectionTitle label={t('ab_19')} />

                            <Text fw={'normal'} mb={20} fz={20} ta='center' px={15}>
                                {t('ab_20')}
                            </Text>
                            <Text fw={'normal'} mb={20} fz={20} ta='center' px={15}>
                                {t('ab_21')}
                            </Text>
                            <SimpleGrid cols={{ base: 1, sm: 1, lg: 3 }} p='xl'>
                                <Card radius="xl" style={{ overflow: 'hidden', }} p={0} mx={{ base: 10, sm: 10, lg: 10 }} h={300} bg='transparent'>
                                    <Image
                                        radius="xl"
                                        src="/images/aboutus/banner1.jpeg"
                                    />
                                </Card>
                                <Card radius="xl" style={{ overflow: 'hidden', }} p={0} mx={{ base: 10, sm: 10, lg: 10 }} h={300} bg='transparent'>
                                    <Image
                                        pos='absolute'
                                        radius="xl"
                                        src="/images/aboutus/banner2.jpeg"
                                    // pb={200}
                                    />
                                </Card>
                                <Card radius="xl" style={{ overflow: 'hidden', }} p={0} mx={{ base: 10, sm: 10, lg: 10 }} h={300} bg='transparent'>
                                    <Image
                                        pos='absolute'
                                        radius="xl"
                                        src="/images/aboutus/banner3.jpeg"
                                    // pb={200}
                                    />
                                </Card>
                            </SimpleGrid>
                        </Box>
                    </Container>
                </Paper>


                {/* <Paper bg={'gray.1'} p={'lg'} radius={'lg'}>
                    <Container size="xl" py={20}>
                        <SimpleGrid cols={2}>
                            <Box py="xl" pr={100}>
                                <Group justify='space-between'>
                                    <Title order={2} mb={20} mt={20} fz={25}>
                                        Established In
                                        <Text fz={60}>2016</Text>
                                    </Title>
                                </Group>

                                <Text fw={'normal'} mb={20}>
                                    Ezcare Warranty began fully operational in 2017. Currently we are the leading aftermarket warranty provider primarily focused on warranty programs for used and reconditioned vehicles.
                                </Text>
                                <Text fw={'normal'} mb={20}>
                                    Starting from our first office located in Subang Bestari, Shah Alam, we have been expanding throughout the whole country as now we have several branches in Johor Bahru, Penang, Kuantan, Kuching and Kota Kinabalu.
                                </Text>
                                <Text fw={'normal'} mb={20}>
                                    We also introduced a new warranty program named Motorcycle Warranty launched in August 2018 and few months later we initiated our Mobile Service unit which is a door to door service program as it making more efficient and convenience upon reaching our customers.
                                </Text>

                                <Group justify='space-between' mt={50}>
                                    <Image src={'/images/ezcarelogo.png'} h={80} w={'auto'} />
                                </Group>
                            </Box>
                            <Paper shadow="md" my={'xl'} radius='lg' style={{ overflow: 'hidden' }} h={500}>
                                <BackgroundImage h={'100%'} src="/images/building01.png" />
                            </Paper>
                        </SimpleGrid>
                    </Container>
                </Paper> */}
            </Container>

            {/* <Container size={'xl'} mt={40}>
                <Paper bg={'primary.1'} p={'lg'} radius={'lg'}>
                    <Group justify='center' mb={20}>
                        <Title >
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{ from: 'primary.9', to: 'primary.2' }}
                            >
                                OUR MOTTO
                            </Text>
                        </Title>
                    </Group>
                    <Box p={20} ta='center'>
                        <Text fz={20} fw={'bold'} mb={10}>
                            “WE CARE & WE PROTECT”
                        </Text>
                        at Ezcare Warranty, we do care for all our customers’ well-being by protecting their vehicle with a guarantee of compensation for the parts in a specified warranty program. By focusing on our customers first, we’ve become one of this country’s leading and most trusted aftermarket warranty provider.
                    </Box>
                </Paper>

                <SimpleGrid cols={3} mt={20}>
                    <Paper bg={'primary.1'} p={'lg'} radius={'lg'}>
                        <Group justify='center' mb={20}>
                            <Title >
                                <Text
                                    component="span"
                                    inherit
                                    variant="gradient"
                                    gradient={{ from: 'primary.9', to: 'primary.2' }}
                                >
                                    MISSION
                                </Text>
                            </Title>
                        </Group>
                        <Box p={20} ta='center'>
                            <List ta='left'>
                                <List.Item>To excel in the design and delivery of our products and services</List.Item>
                                <List.Item>To excel in meeting needs and exceeding requirements of our customers</List.Item>
                                <List.Item>To increase the long-term business relations of our partners</List.Item>
                            </List>

                        </Box>
                    </Paper>
                    <Paper bg={'primary.1'} p={'lg'} radius={'lg'}>
                        <Group justify='center' mb={20}>
                            <Title >
                                <Text
                                    component="span"
                                    inherit
                                    variant="gradient"
                                    gradient={{ from: 'primary.9', to: 'primary.2' }}
                                >
                                    VISION
                                </Text>
                            </Title>
                        </Group>
                        <Box p={20} ta='center'>
                            <List ta='left'>
                                <List.Item>To be the leading aftermarket warranty provider in the industry that provides services efficiently at a competitive pricing for customer</List.Item>
                            </List>
                        </Box>
                    </Paper>
                    <Paper bg={'primary.1'} p={'lg'} radius={'lg'}>
                        <Group justify='center' mb={20}>
                            <Title >
                                <Text
                                    component="span"
                                    inherit
                                    variant="gradient"
                                    gradient={{ from: 'primary.9', to: 'primary.2' }}
                                >
                                    VALUES
                                </Text>
                            </Title>
                        </Group>
                        <Box p={20} ta='center'>
                            <List ta='left'>
                                <List.Item>Customer Focus</List.Item>
                                <List.Item>Professionalism</List.Item>
                                <List.Item>Intergrity</List.Item>
                                <List.Item>Innovation</List.Item>
                                <List.Item>Teamwork</List.Item>
                            </List>
                        </Box>
                    </Paper>
                </SimpleGrid>

            </Container> */}





            {/* <WAFloatingButton /> */}
        </>
    );
}

AboutUs.layout = (page: any) => <Guestlayout children={page} />;
