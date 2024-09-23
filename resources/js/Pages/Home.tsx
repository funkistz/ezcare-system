import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, Affix, Button, Group, ActionIcon, Card } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1, EzGetQuotation, EzCoverage } from '@/features/app-blog';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandWhatsapp, IconPhone } from '@tabler/icons-react';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { AppGalleryButton, AppStoreButton, GooglePlayButton } from 'react-mobile-app-button';
import EzWorkshopMap from '@/features/app-blog/componenst/EzWorkshopMap';
export default function Home() {

    const { banners }: any = usePage<PageProps>().props;
    const autoplay = useRef(Autoplay({ delay: 3000 }));

    return (
        <>
            <Box>

                <Carousel
                    withIndicators
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                    loop
                >
                    <Carousel.Slide>
                        <Image src={'/images/banner/banner_mobileapp.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={'/images/banner/banner_general.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={'/images/banner/banner_supercar.png'} />
                    </Carousel.Slide>
                </Carousel>

            </Box>
            {/* <Container fluid mx={'xl'} my={50} mb={50} >
                <EzGetQuotation />
            </Container > */}
            <EzGetQuotation />

            <EzBenefitsCarousel />

            <EzWorkshopMap />

            <EzCoverage />

            <EzFeature1 />

            <Stack justify='center' mt={50}>
                <Group justify='center' py={30} pb={0}>
                    <Image src={'/images/ezcare_warranty_logo_award.png'} w={250} />
                </Group>
                <Text fz={30} ta='center' px={20}>We are Ezcare Warranty. We care & We protect.</Text>

                <Text fz={24} ta='center' mt={20}>Find Us On:</Text>
                <Group justify='center' mt={0}>
                    <ActionIcon variant='gradient' size={60} radius="xl" bg='blue' component="a" href="https://www.facebook.com/ezcarewarrantyindonesia" target="_blank">
                        <IconBrandFacebook style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant='gradient' size={60} radius="xl" bg='black' component="a" href="https://www.tiktok.com/@ezcarewarranty.indonesia" target="_blank">
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
