import { RingProgress, Text, Box, Paper, Center, Group } from '@mantine/core';

function DashboardStat({ label, value, icon }: any) {
    return (<>
        <Paper withBorder radius="md" p="xs" w={250}>
            <Group>
                <Box p='lg'>
                    {icon}
                </Box>

                <div>
                    <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                        {label}
                    </Text>
                    <Text weight={700} size="xl">
                        {value}
                    </Text>
                </div>
            </Group>
        </Paper>
    </>);
}

export default DashboardStat;