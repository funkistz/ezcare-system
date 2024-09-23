import Guestlayout from '@/Components/layout/GuestLayout'
import { WAFloatingButton } from '@/features/app-blog'
import { EzEcwCarousel } from '@/features/app-blog/componenst/EzEcwCarousel'
import { EzHeroTitle } from '@/features/app-blog/componenst/EzHeroTitle'
import { EzYoutubeCard } from '@/features/app-blog/componenst/EzYoutubeCard'
import { Head } from '@inertiajs/react'
import { Carousel } from '@mantine/carousel'
import { Box, Container, Divider, Group, List, Paper, Stack, Text, ThemeIcon, rem, Image, Button, SimpleGrid, Title, BackgroundImage } from '@mantine/core'
import { IconBrandWhatsapp, IconCheck, IconCircleCheck } from '@tabler/icons-react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import classes from './EcwMobileServices.module.css';

export default function GroupOfCompanies() {

    const { t } = useLaravelReactI18n();

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

    const makeAppointment = () => {
        window.open('https://wa.link/f6ai9w', '_blank');
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

    const ItemWrapper = ({ label }: any) => {

        return <Group>
            <ThemeIcon color='lime' size='sm'>
                <IconCheck color='white' />
            </ThemeIcon>
            <Text fz='md'>{label}</Text>
        </Group>

    }

    return (
        <>
            <Head title='Group of Companies' />

            <EzHeroTitle title={'Group of Companies'}
                // image='/images/icon-512.webp'
                // description={'EZCARE WARRANTY, “WE CARE & WE PROTECT”'} 
                imageWidth={200} />

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

            <Container size={'xl'} mt={40} ff='Roboto'>

                <Box mt={80}>
                    <SectionTitle label={'GROUP OF COMPANIES'} size={1.2} />
                </Box>

                <Paper bg={'gray.0'} p={'xl'} radius={'lg'} mb={20} >
                    <Stack p={10} justify='start' gap='xs'>
                        <Text fw={900} fz={{ base: 30, sm: 30, lg: 35 }} variant="gradient" gradient={{ from: 'dark.5', to: 'pink', deg: 0 }}>
                            ECW MOTORSPORTS SDB BHD
                        </Text>
                        <Divider variant='dashed' size={2} color='dark.1' mb={20} />
                        <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                            Introduction of ECW Motorsport Sdb Bhd
                        </Text>
                    </Stack>

                    <Carousel px={10} slideSize={{ base: '80%', sm: '40%', lg: '30%' }} align='start' slideGap="sm" loop withIndicators controlSize={40} >
                        <Carousel.Slide>
                            <Image
                                radius="xl"
                                src="/images/ecw/003.jpeg" h={220}
                            />
                        </Carousel.Slide>
                        <Carousel.Slide>
                            <Image
                                radius="xl"
                                src="/images/ecw/005.jpeg" h={220}
                            />
                        </Carousel.Slide>
                        <Carousel.Slide>
                            <Image
                                radius="xl"
                                src="/images/ecw/006.jpeg" h={220}
                            />
                        </Carousel.Slide>
                        <Carousel.Slide>
                            <Image
                                radius="xl"
                                src="/images/ecw/004.jpeg" h={220}
                            />
                        </Carousel.Slide>
                        <Carousel.Slide>
                            <Image
                                radius="xl"
                                src="/images/ecw/0012.jpeg" h={220}
                            />
                        </Carousel.Slide>
                    </Carousel>

                    <Group justify='start' align='start' py={30}>
                        <Stack p={20}>
                            <Text fw={'normal'} mb={10} fz={18} ta='start' >
                                ECW Motorsport Sdb Bhd formerly known as ECW Garage, stands as a distinguished vehicle service center that surpasses the conventional scope of car maintenance & repair. Our commitment extends beyond merely servicing vehicles, as we offer an extensive array of automotive services, prioritizing customer satisfaction at every step.
                            </Text>
                            <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                                Comprehensive Automotive Services
                            </Text>
                            <Text fw={'normal'} mb={10} fz={18} ta='start' >
                                At ECW Motorsport Sdb Bhd, we boast expertise in the repair and maintenance of various vehicles, including hybrids and Electric Vehicles (EVs). Our proficiency in handling diverse automotive needs positions us as a reliable partner in ensuring the optimal performance and longevity of our clients' vehicles.
                            </Text>
                            <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                                Comprehensive Automotive Services
                            </Text>
                            <Text fw={'normal'} mb={10} fz={18} ta='start' >
                                At ECW Motorsport Sdb Bhd, we boast expertise in the repair and maintenance of various vehicles, including hybrids and Electric Vehicles (EVs). Our proficiency in handling diverse automotive needs positions us as a reliable partner in ensuring the optimal performance and longevity of our clients' vehicles.
                            </Text>
                            <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                                Strategic Expansion in 2019
                            </Text>
                            <Text fw={'normal'} mb={10} fz={18} ta='start' >
                                In the year 2019, ECW Motorsport Sdb Bhd strategically expanded its presence in the local automotive industry by inaugurating multiple branches. These branches, located in Sg. Chua Kajang, Bandar Baru Bangi and Kuching underscore our commitment to caters to the automotive requirements of a broader clientele.
                            </Text>
                            <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                                Diversified Services and Facilities
                            </Text>
                            <Text fw={'normal'} mb={10} fz={18} ta='start' >
                                In addition to our core vehicle services, ECW Motorsport Sdb Bhd offers a range of supplementary services. This strategic diversification, combined with our commitment to consolidating various facilities under a unified brand, reinforces our status as a comprehensive service center that addresses multiple automotive needs seamlessly.
                            </Text>
                            <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                                Fostering Customer Loyalty
                            </Text>
                            <Text fw={'normal'} mb={10} fz={18} ta='start' >
                                Our endeavors aim to establish ECW Motorsport Sdb Bhd as more than a service provider, we strive to become a steadfast companion to our customers in the automotive realm. Through specialization in the local automotive industry, we aspire to foster enduring relationships by consistently delivering quality services and addressing the varied needs of our valued clientele.
                            </Text>
                            <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                                Services provided by ECW Motorsports Sdn Bhd:
                            </Text>
                            <List
                                spacing="xs"
                                size="lg"
                                center
                                icon={
                                    <ThemeIcon color="primary" size={24} radius="xl" variant='light'>
                                        <IconCircleCheck style={{ width: rem(20), height: rem(20) }} />
                                    </ThemeIcon>
                                }
                            >
                                <List.Item>Minor and major service & vehicle repair</List.Item>
                                <List.Item>Mobile Service (Door to door vehicle service)</List.Item>
                                <List.Item>Tires & Sports Rim sales</List.Item>
                                <List.Item>Hybrid & EV service & repair</List.Item>
                                <List.Item>Vehicle body & paint repair</List.Item>
                                <List.Item>Vehicle accessories sales</List.Item>
                            </List>

                        </Stack>
                    </Group>
                </Paper>

                <Paper bg={'gray.0'} p={'xl'} radius={'lg'} mb={20} mt={50}>
                    <Stack p={10} justify='start' gap='xs'>
                        <Text fw={900} fz={{ base: 30, sm: 30, lg: 35 }} variant="gradient" gradient={{ from: 'dark.5', to: 'pink', deg: 0 }}>
                            EZCARE TRANSPORTER
                        </Text>
                        <Divider variant='dashed' size={2} color='dark.1' mb={20} />
                        <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                            Ezcare Transporter Introduction
                        </Text>
                    </Stack>

                    <Carousel px={10} slideSize={{ base: '80%', sm: '40%', lg: '30%' }} align='start' slideGap="sm" loop withIndicators controlSize={40}>
                        <Carousel.Slide>
                            <Image
                                radius="xl"
                                src="/images/transporter/001.jpeg" h={220}
                            />
                        </Carousel.Slide>
                        <Carousel.Slide>
                            <Image
                                radius="xl"
                                src="/images/transporter/002.jpeg" h={220}
                            />
                        </Carousel.Slide>
                        <Carousel.Slide>
                            <Image
                                radius="xl"
                                src="/images/transporter/003.jpeg" h={220}
                            />
                        </Carousel.Slide>
                        <Carousel.Slide>
                            <Image
                                radius="xl"
                                src="/images/transporter/004.jpeg" h={220}
                            />
                        </Carousel.Slide>
                    </Carousel>

                    <Group justify='start' align='start' py={30}>
                        <Stack p={20}>
                            <Text fw={'normal'} mb={10} fz={18} ta='start' >
                                Founded in the year 2022, Ezcare Transporter has emerged as a premier provider of delivery services for vehicles across the expanse of Malaysia. The company currently boasts a fleet comprising 5 trailer units and 1 single carrier unit, reinforcing its operational capacity and commitment to efficient service delivery.
                            </Text>
                            <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                                Comprehensive Delivery Network
                            </Text>
                            <Text fw={'normal'} mb={10} fz={18} ta='start' >
                                In addition to catering to mainland Malaysia, Ezcare Transporter extends its services to the states of Sabah and Sarawak by facilitating the transportation of vehicles and goods through cargo ships. This expansion underscores the company's dedication to establishing a comprehensive and well-connected delivery network that spans the entire Malaysian nationwide.
                            </Text>
                            <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                                Strategic Business Expansion
                            </Text>
                            <Text fw={'normal'} mb={10} fz={18} ta='start' >
                                With a strategic vision for the future, Ezcare Transporter aims to fortify and expand its business operations. The company envisions augmenting its fleet by incorporating additional trailer units to meet the escalating demand for its services. This proactive approach aligns with the company's commitment to accommodating the ever-growing requirements of its clientele.
                            </Text>
                            <Text fw={'bolder'} mb={10} fz={24} ta='start' >
                                Anticipating High Demand:
                            </Text>
                            <Text fw={'normal'} mb={10} fz={18} ta='start' >
                                As Ezcare Transporter continues to refine and amplify its delivery capabilities, the addition of more trailer units is anticipated to enhance its operational efficiency. This forward-looking strategy positions the company to effectively handle and satisfy the burgeoning demand for its delivery services, ensuring a seamless and reliable experience for its customers in the times ahead.
                            </Text>

                        </Stack>
                    </Group>
                </Paper>

                {/* <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={20}>
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
                            <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }} p='xl'>
                                <Card radius="xl" style={{ overflow: 'hidden', }} p={0} mx={{ base: 10, sm: 10, lg: 40 }} h={300} bg='transparent'>
                                    <Image
                                        radius="xl"
                                        src="/images/supports/EZC07034.JPG"
                                    />
                                </Card>
                                <Card radius="xl" style={{ overflow: 'hidden', }} p={0} mx={{ base: 10, sm: 10, lg: 40 }} h={300} bg='transparent'>
                                    <Image
                                        mt={-22}
                                        pos='absolute'
                                        radius="xl"
                                        src="/images/supports/EZC06943.JPG"
                                    // pb={200}
                                    />
                                </Card>
                            </SimpleGrid>
                        </Box>
                    </Container>
                </Paper> */}


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
        </>
    )
}

GroupOfCompanies.layout = (page: any) => <Guestlayout children={page} />;
