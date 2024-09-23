import React from 'react'
import { Box, Paper, Container, SimpleGrid, Title, Text, Button, BackgroundImage, Flex, Stack, Blockquote, Group } from '@mantine/core';
import { IconArrowRight, IconAward, IconQuestionMark, IconStar } from '@tabler/icons-react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function EzFeature1() {

    const { t } = useLaravelReactI18n();

    return (
        <>
            <Box bg={'gray.1'} pb={60} style={{ overflow: 'hidden' }}>
                <Container pos='relative' >
                    <IconAward color='#862E9C' size={250} opacity={0.1} style={{ position: 'absolute', top: 10, right: 0, transform: 'rotate(-10deg)' }} />
                </Container>
                <Container size={'xl'} py={5}>
                    <Box ff='Roboto' pos='relative'>
                        <Stack align="flex-start" mt={80} mb={40}>
                            <Title order={3} fz={35} fw={900} ff='Lato' ml={{ base: 15, sm: 15, lg: 0 }} mt={{ base: -10, sm: -10, lg: 0 }} tt='uppercase'>
                                {t('ft_1')} <span style={{ color: '#862E9C', fontSize: 45, fontWeight: 'bolder', marginLeft: 8 }}>{t('ft_2')}</span> {t('ft_3')}
                            </Title>
                            <Title order={3} fz={35} fw={900} ff='Lato' ml={{ base: 15, sm: 15, lg: 0 }} tt='uppercase'>
                                {t('ft_4')}
                            </Title>
                        </Stack>
                        <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }}>
                            <Box color="violet" mt="xl" fz={22} pr={20} pl={{ base: 20, sm: 20, lg: 0 }} style={{ wordBreak: 'keep-all' }} ta='justify'>
                                {t('ft_10')} <span style={{ color: '#862E9C', fontWeight: 'bolder' }}>{t('ft_11')}</span>{t('ft_12')}
                                {t('ft_13')}
                                {t('ft_14')}
                                <Group mt={40}>
                                    <Button variant="transparent" color="rgba(0, 0, 0, 1)" size='lg' p={0} rightSection={<IconArrowRight color='red' />} href='/about-us' component='a'>{t('ft_15')}</Button>
                                </Group>
                            </Box>
                            <Stack px={{ base: 10, sm: 10, lg: 40 }} justify='flex-end'>
                                <Paper shadow="md" my={{ base: 'xs', sm: 'xs', lg: 'xl' }} radius='lg' style={{ overflow: 'hidden' }} h={300}>
                                    <BackgroundImage h={'100%'} src="/images/banner/EZC08086.JPG" />
                                </Paper>
                            </Stack>

                        </SimpleGrid>
                    </Box>
                </Container>
            </Box>
            {/* 
            <Box bg={'gray.1'}>
                <Container size="xl" py={{ base: 10, sm: 10, lg: 40 }}>

                    <Flex wrap='wrap' direction='column-reverse'>
                        <Box w={{ base: '100%', sm: '100%', lg: '50%' }} p={{ base: 15, sm: 15, lg: 0 }} pr={{ base: 20, sm: 20, lg: 50 }} >
                            <Title order={3} mb={20} style={{ fontFamily: "Roboto Condensed" }}>
                                Know Your Aftermarket
                                <Text fz={35}>Warranty Program</Text>
                            </Title>
                            <Text fw={'normal'} >
                                Ezcare Warranty currently is the only leading aftermarket warranty provider primarily focused in covering the whole country including Sabah and Sarawak. To ensure that our services coverage can be delivered smoothly in an immediate action to customers, we have set our branches and representatives in every region in Malaysia.
                            </Text>
                            <Button mt={30} variant="transparent" color="rgba(0, 0, 0, 1)" size='lg' p={0} rightSection={<IconArrowRight color='red' />}>Find out more</Button>
                        </Box>
                        <Box w={{ base: '100%', sm: '100%', lg: '50%' }} p={{ base: 15, sm: 15, lg: 0 }}>
                            <Paper shadow="md" my={{ base: 'xs', sm: 'xs', lg: 'xl' }} radius='lg' style={{ overflow: 'hidden' }} h={300}>
                                <BackgroundImage h={'100%'} src="/images/features/openworkshop.jpeg" />
                            </Paper>
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <Box bg={'gray.1'}>
                <Container size="xl" py={{ base: 10, sm: 10, lg: 40 }}>
                    <Flex wrap='wrap' direction='column'>
                        <Box w={{ base: '100%', sm: '100%', lg: '50%' }} p={{ base: 15, sm: 15, lg: 0 }} pr={{ base: 20, sm: 20, lg: 50 }} >
                            <Title order={3} mb={20}>
                                Know Your Aftermarket
                                <Text fz={35}>Warranty Program</Text>
                            </Title>
                            <Text fw={'normal'} >
                                Ezcare Warranty currently is the only leading aftermarket warranty provider primarily focused in covering the whole country including Sabah and Sarawak. To ensure that our services coverage can be delivered smoothly in an immediate action to customers, we have set our branches and representatives in every region in Malaysia.
                            </Text>
                            <Button mt={30} variant="transparent" color="rgba(0, 0, 0, 1)" size='lg' p={0} rightSection={<IconArrowRight color='red' />}>Find out more</Button>
                        </Box>
                        <Box w={{ base: '100%', sm: '100%', lg: '50%' }} p={{ base: 15, sm: 15, lg: 0 }}>
                            <Paper shadow="md" my={{ base: 'xs', sm: 'xs', lg: 'xl' }} radius='lg' style={{ overflow: 'hidden' }} h={300}>
                                <BackgroundImage h={'100%'} src="/images/features/openworkshop.jpeg" />
                            </Paper>
                        </Box>
                    </Flex>
                </Container>
            </Box>

            <Box bg={'gray.1'}>
                <Container size="xl" py={10}>
                    <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }}>
                        <Box py={{ base: 'md', sm: 'md', lg: 'xl' }} >
                            <Title order={3} mb={20}>
                                Know Your Aftermarket
                                <Text fz={35}>Warranty Program</Text>
                            </Title>
                            <Text fw={'normal'} >
                                Ezcare Warranty currently is the only leading aftermarket warranty provider primarily focused in covering the whole country including Sabah and Sarawak. To ensure that our services coverage can be delivered smoothly in an immediate action to customers, we have set our branches and representatives in every region in Malaysia.
                            </Text>
                            <Button mt={30} variant="transparent" color="rgba(0, 0, 0, 1)" size='lg' p={0} rightSection={<IconArrowRight color='red' />}>Find out more</Button>
                        </Box>
                        <Paper shadow="md" my={{ base: 'xs', sm: 'xs', lg: 'xl' }} radius='lg' style={{ overflow: 'hidden' }} h={300}>
                            <BackgroundImage h={'100%'} src="/images/features/openworkshop.jpeg" />
                        </Paper>
                    </SimpleGrid>
                </Container>
            </Box>
            <Box>
                <Container size="xl" py={10}>
                    <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }}>
                        <Paper shadow="md" my={'xl'} radius='lg' style={{ overflow: 'hidden' }} h={300}>
                            <BackgroundImage h={'100%'} src="/images/features/technicianrepair.jpeg" />
                        </Paper>
                        <Box py={{ base: 'md', sm: 'md', lg: 'xl' }}>
                            <Title order={3} mb={20}>
                                <Text fz={35}>Extended Warranty</Text>
                                Protects you from the raising repair costs
                            </Title>
                            <Text fw={'normal'}>
                                Auto repair costs are likely to continue to rise.If your car is not covered by any protection plan, consider getting an extended warranty before you get stuck with a big repair bill.
                            </Text>
                            <Button mt={30} variant="transparent" color="rgba(0, 0, 0, 1)" size='lg' p={0} rightSection={<IconArrowRight color='red' />}>Discover more</Button>
                        </Box>
                    </SimpleGrid>
                </Container>
            </Box>
            <Box bg={'gray.1'}>
                <Container size="xl" py={80}>
                    <SimpleGrid cols={2}>
                        <Box py="xl" pr={100}>
                            <Title order={3} mb={20}>
                                <Text fz={35}>Life After</Text>
                                The Factory Warranty
                            </Title>
                            <Text fw={'normal'}>
                                Extended auto warranties protect you from the high cost of the parts-replacement method of car repair that we see today. No matter how many parts are replaced, the cost is covered as long as it falls under the warranty’s terms and conditions.
                            </Text>
                            <Button mt={30} variant="transparent" color="rgba(0, 0, 0, 1)" size='lg' p={0} rightSection={<IconArrowRight color='red' />}>Discover more</Button>
                        </Box>
                        <Paper shadow="md" my={'xl'} radius='lg' style={{ overflow: 'hidden' }} h={300}>
                            <BackgroundImage h={'100%'} src="/images/features/consult.jpeg" />
                        </Paper>
                    </SimpleGrid>
                </Container>
            </Box> */}
        </>
    )
}
