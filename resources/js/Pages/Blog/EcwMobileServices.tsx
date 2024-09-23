import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, SimpleGrid, Button, Paper, ThemeIcon, Group, Divider, ScrollArea, Flex, Card, BackgroundImage } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1, EzGetQuotation, EzCoverage } from '@/features/app-blog';
import { EzHeroTitle } from '@/features/app-blog/componenst/EzHeroTitle';
import classes from './EcwMobileServices.module.css';
import { ContactIconsList } from './ContactIcons';
import { IconArrowRight, IconBrandWhatsapp, IconCar, IconCheck, IconFileCertificate, IconSignRight } from '@tabler/icons-react';
import { EzEcwCarousel } from '@/features/app-blog/componenst/EzEcwCarousel';
import { EzYoutubeCard } from '@/features/app-blog/componenst/EzYoutubeCard';

export default function OurProduct() {

    const { banners }: any = usePage<PageProps>().props;

    const makeAppointment = () => {
        window.open('https://wa.link/f6ai9w', '_blank');
    }

    const ItemWrapper = ({ label }: any) => {

        return <Group>
            <ThemeIcon color='lime' size='sm'>
                <IconCheck color='white' />
            </ThemeIcon>
            <Text fz='md'>{label}</Text>
        </Group>

    }

    const SectionTitle = ({ label, label2, size = 1 }: any) => {
        return (<Stack mb={40} justify='center'>
            <Text fw={900} fz={{ base: 30 * size, sm: 30 * size, lg: 35 * size }} variant="gradient" gradient={{ from: 'violet.7', to: 'orange.5' }} ta='center' lh={1.2}>
                {label}
            </Text>
            {label2 && <Text fw={900} fz={{ base: 30 * size, sm: 30 * size, lg: 35 * size }} variant="gradient" gradient={{ from: 'violet.7', to: 'orange.5' }} ta='center' lh={0.8}>
                {label2}
            </Text>}
        </Stack>)
    }

    const PlanWrapper2 = ({ label1, label2, items, color }: any) => {

        return <Paper className={classes.wrapperColor1} p={'xl'} mt={40} shadow='xl' style={{ borderColor: '#ccc' }} w={'100%'}>
            {/* <ThemeIcon variant='transparent' size={130} pos={'absolute'} top={20} right={30} opacity={0.2} color={'black'}>
                <IconFileCertificate size={130} />
            </ThemeIcon> */}
            <div>
                <Group>
                    <Title className={classes.title} c={color} size={10}>{label1}</Title>
                </Group>
                <Text className={classes.description} mt="sm" fz={25} mb={30} pb={5} style={{ borderBottom: '2px solid #666' }} w={'100%'}>
                    {label2}
                </Text>
                <Stack gap={5} mb={40}>
                    <Text className={classes.description} fz={25}>
                        Coverage Items
                    </Text>
                    <Stack mt={10} gap={10}>
                        {items.map((item: any) => {
                            return <ItemWrapper label={item} />
                        })}
                    </Stack>
                </Stack>
                <Button color={'orange'} radius={'md'} rightSection={<IconBrandWhatsapp />} onClick={makeAppointment}>Make Appointment Now!</Button>
            </div>
        </Paper>

    }

    return (
        <>
            <Head title='Ezcare' />

            <EzHeroTitle title={'Mobile Service'} description={'Door to door services covering area in Klang Valley & Johor Bahru.'} />

            <Container size={'xl'} mt={40}>

                <Button size={'xl'} w={'100%'} radius='xl' color='green' mb={40} leftSection={<IconBrandWhatsapp />} onClick={makeAppointment}>Make Appointment Now!</Button>

                <Paper bg={'gray.1'} p={'lg'} radius={'lg'} mb={20}>
                    <Container size="xl" py={20}>
                        <SimpleGrid cols={{ base: 1, xs: 1, md: 2 }}>
                            <Box py="xl" pr={100}>
                                <Group justify='space-between'>
                                    <Title order={2} mb={20} mt={20} fz={25}>
                                        Established In
                                        <Text fz={60}>2018</Text>
                                    </Title>
                                </Group>

                                <Text fw={'normal'} mb={20}>
                                    ECW Mobile Service redefines automotive convenience by providing door-to-door services, serving the Klang Valley regions and selection area in Negeri Sembilan.
                                </Text>
                                <Text fw={'normal'} mb={20}>
                                    Our comprehensive offerings encompass a spectrum of tasks ranging from routine maintenance such as changing engine oil, transmission oil, spark plugs to replacing wiper blades.
                                </Text>
                                <Text fw={'normal'} mb={20}>
                                    We bring these services directly to your doorstep, eliminating the need for you to navigate alternative transportation or juggle your schedule to accommodate traditional drop-offs and pick-ups at a standard workshop.
                                </Text>

                                {/* <Group justify='space-between' mt={50}>
                                    <Image src={'/images/ezcarelogo.png'} h={80} w={'auto'} />
                                </Group> */}
                            </Box>
                            <Paper shadow="md" my={'xl'} radius='lg' style={{ overflow: 'hidden' }} h={500}>
                                <BackgroundImage h={'100%'} src="/images/features/ecw/mobileservicevan01.png" />
                            </Paper>
                        </SimpleGrid>
                        <SimpleGrid cols={{ base: 1, xs: 1, md: 2 }}>
                            <Paper shadow="md" my={'xl'} radius='lg' style={{ overflow: 'hidden' }} h={500}>
                                <BackgroundImage h={'100%'} src="/images/features/ecw/mobileservicevan02.png" />
                            </Paper>
                            <Box py="xl" pl={100}>
                                <Group justify='space-between'>
                                    <Title order={2} mb={20} mt={20} fz={25}>
                                        TAILORED CONVENIENCE AND TRANSPARENT SERVICES
                                    </Title>
                                </Group>

                                <Text fw={'normal'} mb={20}>
                                    At ECW Mobile Service, we prioritize your convenience by offering you the flexibility to schedule vehicle maintenance at your preferred time.
                                </Text>
                                <Text fw={'normal'} mb={20}>
                                    This ensures that you have a clear understanding of when your vehicle will be serviced, what services will be performed and when they will be completed. With no need for alternative transport arrangements, our service simplifies the entire process.
                                </Text>
                                <Text fw={'normal'} mb={20}>
                                    If finding the time to visit a local mechanic has been challenging, scheduling an appointment with ECW Mobile Service allows us to bring our expertise and services directly to your location.
                                </Text>

                            </Box>
                        </SimpleGrid>
                    </Container>
                </Paper>

                <Stack mb={80}>
                    <SimpleGrid cols={{ base: 1, xs: 1, md: 2 }}>
                        <Box py="xl" px={40}>
                            <Group justify='space-between'>
                                <Title order={2} mb={20} mt={20} fz={25}>
                                    ROUTINE CHECKING FOR SAFE & RELIABLE DRIVING
                                </Title>
                            </Group>

                            <Text fw={'normal'} mb={20}>
                                Beyond the convenience of our mobile services, ECW Mobile Service emphasizes the importance of routine checking for optimal vehicle performance.
                            </Text>
                            <Text fw={'normal'} mb={20}>
                                Whether you aim to continue driving the same vehicle or to enhance its resale value, our Professional 10 Point Check utilises advanced diagnostic equipment to comprehensively assess your vehicle.
                            </Text>
                            <Text fw={'normal'} mb={0}>
                                This proactive approach not only minimizes the risk of accidents but also ensures the safety of all vehicle occupants while preventing inconvenient breakdowns.
                            </Text>

                        </Box>
                        <Box px={40}>
                            <PlanWrapper2 color='#228BE6' label1='PROFESSIONAL 10 POINT CHECK' label2='' items={[
                                'Computer Diagnostic Test', 'Electronic Systems Check', 'Fluid Level Check', 'Leakage Check',
                                'Windscreen Wiper Blades Check', 'Water Levels Check', 'Tyres Condition, Pressure & Tread Depth Check', 'Air Conditioning System Check',
                                'Brake System Check', 'Instrumental & Gauges Panel Check'
                            ]} />
                        </Box>

                    </SimpleGrid>
                </Stack>

                <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={20}>
                    <Container size="xl" py={0} px={20}>
                        <Box py="xl">
                            <Container pos='relative' >
                                {/* <IconAugmentedReality color='#862E9C' size={200} opacity={0.1} style={{ position: 'absolute', top: -40, left: -40, transform: 'rotate(0deg)' }} /> */}
                            </Container>
                            <SectionTitle label={'COMPREHENSIVE VEHICLE SERVICING AT YOUR DOORSTEP'} />

                            <Text fw={'normal'} mb={20} fz={'lg'} ta='center' px={15}>
                                ECW Mobile Service stands committed to providing a comprehensive suite of services without compromising your busy schedule. By bringing our expertise to your doorstep, we ensure that your vehicle receives high-quality maintenance and attention, promoting both safety and reliability. Our goal is to make routine vehicle servicing a seamless and accessible experience, reinforcing our dedication to customer satisfaction.
                            </Text>
                        </Box>
                    </Container>
                </Paper>

                <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={50}>
                    <Container size="xl" py={0} px={20}>
                        <Box py="xl">
                            <Container pos='relative' >
                                {/* <IconAugmentedReality color='#862E9C' size={200} opacity={0.1} style={{ position: 'absolute', top: -40, left: -40, transform: 'rotate(0deg)' }} /> */}
                            </Container>
                            <SectionTitle label={'ENSURING SAFER DRIVING AND ENHANCED VEHICLE LONGEVITY'} />

                            <Text fw={'normal'} mb={20} fz={'lg'} ta='center' px={15}>
                                The integration of our Professional 10 Point Check not only assures safer driving but also contributes to the longevity of your vehicle. By addressing potential faults through our advanced diagnostic procedures, we aim to keep your vehicle in optimal condition, minimizing the likelihood of accidents and ensuring the safety of all occupants. This commitment extends beyond convenience, encapsulating our dedication to providing a holistic and reliable solution for your vehicle servicing needs.
                            </Text>
                        </Box>
                    </Container>
                </Paper>

                <EzEcwCarousel />
                <Divider my={80} />
                <EzYoutubeCard />

                <Button size={'xl'} w={'100%'} radius='xl' color='green' my={40} leftSection={<IconBrandWhatsapp />} onClick={makeAppointment}>Make Appointment Now!</Button>

            </Container>

            <WAFloatingButton />
        </>
    );
}

OurProduct.layout = (page: any) => <Guestlayout children={page} />;
