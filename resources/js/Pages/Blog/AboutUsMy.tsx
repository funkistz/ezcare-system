import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, Affix, Button, Group, SimpleGrid, Paper, rem, BackgroundImage, List, Card, Divider, Center, ThemeIcon } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1 } from '@/features/app-blog';
import classes from './ContactUs.module.css';
import { IconAt, IconPhone, IconMapPin, IconSun, IconCircleCheck, IconCircleDashed, IconAward, IconInfoCircle, IconInfoSquareRounded, IconDeviceMobile, IconUsers, IconAugmentedReality } from '@tabler/icons-react';
import { ContactIconsList } from './ContactIcons';
import { EzHeroTitle } from '@/features/app-blog/componenst/EzHeroTitle';
import {
    GooglePlayButton,
    AppGalleryButton,
    AppStoreButton,
    ButtonsContainer,
} from "react-mobile-app-button";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { EzCardBorder } from '@/features/app-blog/componenst/EzCardBorder';

export default function AboutUs() {

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

    return (
        <>
            <Head title='Ezcare' />

            <EzHeroTitle title={t('ab_1')}
                // image='/images/icon-512.webp'
                // description={'EZCARE WARRANTY, “WE CARE & WE PROTECT”'} 
                imageWidth={200} />

            <Container size={'xl'} mt={20} >
                <Paper bg={'gray.0'} p={'lg'} radius={'lg'} mb={20}>
                    <Group justify='start' align='start' py={30}>
                        <Image
                            w={300}
                            p={0} mx={{ base: 10, sm: 10, lg: 40 }}
                            radius="xl"
                            src="/images/buildingMy.png"
                        />
                        <Stack w={700} p={20}>
                            <Stack mb={40} justify='start'>
                                <Text fw={700} fz={{ base: 35, sm: 35, lg: 40 }} variant="gradient" gradient={{ from: 'primary.9', to: 'grape.6' }} lh={1.2}>
                                    EZCARE WARRANTY
                                </Text>
                                <Text fw={600} fz={{ base: 18, sm: 18, lg: 22 }} variant="gradient" gradient={{ from: 'black', to: 'orange.9' }} lh={0.8}>
                                    “WE CARE & WE PROTECT”
                                </Text>
                            </Stack>

                            <Text fw={'normal'} mb={10} fz={'lg'} ta='start' >
                                Ezcare Warranty is an after-market warranty provider specializing in the provision of warranties for reconditioned and pre-owned vehicles, encompassing hybrids, electric vehicles (EVs), and high-performance motorcycles. Established in late 2016 and commencing official operations in January 2017, Ezcare Warranty headquartered located in Bandar Baru Bangi, Selangor, with an extensive network spanning across Malaysia, including branch offices in Johor Bharu, Johor, and Kuching, Sarawak. Additionally, the Ezcare Warranty has expanded its presence on the international stage by entering the Indonesian market, with an operational office situated in South Jakarta, Indonesia.
                            </Text>

                            <Text fw={'normal'} mb={10} fz={'lg'} ta='start'>
                                Distinguished from existing warranty providers in the market, Ezcare Warranty introduces a unique warranty service concept. This differentiation is evident in the flexibility provided to policyholders in selecting their preferred workshop for warranty claims, all while maintaining a competitive rate that align with the highest demands in the market. As of now, Ezcare Warranty has issued over 50,000 policies, with this figure steadily increasing on an annual basis.
                            </Text>
                        </Stack>
                    </Group>
                </Paper>
            </Container>

            <Box style={{ backgroundImage: "linear-gradient(to right, rgba(52, 30, 124, 0.96), rgb(73, 55, 55)),url(/images/background.png)" }} py={30} mt={40} display={{ base: 'none', sm: 'block' }} >
                <Container size={'xl'} mt={20} >
                    <Stack >
                        <EzCardBorder
                            title='Introduction of the Open Workshop Concept'
                            description='The introduction of the open workshop concept making Ezcare Warranty represents a progressive approach to service and vehicle repair. This unique concept provides policyholders with the autonomy to select a workshop or service centre of their choice, enhancing flexibility and convenience in the warranty service experience.'
                            image='images/features/openworkshop.jpeg' color='primary'
                            direction='row-reverse'
                        />
                        <EzCardBorder
                            title='Incorporation of Mobile App Technology'
                            description='In line with the evolution of technology, Ezcare Warranty has seamlessly incorporated a Mobile App for the replacement of traditional warranty policy booklet. This strategic move positions Ezcare Warranty as a frontrunner in the digitisation of policies, demonstrating adaptability to contemporary technological advancements and fostering efficiency in policy management.'
                            image='images/app home.png' color='primary'
                            imageWidth={200}
                        />
                        <EzCardBorder
                            title='Pioneer in Hybrid and EV Warranty Plans'
                            description='Ezcare Warranty stands as a pioneer in the introduction of warranty plans tailored specifically for hybrid and electric vehicles (EVs). This ground-breaking initiative not only positions Ezcare Warranty as an industry leader but also facilitates vehicle dealers in offering specialised warranty plans, coupled with unparalleled after-sales support, thus catering to the unique needs of the market.'
                            image='images/EZC02689.JPG' color='primary'
                            direction='row-reverse'
                        />
                        <EzCardBorder
                            title='Dependable After-Sales Service'
                            description='Having released more than 50,000 policies, Ezcare Warranty has earned a reputation for providing reliable after-sales service. This commendable track record is further reinforced by prestigious recognitions, including the Asia Automotive Award 2019 and the Superbrands Award 2020. These accolades underscore Ezcare Warranty as the trusted provider of after-market warranties in the local market, attesting to its commitment to excellence and customer satisfaction.'
                            image='images/supports/EZC06943.JPG' color='primary'
                        />
                    </Stack>

                </Container>
            </Box>

            {/* <Divider variant='dashed' mb={30} mt={30} /> */}

            <Stack py={0} mt={40} display={{ base: 'block', sm: 'none' }} >

                <Carousel slideSize="80%" align="center" slideGap="md" controlSize={40} loop withIndicators style={{ backgroundImage: "linear-gradient(to right, rgba(52, 30, 124, 0.96), rgb(73, 55, 55)),url(/images/background.png)" }} pb={40}>
                    <Carousel.Slide>
                        <EzCardBorder
                            title='Introduction of the Open Workshop Concept'
                            description='The introduction of the open workshop concept making Ezcare Warranty represents a progressive approach to service and vehicle repair. This unique concept provides policyholders with the autonomy to select a workshop or service centre of their choice, enhancing flexibility and convenience in the warranty service experience.'
                            image='images/features/openworkshop.jpeg' color='primary'
                        />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <EzCardBorder
                            title='Incorporation of Mobile App Technology'
                            description='In line with the evolution of technology, Ezcare Warranty has seamlessly incorporated a Mobile App for the replacement of traditional warranty policy booklet. This strategic move positions Ezcare Warranty as a frontrunner in the digitisation of policies, demonstrating adaptability to contemporary technological advancements and fostering efficiency in policy management.'
                            image='images/app home.png' color='primary'
                            imageWidth={150}
                        />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <EzCardBorder
                            title='Pioneer in Hybrid and EV Warranty Plans'
                            description='Ezcare Warranty stands as a pioneer in the introduction of warranty plans tailored specifically for hybrid and electric vehicles (EVs). This ground-breaking initiative not only positions Ezcare Warranty as an industry leader but also facilitates vehicle dealers in offering specialised warranty plans, coupled with unparalleled after-sales support, thus catering to the unique needs of the market.'
                            image='/images/buildingMy.png' color='primary'
                        />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <EzCardBorder
                            title='Dependable After-Sales Service'
                            description='Having released more than 50,000 policies, Ezcare Warranty has earned a reputation for providing reliable after-sales service. This commendable track record is further reinforced by prestigious recognitions, including the Asia Automotive Award 2019 and the Superbrands Award 2020. These accolades underscore Ezcare Warranty as the trusted provider of after-market warranties in the local market, attesting to its commitment to excellence and customer satisfaction.'
                            image='/images/buildingMy.png' color='primary'
                        />
                    </Carousel.Slide>
                </Carousel>
            </Stack>

            <Container size={'xl'} mt={100} ff='Roboto' >

                <Box mt={60}>
                    <Container pos='relative' >
                        {/* <IconInfoSquareRounded color='#862E9C' size={150} opacity={0.1} style={{ position: 'absolute', top: -60, right: 100, transform: 'rotate(-10deg)' }} /> */}
                        <IconInfoSquareRounded color='#862E9C' size={150} opacity={0.1} style={{ position: 'absolute', top: -70, right: 100, transform: 'rotate(-10deg)' }} />
                    </Container>
                    <SectionTitle label={'MORE ABOUT US'} size={1.2} />
                </Box>

                <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }}>
                    <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={20}>
                        <Container size="xl" py={0} px={20}>
                            <Box py="xl">
                                <SectionTitle label={'Vision Statement'} />

                                <Text fw={'normal'} mb={20} fz={'lg'} ta='center' px={15}>
                                    Ezcare Warranty’s vision is to emerge as a leading after-market warranty provider by diligently staying abreast of the cutting-edge technological advancements within the automotive sector. We aspire to actively contribute to the economic development of our nation, with a particular emphasis on fostering growth in the automotive industry.
                                </Text>
                            </Box>
                        </Container>
                    </Paper>

                    <Paper bg={'primary.0'} p={'lg'} radius={'lg'} mb={20}>
                        <Container size="xl" py={0} px={20}>
                            <Box py="xl">
                                <SectionTitle label={'Mission Statement'} />

                                <Text fw={'normal'} mb={20} fz={'lg'} ta='center' px={15}>
                                    Our mission is to deliver a comprehensive service to our customers. We are committed to providing the highest quality service at an affordable price, ensuring that our offerings meet the diverse needs of our clientele. Through this mission, we aim to not only satisfy our customers but also contribute to the overall advancement and accessibility of top-notch automotive services.
                                </Text>
                            </Box>
                        </Container>
                    </Paper>
                </SimpleGrid>

                <Divider variant='dashed' mb={40} mt={20} />

                <Paper bg={'pink.0'} p={'lg'} radius={'lg'} mb={20}>
                    <Container size="xl" py={0} px={20}>
                        <Box py="xl">
                            <Container pos='relative' >
                                <IconAugmentedReality color='#862E9C' size={200} opacity={0.1} style={{ position: 'absolute', top: -40, left: -40, transform: 'rotate(0deg)' }} />
                            </Container>
                            <SectionTitle label={'Advanced Technological Integration'} />

                            <Text fw={'normal'} mb={20} fz={'lg'} ta='center' px={15}>
                                At Ezcare Warranty, we prioritize the incorporation of cutting-edge technology to align with global advancements. Our warranty application goes beyond mere data display for policyholders, it extends to streamline the entire process of warranty claims. This ensures that our services are not only data-driven but also operationally efficient.
                            </Text>
                        </Box>
                    </Container>
                </Paper>

                <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }}>
                    <Paper bg={'pink.0'} p={'lg'} radius={'lg'} mb={20}>
                        <Container size="xl" py={0} px={20}>
                            <Box py="xl">
                                <Container pos='relative' >
                                    <IconDeviceMobile color='#862E9C' size={200} opacity={0.1} style={{ position: 'absolute', top: -40, left: -40, transform: 'rotate(0deg)' }} />
                                </Container>
                                <SectionTitle label={'Introducing the Ezcare Warranty Mobile App'} />

                                <Text fw={'normal'} mb={20} fz={'lg'} ta='center' px={15}>
                                    In our commitment to enhancing the accessibility and convenience for our policyholders, we proudly introduce the Ezcare Warranty Mobile App. This exclusive mobile application is designed to serve as a comprehensive platform, offering policyholders a seamless interface to manage their policies. With the Ezcare Warranty Mobile App, policyholders can effortlessly review policy details, check the status of their claims, and seek assistance, all at their fingertips, irrespective of location or time.
                                </Text>
                            </Box>
                        </Container>
                    </Paper>

                    <Paper bg={'pink.0'} p={'lg'} radius={'lg'} mb={20}>
                        <Container size="xl" py={0} px={20}>
                            <Box py="xl">
                                <Container pos='relative' >
                                    <IconUsers color='#862E9C' size={200} opacity={0.1} style={{ position: 'absolute', top: -40, left: -40, transform: 'rotate(0deg)' }} />
                                </Container>
                                <SectionTitle label={'Customer-Centric Service'} label2='&nbsp;' />

                                <Text fw={'normal'} mb={20} fz={'lg'} ta='center' px={15}>
                                    Our primary goal is to deliver a service that is not only technologically sophisticated but also tailored to meet the diverse needs and preferences of our customers. By combining advanced technology with a focus on customer comfort, we strive to set a benchmark in providing unparalleled service excellence.
                                </Text>
                            </Box>
                        </Container>
                    </Paper>
                </SimpleGrid>

            </Container>
            <Box style={{ backgroundImage: "linear-gradient(to right, rgba(52, 30, 124, 0.96), rgb(73, 55, 55)),url(/images/background.png)" }} pb={60}>

                <Container size={'xl'} mt={40} ff='Roboto' >

                    <Paper bg={'transparent'} radius={'lg'}  >
                        <Container size="xl" pt={30} px={'xl'} >
                            <Box py="xl" pb={0}>
                                <SectionTitle label={'Awards and Recognitions'} />

                                <Text fw={'normal'} mb={40} fz={20} ta='center' px={15} c='white'>
                                    The awards and accolades bestowed upon Ezcare Warranty by diverse organizations, both domestically and internationally, stand as a testament to the unwavering trust placed in our organization as a reliable warranty provider. These acknowledgments affirm our commitment to delivering services that consistently align with the highest standards, ensuring optimal outcomes for our valued customers.
                                </Text>

                                <SectionTitle label={'Driving Excellence through Recognition'} />

                                <Text fw={'normal'} mb={20} fz={20} ta='center' px={15} c='white'>
                                    These awards not only underscore the trustworthiness of Ezcare Warranty but also serve as a catalyst propelling us to maintain and enhance our commitment to service excellence. The recognition received from various entities inspires us to continually diversify and refine our after-sales guarantee services, meeting the evolving needs of our clientele with an unwavering dedication to quality and customer satisfaction.
                                </Text>
                                <Group p={{ base: 0, sm: 0, lg: 'xl' }} mt={40} mb={40} justify='center'>
                                    {/* <Card radius={50} mx={{ base: 10, sm: 10, lg: 40 }} bg='black'>
                                        <Center>
                                            <Image
                                                w={'100%'}
                                                p={0}

                                                radius="xl"
                                                src="/images/No1Provider.png"
                                            />
                                        </Center>
                                    </Card> */}

                                    <Card radius={50} mx={{ base: 10, sm: 10, lg: 40 }} bg='transparent' w={{ base: '40%', sm: '25%' }}>
                                        <Center>
                                            <Image
                                                w={'100%'}
                                                p={0} mx={{ base: 10, sm: 10, lg: 40 }}
                                                radius="xl"
                                                src="/images/AsiaAward.png"
                                            />
                                        </Center>
                                    </Card>
                                    <Card radius={50} mx={{ base: 10, sm: 10, lg: 40 }} bg='transparent' w={{ base: '40%', sm: '25%' }}>
                                        <Center>
                                            <Image
                                                w={'100%'}
                                                p={0} mx={{ base: 10, sm: 10, lg: 40 }}
                                                radius="xl"
                                                src="/images/SuperbrandsLogo.png"
                                            />
                                        </Center>
                                    </Card>
                                </Group>
                            </Box>
                        </Container>


                    </Paper>

                </Container>

                <Carousel slideSize={{ base: "28%", sm: "25%", xl: "22%" }} align="start" slideGap="xl" loop controlSize={50} withIndicators py={40}>
                    <Carousel.Slide>
                        <Image radius='lg' src={'/images/certs/cert01.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image radius="lg" src={'/images/certs/cert02.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image radius="lg" src={'/images/certs/cert03.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image radius="lg" src={'/images/certs/cert04.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image radius="lg" src={'/images/certs/cert05.png'} />
                    </Carousel.Slide>
                </Carousel>
            </Box>

            {/* <WAFloatingButton /> */}
        </>
    );
}

AboutUs.layout = (page: any) => <Guestlayout children={page} />;
