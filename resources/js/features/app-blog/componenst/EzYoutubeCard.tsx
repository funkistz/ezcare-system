import { SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import classes from './EzYoutubeCard.module.css';
import YoutubeEmbed from './EzYoutubeEmbed';

const mockdata = [
    {
        title: 'ECW Mobile Service 2020',
        id: 'QND0vzy_QLs',
        date: 'Oct 15, 2020',
    },
    {
        title: 'ECW Mobile Service 2020 - 04 CM',
        id: 'cW7gmRKo_YA',
        date: 'Oct 15, 2020',
    },
    {
        title: 'ECW Mobile Service 2020 - 06 CM',
        id: 'aXeZ98ArcYM',
        date: 'Oct 16, 2020',
    },
    {
        title: 'ECW Mobile Service 2020 - 07 CM',
        id: 'QHKeUS8iLUE',
        date: 'Nov 7, 2020',
    },
];

export function EzYoutubeCard() {
    const cards = mockdata.map((article) => (
        <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
            <AspectRatio ratio={1920 / 1080}>
                <YoutubeEmbed embedId={article.id} />
            </AspectRatio>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
                {article.date}
            </Text>
            <Text className={classes.title} mt={5}>
                {article.title}
            </Text>
        </Card>
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
                Watch Our Video
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
        </>
    );
}