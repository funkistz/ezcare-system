import { AppInput, AppTextArea } from '@/Components'
import { useForm } from '@inertiajs/react';
import { Box, Card, Divider, SimpleGrid, Stack, Text, Group, Flex, Button, Container, Image, ThemeIcon } from '@mantine/core'
import { IconFileDollar } from '@tabler/icons-react'
import React from 'react'
import { ConfirmButton } from '@/Components';
import { useTranslation } from 'react-i18next';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function EzGetQuotationMy() {

    const { data, setData, post, put, reset, errors } = useForm({
        name: '',
        email: '',
        phone_no: '',
        vehicle_model: '',
        vehicle_year: '',
        message: '',
    });
    const { t } = useLaravelReactI18n();

    const onSubmit = () => {
        // e.preventDefault();
        post(route('support_quotation.store'), {
            data,
            onSuccess: () => {
                reset()
            },
        });
    }

    return (
        <>
            <Group justify='space-between' align='start' pb={80} bg='grape.0' ff='Roboto'>
                <Container size='xl' pos='relative'>
                    {/* <Group justify='space-between' align='start' > */}
                    <SimpleGrid
                        cols={{ base: 1, sm: 1, lg: 2 }}
                        p={10}
                        mt={{ base: 10, sm: 10, xl: 40 }}
                    >
                        <Flex align='start' direction='column' mt={{ base: 20, sm: 20, xl: 30 }} ff='Lato' >
                            <Text lh='normal' c='#333' fz={{ base: 35, sm: 35, lg: 40 }} fw={900} tt='uppercase' style={{ lineHeight: 2 }} mb={30}>
                                KNOW YOUR VEHICLE AFTER-MARKET WARRANTY
                            </Text>
                            {/* <Text lh='normal' c='#333' fz={{ base: 22, sm: 22, lg: 22 }} fw={500} tt='uppercase' style={{ lineHeight: 2 }}>{t('gq_2')}</Text>
                            <Text lh='normal' c='#862E9C' fz={{ base: 35, sm: 35, lg: 40 }} fw={900} mb={30} tt='uppercase' style={{ lineHeight: 2 }} mt={10}>{t('ezcare warranty')}</Text> */}

                            <Stack>
                                <Text fz={{ base: 20, sm: 20, lg: 20 }} fw={350} ff='Roboto' style={{ wordBreak: 'keep-all' }} ta='justify' pr={20}>
                                    <span style={{ color: '#862E9C', fontWeight: 'bolder' }}>Ezcare Warranty</span>, the leading provider of after-market vehicle warranties, distinguishes by offering comprehensive coverage nationwide, including Sabah and Sarawak. Our commitment to efficient service is evident through strategically positioned representatives in every region of Malaysia. What sets Ezcare Warranty apart is our open workshop concept which allows policyholders to send their vehicle to the workshop which they prefer, a unique feature in the industry.

                                </Text>
                                <Text fz={{ base: 20, sm: 20, lg: 20 }} fw={350} ff='Roboto' style={{ wordBreak: 'keep-all' }} ta='justify' pr={20}>
                                    With a fast claim process, Ezcare Warranty enhances the customer experience by minimizing waiting times and streamlining the reimbursement process. Customers can submit their claims quickly and efficiently, allowing them to receive prompt assistance and resolution for any issues they encounter with their vehicles. This swift process ensures that customers can get back on the road with minimal disruption, contributing to their overall satisfaction with our services.
                                </Text>
                            </Stack>

                            <Image mt={40} src={'/images/features/staffsupport.jpeg'} w={{ base: '100%', sm: '100%', md: '100%', xl: '100%' }} h={350} mb={{ base: 20, sm: 20, xl: 0 }} radius='lg' />
                        </Flex>
                        <Group justify='center' pl={{ base: 0, sm: 0, xl: 50 }}>
                            <Card shadow="xl" radius="xl" p="xl" mt={20} withBorder maw={600}>

                                <Card.Section ta='center' pb='xl' pt='md'>
                                    <Group mb={20} justify='center'>
                                        <Text fz={30} fw='bolder' >{t('gq_5')}</Text>
                                        {/* <ThemeIcon radius='lg' size={'xl'} variant='outline' color='orange.7'>
                                            <IconFileDollar />
                                        </ThemeIcon> */}
                                    </Group>
                                    <Divider size={1} color='#ccc' />
                                </Card.Section>

                                <Card.Section pt={0}>
                                    <SimpleGrid cols={1} spacing={40} p={20} pt={0}>
                                        <Stack gap={10}>
                                            <AppInput required noMargin label={t('name')} size='md' id='name' values={data} onChange={(e: any) => setData('name', e.target.value)} />
                                            <AppInput required noMargin label={t('email')} size='md' id='email' values={data} onChange={(e: any) => setData('email', e.target.value)} />
                                            <AppInput required noMargin label={t('phone number')} size='md' id='phone_no' values={data} onChange={(e: any) => setData('phone_no', e.target.value)} />
                                            <AppInput required noMargin label={t('vehicle model')} size='md' id='vehicle_model' values={data} onChange={(e: any) => setData('vehicle_model', e.target.value)} />
                                            <AppInput required noMargin label={t('vehicle year')} size='md' id='vehicle_year' values={data} onChange={(e: any) => setData('vehicle_year', e.target.value)} />
                                            <AppTextArea noMargin label={t('message')} size='md' rows={4} id='message' values={data} onChange={(e: any) => setData('message', e.target.value)} />
                                        </Stack>
                                    </SimpleGrid>
                                    <Box p='md' ta='center'>
                                        {/* <Button fullWidth size='xl' color='green' radius='xl' ff='Lato' type='submit'>Get Quote</Button> */}
                                        <ConfirmButton size='xl' color='green' radius='xl' ff='Lato' fullWidth onConfirm={onSubmit} label={'Get Quote'} />
                                        <Text mt={20} fz={18}>{t('gq_6')} <a href="tel:1 300 88 8287">1 300 88 8287</a> {t('gq_7')}</Text>
                                        <Text mt={50} fz={11}>{t('gq_8')}</Text>
                                    </Box>
                                </Card.Section>
                            </Card>
                        </Group>

                    </SimpleGrid>
                    {/* </Group> */}
                </Container>
            </Group >
        </>
    )
}
