import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, Affix, Button, Group, ActionIcon, Card, SimpleGrid, BackgroundImage, Paper, Center, Anchor } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1, EzGetQuotation, EzCoverage } from '@/features/app-blog';
import { IconArrowRight, IconAward, IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandWhatsapp, IconCoins, IconPhone } from '@tabler/icons-react';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { AppGalleryButton, AppStoreButton, GooglePlayButton } from 'react-mobile-app-button';
import { t } from 'i18next';
import { EzCardBorder } from '@/features/app-blog/componenst/EzCardBorder';
import EzGetQuotationMy from '@/features/app-blog/componenst/EzGetQuotationMy';

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

export default function Home() {

    const { banners }: any = usePage<PageProps>().props;
    const autoplay = useRef(Autoplay({ delay: 3000 }));

    console.log('Banners: ',banners)

    return (
        <>
            <Box>
                {/* <Carousel
                    withIndicators
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                    loop
                >
                    <Carousel.Slide>
                        <Image src={'/images/bannermy/001.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={'/images/bannermy/002.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={'/images/bannermy/003.jpeg'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={'/images/bannermy/004.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={'/images/bannermy/005.png'} />
                    </Carousel.Slide>
                </Carousel> */}

                {banners.data && <Carousel
                    withIndicators
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                    loop
                >
                    {banners.data.map((res:any, i:any) => {
                        return  <Carousel.Slide key={i}>
                            {res.link.length > 0 ?  <Anchor href={res.link} target="_self">
                                <Image src={res.image_url} />
                            </Anchor>: <Image src={res.image_url} />}
                            
                    </Carousel.Slide>
                    })}
                </Carousel>}
            </Box>
            {/* <Container fluid mx={'xl'} my={50} mb={50} >
                <EzGetQuotation />
            </Container > */}
            <EzGetQuotationMy />

            <EzBenefitsCarousel />

            {/* <EzCoverage /> */}

            {/* <Box bg={'primary.1'} pb={60} style={{ overflow: 'hidden' }}>
                <Container pos='relative' >
                    <IconAward color='#862E9C' size={250} opacity={0.1} style={{ position: 'absolute', top: 10, right: 0, transform: 'rotate(-10deg)' }} />
                </Container>
                <Container size={'xl'} py={20}>
                    <Box ff='Roboto' pos='relative'>
                        <Stack align="flex-start" mt={80} mb={20}>
                            <Title order={3} ml={{ base: 15, sm: 15, lg: 0 }} mt={{ base: -10, sm: -10, lg: 0 }} tt='uppercase'>
                                <Text fz={35} fw={900} ff='Lato' variant="gradient" gradient={{ from: 'violet.6', to: 'orange.8' }}>
                                    KNOW YOUR VEHICLE AFTER-MARKET WARRANTY
                                </Text>
                            </Title>
                        </Stack>
                        <SimpleGrid cols={{ base: 1, sm: 1, lg: 1 }}>
                            <Box color="violet" mt="xl" pr={20} pl={{ base: 20, sm: 20, lg: 0 }} style={{ wordBreak: 'keep-all' }} ta='justify'>
                                <Stack>
                                    <Text fz={20}><span style={{ color: '#862E9C', fontWeight: 'bolder' }}>Ezcare Warrant</span>y stands as the leading after-market vehicle warranty provider, uniquely positioned to offer comprehensive coverage across the entire nation, including Sabah and Sarawak. Our commitment to ensuring swift and seamless service delivery to customers has led us to strategically establish representatives in every region of Malaysia.</Text>
                                    <Text fz={20}>Distinguishing ourselves from others in the industry, we take pride in being the sole after-market warranty provider with a fully equipped, in-house open workshop. This strategic investment enables us to provide superior service quality, ensuring that our customers receive the best, most personalized, and value-driven solutions.</Text>
                                    <Text fz={20}>
                                        Further solidifying our commitment to exceptional service, Ezcare Warranty has pioneered a door-to-door service through our Mobile Service unit. This innovative approach ensures that our customers receive the utmost convenience, as our services are brought directly to their doorstep. This unique offering sets us apart as a customer-centric warranty provider dedicated to delivering unparalleled value and personalized experiences.
                                    </Text>
                                </Stack>
                            </Box>
                        </SimpleGrid>
                    </Box>
                </Container>
            </Box> */}

            <Box bg={'gray.1'} pb={60} style={{ overflow: 'hidden' }}>
                <Container pos='relative' >
                    <IconCoins color='#862E9C' size={250} opacity={0.1} style={{ position: 'absolute', top: 10, right: 0 }} />
                </Container>
                <Container size={'xl'} py={20}>
                    <Box ff='Roboto' pos='relative'>
                        <Stack align="flex-start" mt={80} mb={20}>
                            <Title order={3} ml={{ base: 15, sm: 15, lg: 0 }} mt={{ base: -10, sm: -10, lg: 0 }} tt='uppercase'>
                                <Text fz={35} fw={900} ff='Lato' variant="gradient" gradient={{ from: 'violet.6', to: 'orange.8' }}>
                                    AFTER-MARKET WARRANTY
                                </Text>
                                <Text fz={35} fw={900} ff='Lato' variant="gradient" gradient={{ from: 'violet.6', to: 'orange.8' }}>
                                    PROTECTS YOU FROM THE RISING REPAIR COST
                                </Text>
                            </Title>
                            {/* <Title order={3} fz={35} fw={900} ff='Lato' ml={{ base: 15, sm: 15, lg: 0 }} tt='uppercase'>
                                {t('ft_4')}
                            </Title> */}
                        </Stack>
                        <SimpleGrid cols={{ base: 1, sm: 1, lg: 1 }}>
                            <Box color="violet" mt="xl" pr={20} pl={{ base: 20, sm: 20, lg: 0 }} style={{ wordBreak: 'keep-all' }} ta='justify'>
                                <Stack>
                                    <Text fz={20}>
                                        In the past, cars exhibited signs of wear and tear before breaking down completely. However, the automotive landscape has transformed dramatically, with contemporary computerised models revolutionizing the realm of car repair. As today's vehicles integrate sophisticated technology, the costs associated with modern vehicle repairs are on the rise. An extended auto warranty emerges as a crucial safeguard against this escalating trend.
                                    </Text>
                                    <Text fz={20}>
                                        Modern vehicles typically have a minimum of 6 to 7 on-board computers, and some advanced models even can carry up to 15. The malfunctioning of these intricate computer systems can lead to a complete breakdown, even in the absence of apparent mechanical issues. Unlike the simpler machines of the past, contemporary cars necessitate addressing both mechanical and technological malfunctions, amplifying the complexity of repairs.
                                    </Text>
                                    <Text fz={20}>
                                        Apart from technological complexities, rising vehicle repair costs are attributed to other factors. As vehicles have become more intricate, the expense of individual parts has soared. Moreover, once a vehicle is no longer covered by the original factory warranty, all repair expenses, including parts and labour become the responsibility of the vehicle owner.
                                    </Text>

                                    <Carousel py={25} slideSize={{ base: '45%', sm: '40%', lg: '30%' }} align='start' slideGap="sm" loop withIndicators controlSize={40}>
                                        <Carousel.Slide>
                                            <Image
                                                radius="xl"
                                                src="/images/banner/EZC06837.JPG"
                                            />
                                        </Carousel.Slide>
                                        <Carousel.Slide>
                                            <Image
                                                radius="xl"
                                                src="/images/banner/EZC06782.JPG"
                                            />
                                        </Carousel.Slide>
                                        <Carousel.Slide>
                                            <Image
                                                radius="xl"
                                                src="/images/banner/EZC07122.JPG"
                                            />
                                        </Carousel.Slide>
                                        <Carousel.Slide>
                                            <Image
                                                radius="xl"
                                                src="/images/banner/EZC02686.JPG"
                                            />
                                        </Carousel.Slide>
                                        <Carousel.Slide>
                                            <Image
                                                radius="xl"
                                                src="/images/banner/EZC02690.JPG"
                                            />
                                        </Carousel.Slide>
                                    </Carousel>

                                    <Text fz={20}>
                                        The critical juncture arises when the factory warranty expires, leaving car owners vulnerable to substantial repair bills. Aftermarket mechanics adopt the same method of part replacement but now owners retain and pay for the replaced parts even if the issue persists. In this scenario, an after-market vehicle protection plan often referred to as an "after-market warranty" becomes invaluable.
                                    </Text>

                                    <Text fz={20}>
                                        The after-market warranty functions as a shield against the prevailing parts-replacement approach to vehicle repair. Regardless of how many parts require replacement, the costs are covered as long as they adhere to the terms and conditions outlined in the warranty. As vehicle repair costs continue to surge, securing an after-market warranty before facing a substantial repair bill ensures financial protection and peace of mind for vehicle owners.
                                    </Text>
                                </Stack>
                            </Box>
                        </SimpleGrid>
                    </Box>
                </Container>
            </Box>

            <Box style={{ backgroundImage: "linear-gradient(to right, rgba(52, 30, 124, 0.96), rgb(73, 55, 55)),url(/images/background.png)" }} py={30} >
                <Container size={'xl'} mt={20} py={30}>
                    <Text fz={35} fw={900} ff='Lato' variant="gradient" gradient={{ from: 'violet.2', to: 'orange.5' }} mb={20}>
                        HOW WE CAN HELP YOU
                    </Text>
                    <Stack >
                        <EzCardBorder
                            title='Our Assistance In After-Market Vehicle Warranties'
                            description='We are dedicated to providing a solution to the escalating costs associated with the prevailing parts-replacement approach to vehicle repair. After-market vehicle warranties emerge as a valuable protective measure, shielding you from the financial burden of extensive parts replacement. Irrespective of the number of components repaired, the associated costs are fully covered, ensuring comprehensive protection as long as they adhere to the specified terms and conditions of the warranty.'
                            image='images/supports/01.JPG' color='primary'
                            direction='row-reverse'
                        />
                        <EzCardBorder
                            title='Choosing A Warranty Plan'
                            description='If you are considering the adoption of one of our warranty plans, we offer a range of options tailored to meet your unique needs. Our warranty plans are designed to alleviate the financial strain associated with modern vehicle repairs, offering coverage for a diverse array of components. To obtain the latest quotation pricing for our warranty plans or to address any inquiries you may have, our dedicated team is here to help you. We are committed to ensuring that you make an informed decision and receive the utmost value from our warranty plans.'
                            image='images/supports/EZC06943.JPG' color='primary'
                        />
                        <EzCardBorder
                            title='Contact Us For Inquiries'
                            description='Whether you are interested in exploring our warranty plans, seeking the most up-to-date quotation pricing, or simply have inquiries regarding our services, feel free to reach out to us. Our team is readily available to provide comprehensive information, address your concerns and guide you through the process of selecting the most suitable warranty plan for your vehicle. Your satisfaction and peace of mind are our priorities and we are here to assist you every step of the way.'
                            image='/images/features/staffsupport.jpeg' color='primary'
                            direction='row-reverse'
                            content={<Button leftSection={<IconPhone size={18} />} radius={'xl'} color='primary.9' mr={10} w={'50%'} onClick={() => router.get(route('contact-us'))}>Contact Us</Button>}
                        />
                    </Stack>

                </Container>
            </Box>

            <Stack justify='center' mt={50}>
                <Group justify='center' py={30} pb={0} gap={50}>
                    <Image src={'/images/mobileservicelogo.png'} w={220} />
                    <Image src={'/images/ezcare_warranty_logo_award.png'} w={220} />
                    <Image src={'/images/ecwgaragelogo.png'} w={220} />
                </Group>
                <Text fz={30} ta='center' px={20}>We are Ezcare Warranty. We care & We protect.</Text>

                <Text fz={24} ta='center' mt={20}>Find Us On:</Text>
                <Group justify='center' mt={0}>
                    <ActionIcon variant='gradient' size={60} radius="xl" bg='blue' component="a" href="https://www.facebook.com/ezcarewarrantyofficial" target="_blank">
                        <IconBrandFacebook style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant='gradient' size={60} radius="xl" bg='black' component="a" href="https://www.tiktok.com/@ezcarewarranty" target="_blank">
                        <IconBrandTiktok style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>

                <Group justify='center' mt={20}>
                    <Card bg='white' p={10}>
                        <Text ta='center' mb={15} mt={5} fw='bold'>Also Available in:</Text>
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
            </Stack>


            {/* <Container fluid bg={'#2C2F72'} py={50}>
                <EzCommentsCarousel />
            </Container> */}


            {/* <WAFloatingButton /> */}
        </>
    );
}

Home.layout = (page: any) => <Guestlayout children={page} />;
