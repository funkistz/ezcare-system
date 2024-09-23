import React, { useRef } from 'react'
import { Image, Box, Text, Title, Stack, Button, Group, SimpleGrid, Card, Container, Flex } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconArrowRight, IconQuestionMark } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function EzWorkshopMap() {

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
                        BENGKEL REKANAN EZCARE WARRANTY INDONESIA
                    </Title>
                </Stack>

                <Image src={'/images/indonesiamap.png'} w={{ base: '100%', sm: '100%', md: '100%', xl: '100%' }} mb={{ base: 20, sm: 20, xl: 50 }} />
            </Box>
        </Container>
    )
}
