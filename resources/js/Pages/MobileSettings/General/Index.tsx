import AdminLayout from '@/Components/layout/AdminLayout';
import React from 'react'
import { Card, Group, Text, Button } from '@mantine/core';
import { AppInput, AppSelect, AppTextArea } from '@/Components';
import { usePage, useForm } from '@inertiajs/react';

export default function Index() {

    const { mobile_settings }: any = usePage().props;
    const { data, setData, post, put, reset, errors } = useForm({
        m_policy_content: mobile_settings.m_policy_content ? mobile_settings.m_policy_content.value : null,
        m_phone_numbers: mobile_settings.m_whatsapp_numbers ? mobile_settings.m_whatsapp_numbers.value : null,
        m_whatsapp_numbers: mobile_settings.m_whatsapp_numbers ? mobile_settings.m_whatsapp_numbers.value : null,
        m_whatsapp_template: mobile_settings.m_whatsapp_template ? mobile_settings.m_whatsapp_template.value : null,
        m_about_us_link: mobile_settings.m_about_us_link ? mobile_settings.m_about_us_link.value : null,
        m_contact_us_link: mobile_settings.m_contact_us_link ? mobile_settings.m_contact_us_link.value : null,
        m_facebook_link: mobile_settings.m_facebook_link ? mobile_settings.m_facebook_link.value : null,
        m_tiktok_link: mobile_settings.m_tiktok_link ? mobile_settings.m_tiktok_link.value : null,
        m_youtube_link: mobile_settings.m_youtube_link ? mobile_settings.m_youtube_link.value : null,
        m_website_link: mobile_settings.m_website_link ? mobile_settings.m_website_link.value : null,
        m_instagram_link: mobile_settings.m_instagram_link ? mobile_settings.m_instagram_link.value : null,
    });

    console.log('mobile_settings', mobile_settings)

    const onSubmit = () => {
        post(route('mobile-settings.generals.store'), {
            data,
            onSuccess: () => {
                console.log('success')
                // closeModal && closeModal()
            },
        });
    }

    return (
        <>
            <Card withBorder shadow="sm" radius="md" maw={500}>
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <Text fw={500}>Mobile Settings</Text>
                        <Button color='green' onClick={onSubmit}>Save</Button>
                    </Group>
                </Card.Section>

                <AppInput label='About us link' id='m_about_us_link' values={data} onChange={(e: any) => setData('m_about_us_link', e.target.value)} />
                <AppInput label='Contact us link' id='m_contact_us_link' values={data} onChange={(e: any) => setData('m_contact_us_link', e.target.value)} />
                <AppInput label='Facebook link' id='m_facebook_link' values={data} onChange={(e: any) => setData('m_facebook_link', e.target.value)} />
                <AppInput label='Tiktok link' id='m_tiktok_link' values={data} onChange={(e: any) => setData('m_tiktok_link', e.target.value)} />
                <AppInput label='Youtube link' id='m_youtube_link' values={data} onChange={(e: any) => setData('m_youtube_link', e.target.value)} />
                <AppInput label='Website link' id='m_website_link' values={data} onChange={(e: any) => setData('m_website_link', e.target.value)} />
                <AppInput label='Instagram link' id='m_instagram_link' values={data} onChange={(e: any) => setData('m_instagram_link', e.target.value)} />

                <AppTextArea rows={10} label='Policy Content' id='m_policy_content' values={data} onChange={(e: any) => setData('m_policy_content', e.target.value)} />

                <AppTextArea rows={3} label='Phone Numbers' id='m_phone_numbers' values={data} onChange={(e: any) => setData('m_phone_numbers', e.target.value)} />
                <AppTextArea rows={3} label='Whatsapp Numbers' id='m_whatsapp_numbers' values={data} onChange={(e: any) => setData('m_whatsapp_numbers', e.target.value)} />
                <AppTextArea rows={10} label='Whatsapp Template' id='m_whatsapp_template' values={data} onChange={(e: any) => setData('m_whatsapp_template', e.target.value)} />

                <Card.Section withBorder inheritPadding py="xs" mt={40}>
                    <Group justify="flex-end">
                        <Button color='green' onClick={onSubmit}>Save</Button>
                    </Group>
                </Card.Section>
            </Card>
        </>
    )
}

Index.layout = (page: any) => <AdminLayout children={page} title='Manage Mobile Setting' />;
