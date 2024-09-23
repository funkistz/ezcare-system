import React, { useRef } from 'react'
import { Image, Box, Text, Title, Stack, Button, Group, SimpleGrid, Card, Container, Flex } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconArrowRight, IconQuestionMark } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function EzBenefitsCarousel() {

    const autoplay = useRef(Autoplay({ delay: 4000 }));
    const { t } = useLaravelReactI18n();

    const benfitContainer = (title: any, image: any) => {
        return <Stack align="center" px={'lg'}>
            <Image src={image} w={'30%'} />
            <Stack align="center" gap={0}>
                <Text fw={'bolder'} ta="center">{title}</Text>
            </Stack>
        </Stack>
    }

    const BenfitContainer2 = ({ label, label2, image }: any) => {
        return <Stack justify='flex-start' align='center' px={'xl'} w={{ base: '50%', sm: '50%', lg: '30%' }} mb={30}>
            <Card shadow='lg' p={0} radius={'xl'} ta='center' w={140} h={140} style={{ border: '2px solid #666' }}>
                <Image src={image} w='102%' ml={-2} mt={-2} />
            </Card>
            <Stack px={{ base: 'xs', sm: 'xs', lg: 'xl' }} align="center" justify="flex-start">
                <Text fz={{ base: 15, sm: 15, lg: 16 }} ta='center' tt='uppercase' fw='bolder' mt={10}>{label}</Text>
                {label2 && <Text fz={{ base: 12, sm: 12, lg: 12 }} ta='center' tt='uppercase' fs='italic' fw='bolder' mt={-15}>{label2}</Text>}
            </Stack>
        </Stack>
    }

    return (
        <Container size={'xl'} pb={50}>
            <Box ff='Roboto' pos='relative'>
                <Container pos='relative' style={{ overflow: 'hidden' }}>
                    {/* <IconQuestionMark color='#862E9C' size={80} opacity={0.8} style={{ position: 'absolute', top: -30, right: 100, transform: 'rotate(0deg)' }} /> */}
                    {/* <IconQuestionMark color='#862E9C' size={150} opacity={0.5} style={{ position: 'absolute', top: -50, right: -30, transform: 'rotate(45deg)' }} /> */}
                </Container>
                <Stack align="center" mt={80} mb={90}>
                    <Title order={3} fz={35} fw={900} ff='Lato' ml={{ base: 15, sm: 15, lg: 0 }} mt={{ base: -10, sm: -10, lg: 0 }} tt='uppercase'>
                        {t('bc_1')}
                        {/* <Text component='span' fz={50} ff='Lato' fw={900} ml={10}>?</Text> */}
                    </Title>
                </Stack>

                <Flex justify="center" wrap='wrap' >
                    <BenfitContainer2 image='/images/features/benefits/freediagnosis.png' label={t('bc_2')} />
                    <BenfitContainer2 image='/images/features/benefits/openworkshop.png' label={t('bc_3')} label2={t('bc_12')} />
                    <BenfitContainer2 image='/images/features/benefits/upto7years.png' label={t('bc_4')} label2={t('bc_12')} />
                    <BenfitContainer2 image='/images/features/benefits/fastclaim.png' label={t('bc_5')} />
                    <BenfitContainer2 image='/images/features/benefits/directdeal.png' label={t('bc_6')} />
                    <BenfitContainer2 image='/images/features/benefits/notaffiliated.png' label={t('bc_7')} />
                    <BenfitContainer2 image='/images/features/benefits/experiencestaff.png' label={t('bc_8')} />
                    <BenfitContainer2 image='/images/features/benefits/24hsupport.png' label={t('bc_9')} />
                    <BenfitContainer2 image='/images/features/benefits/mobileapp.png' label={t('bc_10')} />
                    <BenfitContainer2 image='/images/features/benefits/towingassist.png' label={t('bc_11')} />
                </Flex>

                {/* <Group justify="center" mt={40}>
                    <Button variant="transparent" color="rgba(0, 0, 0, 1)" size='lg' p={0} rightSection={<IconArrowRight color='red' />}>Find Out More</Button>
                </Group> */}

                {/* <Carousel
                withIndicators
                slideSize="15%"
                controlSize={38}
                align="start"
                dragFree
                loop
                controlsOffset={0}
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
            >
                <Carousel.Slide>
                    {benfitContainer('Free diagnosis and consultation', '/images/features/benefits/freeicon.png')}
                </Carousel.Slide>
                <Carousel.Slide>
                    {benfitContainer('OPEN WORKSHOP CONCEPT', '/images/features/benefits/openworkshopicon.png')}
                </Carousel.Slide>
                <Carousel.Slide>
                    {benfitContainer('QUALITY SPARE PARTS SUPPLY', '/images/features/benefits/spareparticon.png')}
                </Carousel.Slide>
                <Carousel.Slide>
                    {benfitContainer('UP TO 5 YEARS COVERAGE', '/images/features/benefits/5yearsicon.png')}
                </Carousel.Slide>
                <Carousel.Slide>
                    {benfitContainer('FAST CLAIM PROCESS', '/images/features/benefits/fastclaimicon.png')}
                </Carousel.Slide>
                <Carousel.Slide>
                    {benfitContainer('DIRECT DEAL WITH US', '/images/features/benefits/directdeal.png')}
                </Carousel.Slide>
                <Carousel.Slide>
                    {benfitContainer('NO AGREEMENT WITH OTHER INSURANCE COMPANIES', '/images/features/benefits/noagreementicon.png')}
                </Carousel.Slide>
                <Carousel.Slide>
                    {benfitContainer('EXPERIENCED AND RESPONSIVE TECHNICAL TEAM', '/images/features/benefits/technicalteam.png')}
                </Carousel.Slide>
                <Carousel.Slide>
                    {benfitContainer('WITHIN 24 HOURS NATIONWIDE ASSISTANCE', '/images/features/benefits/24hassistanceicon.png')}
                </Carousel.Slide>
                <Carousel.Slide>
                    {benfitContainer('REIMBURSEMENT FOR TOWING COSTS', '/images/features/benefits/towingicon.png')}
                </Carousel.Slide>

            </Carousel> */}



            </Box>
        </Container>
    )
}
