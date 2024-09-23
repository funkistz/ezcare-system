import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, Affix, Button, Group, SimpleGrid, Paper, rem, BackgroundImage, ThemeIcon, Divider } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1 } from '@/features/app-blog';
import classes from './ContactUs.module.css';
import { IconAt, IconPhone, IconMapPin, IconSun, IconBrandWhatsapp, IconPhoneCall, IconMail, IconMapPinFilled, IconMessageChatbot } from '@tabler/icons-react';
import { ContactIconsListMy } from './ContactIconsMy';
import { EzHeroTitle } from '@/features/app-blog/componenst/EzHeroTitle';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import GoogleMapReact from 'google-map-react';

const SectionTitle = ({ label, label2 }: any) => {
    return (<Stack mb={30} justify='center'>
        <Text fw={600} fz={{ base: 20, sm: 20, lg: 25 }} c='gray.7' ta='center' lh={1.2}>
            {label}
        </Text>
        {label2 && <Text fw={900} fz={{ base: 35, sm: 35, lg: 40 }} variant="gradient" gradient={{ from: 'violet.7', to: 'orange.5' }} ta='center' lh={0.8}>
            {label2}
        </Text>}
    </Stack>)
}

const CallSection = ({ title, whatsapp, call, email }: any) => {
    return (<Paper bg={'primary.0'} p={'xs'} radius={'lg'} mt={20}>
        <Container size="xl" py={0} px={20}>
            <Box py="lg">
                <Group grow>
                    <SimpleGrid px={'20%'} cols={2}>
                        <SectionTitle label={title} />

                        <Group justify='center' gap={80}>
                            <Group>
                                <ThemeIcon color='green.4' radius='xl' size={50}>
                                    <IconBrandWhatsapp />
                                </ThemeIcon>
                                <Stack gap={0}>
                                    <Text fz={20}>Whatsapp </Text>
                                    <Text fz={18}>{whatsapp}</Text>
                                </Stack>
                            </Group>
                            {/* <Group>
                                <ThemeIcon color='blue.4' radius='xl' size={50}>
                                    <IconPhone />
                                </ThemeIcon>
                                <Stack gap={0}>
                                    <Text fz={20}>Call Us</Text>
                                    <Text fz={18}>{call}</Text>
                                </Stack>
                            </Group> */}
                            {/* <Group>
                                <ThemeIcon color='red.4' radius='xl' size={50}>
                                    <IconMail />
                                </ThemeIcon>
                                <Stack gap={0}>
                                    <Text fz={20}>Our Email</Text>
                                    <Text fz={18}>{email}</Text>
                                </Stack>
                            </Group> */}
                        </Group>
                    </SimpleGrid>
                </Group>
            </Box>
        </Container>
    </Paper>)
}

const AnyReactComponent = ({ text, link }: any) => <Stack gap={0} w={200} align='center' onClick={() => { window.open(link, '_blank') }}>
    <Paper bg={'black'} px={10}>
        <Text fz={12} c='white'>{text}</Text>
    </Paper>
    <IconMapPinFilled color='red' style={{ color: 'red', width: 30, height: 40 }} />
</Stack>;
export default function ContactUs() {

    const { t } = useLaravelReactI18n();

    const hqMapProps = {
        name: 'Headquarters',
        link: '',
        center: {
            lat: 2.9648643115607403,
            lng: 101.75220498411475
        },
        zoom: 15,
        address: <>NO 1A & 3A, <br></br>JALAN 8/1,SEKSYEN 8,<br></br>43650 BANDAR BARU BANGI, SELANGOR</>
    };
    const sroMapProps = {
        name: 'SOUTHERN REGION OFFICE',
        link: 'https://www.google.com/maps?ll=1.546487,103.710808&z=14&t=m&hl=en-US&gl=US&mapclient=embed&cid=4939781664876808217',
        center: {
            lat: 1.5488464828367718,
            lng: 103.71115132274316
        },
        zoom: 15,
        address: <>12, JALAN SETIA TROPIKA 1/7,TAMAN SETIA TROPIKA,<br></br>81200 JOHOR BAHRU,<br></br> JOHOR DARUL TAKZIM</>
    };
    const emrMapProps = {
        name: 'EAST MALAYSIA REGION OFFICE',
        link: 'https://www.google.com/maps/place/Ezcare+Warranty+(East+Malaysia+Region)/@1.5689645,110.4057984,17z/data=!3m1!5s0x31fba78b2f9b4ddf:0xc06028894318fd06!4m16!1m9!3m8!1s0x31fba707355a7f1b:0xe4549308aa7e4e3d!2sEzcare+Warranty+(East+Malaysia+Region)!8m2!3d1.5689645!4d110.4083787!9m1!1b1!16s%2Fg%2F11t4bs31rm!3m5!1s0x31fba707355a7f1b:0xe4549308aa7e4e3d!8m2!3d1.5689645!4d110.4083787!16s%2Fg%2F11t4bs31rm?hl=en-US&entry=ttu ',
        center: {
            lat: 1.5691521842283982,
            lng: 110.40842696475242
        },
        zoom: 15,
        address: <>LOT 3235, (SL 12), ITSHMUS SHOWROOM <br></br>JALAN KERUING,<br></br>93450 KUCHNG, SARAWAK<br></br></>
    };
    const idMapProps = {
        name: 'INDONESIA OFFICE',
        link: 'https://www.google.com/maps/place/Ezcare+Warranty+Indonesia/@-6.2625204,106.7939431,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1ab02de7bc7:0x7ea27c7b3a3cb85a!8m2!3d-6.2625204!4d106.7965234!16s%2Fg%2F11vjblppmp?hl=en-US&entry=ttu',
        center: {
            lat: -6.262312436128727,
            lng: 106.79648048465711
        },
        zoom: 15,
        address: <>JL. RS. FATMAWATI RAYA NO 9B,<br></br>RT. 2/RW 7, <br></br> GANDARIA UTARA KEC. KBY. BARU, <br></br> KOTA JAKARTA SELATAN <br></br> DAERAH KHUSUS IBUKOTA JAKARTA, 12140 INDONESIA</>
    };

    const mapsProp = [
        hqMapProps, sroMapProps, emrMapProps, idMapProps
    ];

    return (
        <>
            <Head title='Ezcare' />

            <EzHeroTitle title={t('cu_1')}
                content={<Image src="/images/features/staffsupport.jpeg" radius={'lg'} w={{ base: '100%', sm: '35%' }} mt={15} />} />

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

                            <ContactIconsListMy />
                        </div>
                        <Stack align='end' justify='end' pt={20} gap={'xl'}>
                            {!!mapsProp && mapsProp.map((mapProp: any, index: any) => {
                                return <Stack w='100%' gap={5} key={index}>
                                    {index != 0 && <Divider variant='dashed' />}
                                    <Text fw='bold' c='primary.1' fz={22} mt={20} tt='uppercase'>{mapProp.name}</Text>
                                    <Text mb={10} c='primary.1' style={{lineHeight: 1.5}}>{mapProp.address}</Text>
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
