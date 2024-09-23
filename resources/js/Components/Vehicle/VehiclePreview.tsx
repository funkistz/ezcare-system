import AppCard from "../AppCard";
import { Paper, Flex, Text, Group, Image, Card } from "@mantine/core";
import moment from "moment";
import VehicleStatusesBadge from "./VehicleStatusesBadge";
import { useState } from "react";

function VehiclePreview({ vehicle }: any) {

    return (
        <Card shadow="xs" padding="lg" radius="md">
            <Flex>
                <Paper shadow='xs' w={200} maw={200} radius="md">
                    {vehicle.primary_image && <Image width={200} radius="md" src={vehicle.primary_image.thumbnail_url} alt="image" />}
                    {!vehicle.primary_image && <Image width={200} radius="md" src="car_default.png" alt="image" />}
                </Paper>
                <Group grow>
                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                        h={200}
                        p='xs'
                        pl={30}
                    >
                        <Text fz='lg' weight='bolder' tt="capitalize">
                            {vehicle.brand ? vehicle.brand.name : ''}
                            {' '}
                            {vehicle.model ? vehicle.model.name : ''}
                            {' '}
                            {vehicle.variant ? vehicle.variant : ''}
                            {' '}
                            {vehicle.year ? '(' + moment(vehicle.year).format('MMM YYYY') + ')' : ''}
                        </Text>
                        <Text fz='lg' weight='bolder'>Stock no: {vehicle.stock_no}</Text>
                        <Text fz='sm' my='xs' lineClamp={2}>
                            {vehicle.description}
                        </Text>
                        <Text>RM {vehicle.selling_price}</Text>
                        <Flex mt='xs'>
                            <VehicleStatusesBadge statuses={vehicle.statuses} />
                        </Flex>
                    </Flex>
                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                        h={200}
                        p='xs'
                        w='30%'
                    // maw='50%'
                    >
                        {vehicle.color && <Text fz='md' weight='bold' tt="capitalize" color={vehicle.color.code}>
                            Color: {vehicle.color.name}
                        </Text>}
                        <Text fz='md' weight='bold' tt="capitalize">
                            Specifications:
                        </Text>
                        <Text fz='sm' my='xs' lineClamp={5} w='50%'>
                            {vehicle.specification}
                        </Text>
                    </Flex>
                </Group>
            </Flex>
        </Card>
    );
}

export default VehiclePreview;