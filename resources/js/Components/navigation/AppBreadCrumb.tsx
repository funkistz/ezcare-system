import React from 'react'
import { Breadcrumbs, Anchor, Group, Text, ThemeIcon } from '@mantine/core';
import { IconChevronRight, IconHome2 } from '@tabler/icons-react';

export default function AppBreadCrumb({ items }: { items: any }) {

    const breadcrumb = items.map((item: any, index: any) => (
        <React.Fragment key={index}>
            <Group gap={10}>
                {index == 0 && <IconHome2 size={18} />}
                <Text key={index}>
                    {item.title}
                </Text>
            </Group>
        </React.Fragment>
    ));

    return (
        <>
            <Breadcrumbs separator={<IconChevronRight size={18} />} color='gray'>{breadcrumb}</Breadcrumbs>
        </>
    )
}
