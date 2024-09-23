import { AddButtonModal, AppTable } from '@/Components'
import { Alert, Badge, Card, Divider, Group, Stack, Text } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import React from 'react'
import ServiceForm from './ServiceForm'

export default function ServiceReminder({ policy }: any) {
    return (
        <>
            <Stack gap={2}>
                <Text fw='bolder'>Next Services:</Text>
                <Group>
                    {policy.next_service.next_services && policy.next_service.next_services.map((next_service: any, index: any) => <Card key={index} withBorder><Group align='flex-start'>
                        <Text>{next_service.service_name}:</Text>
                        <Stack gap={5}>
                            <Badge bg='green'>{next_service.next_mileage}KM</Badge>
                            <Badge bg='pink'>{next_service.next_date}</Badge>
                        </Stack>
                    </Group></Card>)}
                </Group>
            </Stack>
        </>
    )
}
