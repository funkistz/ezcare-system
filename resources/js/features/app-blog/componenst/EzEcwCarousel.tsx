import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Text, Title, Button, useMantineTheme, rem } from '@mantine/core';
import classes from './EzEcwCarousel.module.css';

interface CardProps {
    image: string;
    title: string;
    category: string;
}

function Card({ image, title, category }: CardProps) {
    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {category}
                </Text>
                {/* <Title order={3} className={classes.title}>
                    {title}
                </Title> */}
            </div>
            {/* <Button variant="white" color="dark">
                Read article
            </Button> */}
        </Paper>
    );
}

const data = [
    {
        image:
            '/images/features/ecw/mobileservice01.png',
        title: 'Best forests to visit in North America',
        category: 'Ezcare Warranty',
    },
    {
        image:
            '/images/features/ecw/mobileservice02.png',
        title: 'Hawaii beaches review: better than you think',
        category: 'Ezcare Warranty',
    },
    {
        image:
            '/images/features/ecw/mobileservice03.png',
        title: 'Mountains at night: 12 best locations to enjoy the view',
        category: 'Ezcare Warranty',
    },
    {
        image:
            '/images/features/ecw/mobileservice04.png',
        title: 'Aurora in Norway: when to visit for best experience',
        category: 'Ezcare Warranty',
    },
    {
        image:
            '/images/features/ecw/mobileservice05.png',
        title: 'Best places to visit this winter',
        category: 'Ezcare Warranty',
    },
    {
        image:
            '/images/features/ecw/mobileservice06.png',
        title: 'Active volcanos reviews: travel at your own risk',
        category: 'Ezcare Warranty',
    },
];

export function EzEcwCarousel() {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const slides = data.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} />
        </Carousel.Slide>
    ));

    return (
        <>
            <Text
                fz={45}
                fw={900}
                variant="gradient"
                gradient={{ from: 'violet', to: 'rgba(219, 96, 96, 1)', deg: 102 }}
                ta='center'
                mb={30}
            >
                Our Mobile Service Unit
            </Text>
            <Carousel
                slideSize={{ base: '100%', sm: '33%' }}
                slideGap={{ base: 20, sm: 20 }}
                align="start"
                slidesToScroll={mobile ? 1 : 2}
                loop
            >
                {slides}
            </Carousel>
        </>

    );
}