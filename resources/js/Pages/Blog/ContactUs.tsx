import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, Affix, Button, Group, SimpleGrid, Paper, rem, BackgroundImage, Divider } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1 } from '@/features/app-blog';
import classes from './ContactUs.module.css';
import { IconAt, IconPhone, IconMapPin, IconSun, IconMessageChatbot, IconMapPinFilled } from '@tabler/icons-react';
import { ContactIconsList } from './ContactIcons';
import { EzHeroTitle } from '@/features/app-blog/componenst/EzHeroTitle';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ContactIconsListMy } from './ContactIconsMy';
import GoogleMapReact from 'google-map-react';

export default function ContactUs() {

    const { t } = useLaravelReactI18n();

    const hqMapProps = {
        name: 'INDONESIA OFFICE',
        link: '',
        center: {
            lat: -6.286299676990937,
            lng: 106.79513824667168
        },
        zoom: 15,
        address: <>JL. RS. FATMAWATI RAYA NO 9B,<br />
            RT. 2/RW 7,<br />
            GANDARIA UTARA KEC. KBY. BARU,<br />
            KOTA JAKARTA SELATAN<br />
            DAERAH KHUSUS IBUKOTA JAKARTA, 12140 INDONESIA</>
    };

    const mapsProp = [
        hqMapProps
    ];

    const AnyReactComponent = ({ text, link }: any) => <Stack gap={0} w={200} align='center' onClick={() => { window.open(link, '_blank') }}>
        <Paper bg={'black'} px={10}>
            <Text fz={12} c='white'>{text}</Text>
        </Paper>
        <IconMapPinFilled color='red' style={{ color: 'red', width: 30, height: 40 }} />
    </Stack>;

    return (
        <>
            <Head title='Ezcare' />

            <EzHeroTitle title={t('cu_1')} />

            <Container size={'xl'} mt={30}>
                {/* 
                <Paper p={20} bg='primary' mb={20}>
                    <Paper shadow="md" radius='lg' style={{ overflow: 'hidden' }} h={400}>
                        <BackgroundImage h={'100%'} src="/images/supports/contactus.jpg" />
                    </Paper>
                </Paper> */}

                <Box className={classes.wrapper} p={{ base: 30, xs: 30, sm: 50 }} bg='primary.8'>
                    <Container pos='relative' >
                        <IconMessageChatbot color='white' size={150} opacity={0.15} style={{ position: 'absolute', top: -40, left: 210, transform: 'rotate(0deg)' }} />
                    </Container>

                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20}>
                        <div>
                            <Text className={classes.title} variant="gradient" gradient={{ from: 'primary.2', to: 'orange.5' }} >{t('cu_2')}</Text>
                            <Text className={classes.description} mt="sm" mb={30}>
                                {t('cu_3')}
                            </Text>

                            <ContactIconsList />
                        </div>
                        <Stack align='end' justify='end' pt={20} gap={'xl'}>
                            {!!mapsProp && mapsProp.map((mapProp: any, index: any) => {
                                return <Stack w='100%' gap={5} key={index}>
                                    {index != 0 && <Divider variant='dashed' />}
                                    <Text fw='bold' c='primary.1' fz={22} mt={20} tt='uppercase'>{mapProp.name}</Text>
                                    <Text mb={10} c='primary.1' style={{ lineHeight: 1.5 }}>{mapProp.address}</Text>
                                    <Paper style={{ height: 400, width: '100%', overflow: 'hidden' }} shadow="md" radius='lg' >
                                        <GoogleMapReact
                                            bootstrapURLKeys={{ key: "AIzaSyBGeRaOYa2t18ONAyJ5c7h2vYPqvF39R5E" }}
                                            defaultCenter={mapProp.center}
                                            defaultZoom={mapProp.zoom}
                                            yesIWantToUseGoogleMapApiInternals
                                        >
                                            <AnyReactComponent
                                                lat={mapProp.center.lat}
                                                lng={mapProp.center.lng}
                                                text={mapProp.name}
                                                link={mapProp.link}
                                            />
                                        </GoogleMapReact>
                                    </Paper>
                                </Stack>
                            })}
                        </Stack>


                        {/* https://www.google.com/maps?ll=1.546487,103.710808&z=14&t=m&hl=en-US&gl=US&mapclient=embed&cid=4939781664876808217 */}

                    </SimpleGrid>
                    {/* <Paper shadow='xl' radius='lg' p={'xl'} h={400} mt={60}>
                        map
                    </Paper> */}
                </Box>

                {/* <CallSection title="JOHOR DARUL TA'ZIM" whatsapp='017 - 753 3539' call='013 - 288 0177' email='info@ezcare-warranty.com' />
                <CallSection title="MELAKA" whatsapp='012 - 243 1834' call='013 - 288 0177' email='info@ezcare-warranty.com' />
                <CallSection title="PENANG" whatsapp='018 - 245 5196' call='013 - 288 0177' email='info@ezcare-warranty.com' />
                <CallSection title="KEDAH DARUL AMAN" whatsapp='017 - 443 0680' call='013 - 288 0177' email='info@ezcare-warranty.com' />
                <CallSection title="PERAK DARUL RIDZUAN" whatsapp='012 - 343 4957' call='013 - 288 0177' email='info@ezcare-warranty.com' />
                <CallSection title="PAHANG DARUL MAKMUR" whatsapp='014 - 606 4074' call='013 - 288 0177' email='info@ezcare-warranty.com' />
                <CallSection title="KELANTAN DARUL NAIM" whatsapp='013 - 913 0974' call='013 - 288 0177' email='info@ezcare-warranty.com' />
                <CallSection title="SABAH" whatsapp='017 - 810 2907' call='013 - 288 0177' email='info@ezcare-warranty.com' />
                <CallSection title="SARAWAK" whatsapp='010 - 382 4234' call='013 - 288 0177' email='info@ezcare-warranty.com' /> */}

            </Container>

            {/* <WAFloatingButton /> */}
        </>
    );
}

ContactUs.layout = (page: any) => <Guestlayout children={page} />;
