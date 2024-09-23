import React from 'react'
import { Image, Box, Text, Title, Stack, Container } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import EzComment from './EzComment';

export default function EzCommentsCarousel() {
    return (
        <>
            <Stack align="center" my={20} gap={0}>
                <Title c='white' >Testimonial</Title>
                <Text c='white' mt="sm" mb={30} fz={20}>
                    What People Say
                </Text>
            </Stack>
            <Carousel withIndicators slideSize={'30%'} slideGap={'lg'} align="start" loop>
                <Carousel.Slide>
                    <EzComment />
                </Carousel.Slide>
                <Carousel.Slide>
                    <EzComment />
                </Carousel.Slide>
                <Carousel.Slide>
                    <EzComment />
                </Carousel.Slide>
                <Carousel.Slide>
                    <EzComment />
                </Carousel.Slide>
            </Carousel>


        </>
    )
}
