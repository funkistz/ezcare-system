import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, SimpleGrid, Button, Paper, ThemeIcon, Group, Divider, ScrollArea, Flex, Card, BackgroundImage, Center, rem } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1, EzGetQuotation, EzCoverage } from '@/features/app-blog';
import { EzHeroTitle } from '@/features/app-blog/componenst/EzHeroTitle';
// import classes from './EcwMobileServices.module.css';
import { ContactIconsList } from './ContactIcons';
import { IconArrowRight, IconBrandWhatsapp, IconCar, IconCheck, IconColorSwatch, IconFileCertificate, IconInfoCircle, IconPresentationAnalytics, IconSignRight, IconUsersGroup } from '@tabler/icons-react';
import { EzEcwCarousel } from '@/features/app-blog/componenst/EzEcwCarousel';
import { EzYoutubeCard } from '@/features/app-blog/componenst/EzYoutubeCard';
import classes from './Career.module.css';


export default function Career() {

    const { careers }: any = usePage<PageProps>().props;

    console.log(careers)

    const ItemWrapper = ({ label }: any) => {

        return <Group>
            <ThemeIcon color='lime' size='sm'>
                <IconCheck color='white' />
            </ThemeIcon>
            <Text fz='md'>{label}</Text>
        </Group>

    }

    const SectionTitle = ({ label, label2, size = 1, align = 'center' }: any) => {
        return (<Stack mb={40} justify={'center'}>
            <Text fw={900} fz={{ base: 30 * size, sm: 30 * size, lg: 35 * size }} variant="gradient" gradient={{ from: 'violet.7', to: 'orange.5' }} ta={align} lh={1.2}>
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
                <Button color={'orange'} radius={'md'} rightSection={<IconBrandWhatsapp />}>Make Appintment Now!</Button>
            </div>
        </Paper>

    }

    const Vacancy = (data:any) => {

        const result = data.data;

        return  <Paper withBorder radius="md" className={classes.card}>
            <SectionTitle label={result.name} align={'left'} />
            {/* <Text size="xl" fw={500} mt="md">
                {result.description}
            </Text> */}
            {/* <Text size="sm" mt="sm">
               {result.description}
            </Text> */}
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {result.description}
            </div>
        </Paper>
    }

    return (
        <>
            <Head title='Ezcare' />

            <EzHeroTitle title={'Careers'}
            // description={'Door to door services covering area in Klang Valley & Johor Bahru.'} 
            />

            <Container size={'xl'} mt={40}>

                <Paper bg={'red.0'} p={'lg'} radius={'lg'} mb={20}>
                    <Container size="xl" py={0} px={20}>
                        <Box py="xl">
                            <Container pos='relative' >
                                <IconPresentationAnalytics color='#862E9C' size={200} opacity={0.1} style={{ position: 'absolute', top: -40, left: -40, transform: 'rotate(0deg)' }} />
                            </Container>
                            <SectionTitle label={'OPPORTUNITIES FOR PROFESSIONAL GROWTH'} />

                            <Text fw={'normal'} mb={20} fz={'lg'} ta='center' px={15}>
                                At Ezcare Warranty, we recognise that our workforce is our most invaluable asset. Fostering a culture of empowerment and open communication, we prioritize providing ongoing opportunities for personal development and the fulfillment of career aspirations. Our commitment to creating a dynamic and results-oriented environment ensures that our team members are equipped to deliver excellent service to our customers.</Text>
                        </Box>
                    </Container>
                </Paper>

                <Paper bg={'red.0'} p={'lg'} radius={'lg'} mb={20}>
                    <Container size="xl" py={0} px={20}>
                        <Box py="xl">
                            <Container pos='relative' >
                                <IconUsersGroup color='#862E9C' size={200} opacity={0.1} style={{ position: 'absolute', top: -40, left: -40, transform: 'rotate(0deg)' }} />
                            </Container>
                            <SectionTitle label={'JOIN OUR MOTIVATED TEAM'} />

                            <Text fw={'normal'} mb={10} fz={18} ta='center' >
                                We are constantly in search of motivated and ambitious individuals who share our commitment to delivering exceptional service. Our team thrives in an environment that encourages growth, collaboration, and achievement.
                            </Text>
                            <Text fw={'normal'} mb={10} fz={18} ta='center' >
                                Whether you possess relevant working experience or are a recent graduate in finance, accounting, IT, economics, marketing,or related business disciplines, we welcome individuals who believe they have the skills and dedication to contribute to a forward-looking organization.
                            </Text>
                        </Box>
                        <Center w={'100%'}>
                            <Paper w={{ base: '100%', sm: '70%' }}>
                                <Image
                                    radius="xl"
                                    src="/images/supports/team01.jpg"
                                />
                            </Paper>
                        </Center>

                    </Container>
                </Paper>
            </Container>

            <Box style={{ backgroundImage: "linear-gradient(to right, rgba(52, 30, 124, 0.96), rgb(73, 55, 55)),url(/images/background.png)" }} pb={60}>

                <Container size={'xl'} mt={40} ff='Roboto' >

                    <Paper bg={'transparent'} radius={'lg'}  >
                        <Container size="xl" pt={30} px={'xl'} >
                            <Box py="xl" pb={0}>
                                <SectionTitle label={'APPLICATION PROCESS'} />

                                <Text fw={'normal'} mb={40} fz={20} ta='center' px={15} c='white'>
                                    If you are ready to be part of a dynamic team and believe you meet the criteria for joining Ezcare Warranty, we invite you to apply by submitting your application below. Alternatively, you can write in with your CV and copies of transcripts, sending them to career@ezcare-warranty.com. We value professionalism, commitment to personal development, and a long-term perspective on career advancement.
                                </Text>

                                <SectionTitle label={'PROFESSIONALISM AND COMMITMENT REWARDED'} />

                                <Text fw={'normal'} mb={20} fz={20} ta='center' px={15} c='white'>
                                    Ezcare Warranty is dedicated to attracting individuals who exhibit professionalism in their work and are committed to personal development and long-term career advancement. By fostering a conducive working environment, we aim to provide not only a platform for professional growth but also a competitive remuneration package. Your dedication to excellence aligns with our values, and we invite you to explore the opportunities for career advancement within our organization.
                                </Text>
                            </Box>
                        </Container>


                    </Paper>

                </Container>

                {/* <Carousel slideSize={{ base: "55%", sm: "25%", xl: "22%" }} align="start" slideGap="xl" loop controlSize={50} withIndicators py={40}>
                    <Carousel.Slide>
                        <Image radius='lg' src={'/images/buildingMy.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image radius="lg" src={'/images/buildingMy.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image radius="lg" src={'/images/buildingMy.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image radius="lg" src={'/images/buildingMy.png'} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image radius="lg" src={'/images/buildingMy.png'} />
                    </Carousel.Slide>
                </Carousel> */}
            </Box>

            <Paper bg={'white'} p={'lg'} radius={'lg'} mt={50}>
                <Container size="xl" py={0} px={20}>
                    <Box py="xl">
                        <Container pos='relative' >
                            {/* <IconAugmentedReality color='#862E9C' size={200} opacity={0.1} style={{ position: 'absolute', top: -40, left: -40, transform: 'rotate(0deg)' }} /> */}
                        </Container>
                        <SectionTitle label={'AWAITS YOU'} />

                        <Text fw={'normal'} mb={20} fz={'lg'} ta='center' px={15}>
                            Joining Ezcare Warranty not only opens doors to career growth but also introduces you to a supportive work environment where your contributions are valued.
                        </Text>
                        <Text fw={'normal'} mb={20} fz={'lg'} ta='center' px={15}>
                            We encourage you to take the first step toward a fulfilling career by applying and becoming an integral part of a team that is forward-looking and committed to delivering outstanding service in the automotive industry. Your journey with us begins here.
                        </Text>

                        <Paper shadow='md' withBorder p='xl' mt={80} ta='center' bg='orange.0' pt={20} >
                            <IconInfoCircle color='orange' size={80} opacity={0.5} />
                            <Text fw={'normal'} mb={20} fz={'lg'} pt={10}>
                                If you have the relevant working experience or have just graduated in finance, accounting, IT, economics, and marketing or relevant business disciplines, and believe you have what it takes to be part of a dynamic team in a forward-looking organisation, you can apply below or write-in with your CV and copies of transcripts to:
                            </Text>
                            <a href="mailto:someone@example.com">
                                <Text fw={'normal'} fz={'lg'}>career@ezcare-warranty.com</Text>
                            </a>
                        </Paper>


                        
                     
                        {careers.data && careers.data.length > 0 && <Stack mt={50}>
                            {careers.data.map((item:any, i:any)=> {
                                return  <Vacancy key={i} data={item} />
                            })}
                        </Stack>}
                       
                        

                    </Box>
                </Container>
            </Paper>

            <WAFloatingButton />
        </>
    );
}

Career.layout = (page: any) => <Guestlayout children={page} />;
