import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
    Image,
    Stack,
    Paper,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';
import classes from './EzCardBorder.module.css';

const mockdata = [
    {
        title: 'Extreme performance',
        description:
            'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
        icon: IconGauge,
    },
    {
        title: 'Privacy focused',
        description:
            'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
        icon: IconUser,
    },
    {
        title: 'No third parties',
        description:
            'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
        icon: IconCookie,
    },
];

export function EzCardBorder({ title, description, image, imageWidth, direction = 'row', content }: any) {

    return (
        <Card shadow="xs" radius="lg" padding="xl" h={'90%'} style={{ overflow: 'visible' }} withBorder mt={60} mb={20}>
            <Group justify={direction == 'row-reverse' ? 'space-between' : 'start'} align='start' style={{ flexDirection: direction }} mb={15}>
                <Paper
                    maw={{ base: '50%', sm: '40%', md: '35%', lg: '30%' }}
                    w={imageWidth ? imageWidth : 'auto'}
                    mt={-70}
                    mr={direction == 'row-reverse' ? 0 : 20}
                    p={0}
                    shadow='lg'
                >
                    <Image
                        p={0}
                        radius="lg"
                        src={image}
                    />
                </Paper>

                <Stack px={20} maw={{ base: '100%', sm: '100%', md: '55%', lg: '60%' }} >
                    <Text fz={26} fw={600} mt={10}>
                        {title}
                    </Text>
                    <Text fz={'lg'} c='gray.7'>
                        {description}
                    </Text>
                    {content}

                </Stack>


            </Group>

        </Card>
    );
}