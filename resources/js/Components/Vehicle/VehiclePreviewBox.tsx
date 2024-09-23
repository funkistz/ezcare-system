import AppCard from "../AppCard";
import moment from "moment";
import VehicleStatusesBadge from "./VehicleStatusesBadge";
import { useState } from "react";
import { Paper, Flex, Card, Image, Text, Badge, Button, Group, AspectRatio } from '@mantine/core';

function VehiclePreviewBox({ vehicle }: any) {

    return (
        <Card shadow="xs" padding="lg" radius="md">
            <Card.Section>
                <AspectRatio ratio={4 / 3} mx="auto" style={{ borderBottom: '1px solid #eee' }} >
                    {vehicle.primary_image && <Image radius="md" src={vehicle.primary_image.thumbnail_url} alt="image" />}
                    {!vehicle.primary_image && <Image radius="md" src="car_default.png" alt="image" />}
                </AspectRatio>
                {/* <Image
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                /> */}
            </Card.Section>

            <Group position="apart" mt="md">
                <Text fz='lg' weight={500} tt="capitalize">
                    {vehicle.brand ? vehicle.brand.name : ''}
                    {' '}
                    {vehicle.model ? vehicle.model.name : ''}
                    {' '}
                    {vehicle.variant ? vehicle.variant : ''}
                    {' '}
                    {vehicle.year ? '(' + moment(vehicle.year).format('MMM YYYY') + ')' : ''}
                </Text>
            </Group>
            <Group mb="xs">
                <Text>
                    Stock No: {vehicle.stock_no}
                </Text>
                {vehicle.color && <Badge tt="capitalize" color={vehicle.color.code}>
                    {vehicle.color.name}
                </Badge>}
            </Group>

            <Text fz='lg' weight={500} tt="capitalize">
                RM {vehicle.selling_price}
            </Text>
            <Flex wrap="wrap">
                <VehicleStatusesBadge statuses={vehicle.statuses} />
            </Flex>
            <Text fz='xs' my='xs' lineClamp={3} >
                {vehicle.specification}
            </Text>
        </Card>
    );
}

export default VehiclePreviewBox;