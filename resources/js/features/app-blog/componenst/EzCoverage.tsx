import React from 'react'
import { AspectRatio, BackgroundImage, Box, Button, Card, Flex, Group, Image, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function EzCoverage() {

    const { t } = useLaravelReactI18n();

    return (
        <>
            <Box py={40} bg='violet.0'>
                <Stack >
                    <Stack align="center" mt={60} mb={60}>
                        <Title order={3} fz={35} fw={900} ff='Lato' ml={{ base: 15, sm: 15, lg: 0 }} mt={{ base: -10, sm: -10, lg: 0 }} tt='uppercase'>
                            {t('cv_1')}
                        </Title>
                    </Stack>
                    <Group justify='center' gap={'sm'}>
                        <Paper shadow="xl" m={{ base: 'xs', sm: 'xs', lg: 'xl' }} radius='lg' style={{ overflow: 'hidden' }} w={{ base: '40%', sm: '40%', lg: 300 }}>
                            <AspectRatio ratio={630 / 830} mx="auto">
                                <img
                                    src="/images/features/plan_baru.png"
                                />
                            </AspectRatio>
                        </Paper>
                        <Paper shadow="xl" m={{ base: 'xs', sm: 'xs', lg: 'xl' }} radius='lg' style={{ overflow: 'hidden' }} w={{ base: '40%', sm: '40%', lg: 300 }}>
                            <AspectRatio ratio={630 / 830} mx="auto">
                                <img
                                    src="/images/features/plan_bekas.png"
                                />
                            </AspectRatio>
                        </Paper>
                        <Paper shadow="xl" m={{ base: 'xs', sm: 'xs', lg: 'xl' }} radius='lg' style={{ overflow: 'hidden' }} w={{ base: '40%', sm: '40%', lg: 300 }}>
                            <AspectRatio ratio={630 / 830} mx="auto">
                                <img
                                    src="/images/features/plan_supercar.png"
                                />
                            </AspectRatio>
                        </Paper>
                    </Group>
                    <Group justify='center' mt={50}>
                        <Button size='lg' variant='gradient' bg='grape.9' rightSection={<IconArrowRight />} radius={40} component='a' href='/our-products'>{t('cv_2')}</Button>
                    </Group>
                </Stack>
            </Box>
        </>
    )
}
