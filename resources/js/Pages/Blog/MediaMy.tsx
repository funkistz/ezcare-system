import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, SimpleGrid, Button, Paper, ThemeIcon, Group, Divider, ScrollArea, Flex, Card, BackgroundImage } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1, EzGetQuotation, EzCoverage } from '@/features/app-blog';
import { EzHeroTitle } from '@/features/app-blog/componenst/EzHeroTitle';
import classes from './EcwMobileServices.module.css';
import { ContactIconsList } from './ContactIcons';
import { IconArrowRight, IconBrandWhatsapp, IconCar, IconCheck, IconFileCertificate, IconSignRight } from '@tabler/icons-react';
import { EzEcwCarousel } from '@/features/app-blog/componenst/EzEcwCarousel';
import { EzYoutubeCard } from '@/features/app-blog/componenst/EzYoutubeCard';

export default function Media() {

    const { banners }: any = usePage<PageProps>().props;

    const ItemWrapper = ({ label }: any) => {

        return <Group>
            <ThemeIcon color='lime' size='sm'>
                <IconCheck color='white' />
            </ThemeIcon>
            <Text fz='md'>{label}</Text>
        </Group>

    }

    const SectionTitle = ({ label, label2, size = 1 }: any) => {
        return (<Stack mb={40} justify='center'>
            <Text fw={900} fz={{ base: 30 * size, sm: 30 * size, lg: 35 * size }} variant="gradient" gradient={{ from: 'violet.7', to: 'orange.5' }} ta='center' lh={1.2}>
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

    return (
        <>
            <Head title='Ezcare' />

            <EzHeroTitle title={'Media'}
            // description={'Door to door services covering area in Klang Valley & Johor Bahru.'} 
            />

            <Container size={'xl'} mt={40}>

                <div style={{
                    left: 0,
                    width: "100%",
                    height: 500,
                    position: "relative"
                }}>
                    <iframe
                        src="/my/tiktokEmbed"
                        style={{
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            border: 0
                        }}
                        // allowfullscreen
                        scrolling="no"
                        allow="encrypted-media;"
                    ></iframe>
                </div>
                {/* <blockquote className="tiktok-embed" cite="https://www.tiktok.com/@ezcarewarranty" data-unique-id="ezcarewarranty" data-embed-type="creator" style={{ maxWidth: '100%', minWidth: 288 }} >
                    <section> <a target="_blank" href="https://www.tiktok.com/@ezcarewarranty?refer=creator_embed">@ezcarewarranty</a> </section>
                </blockquote> */}

            </Container>

            <WAFloatingButton />
        </>
    );
}

Media.layout = (page: any) => <Guestlayout children={page} />;
