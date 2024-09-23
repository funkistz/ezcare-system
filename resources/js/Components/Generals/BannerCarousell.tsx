import React, { useMemo } from 'react';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

export default function BannerCarousell({ banners }: any) {

    const slides = useMemo(() => banners.map((banner: any) => (
        <Carousel.Slide key={banner.id}>
            <Image src={banner.image_url} />
        </Carousel.Slide>
    )), [banners])

    return (
        <Carousel
            withIndicators
            loop
        >
            {slides}
        </Carousel>
    )
}
