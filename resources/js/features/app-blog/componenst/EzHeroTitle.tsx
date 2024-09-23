import { Container, Title, Text, BackgroundImage, Overlay, Group, Image, Stack } from '@mantine/core';
import classes from './EzHeroTitle.module.css';

export function EzHeroTitle({ title, description, image, imageWidth, content }: any) {
    return (
        <div className={classes.root}>
            <Container size="xl">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Group justify='space-between' w='100%'>
                            <Stack gap={10} maw={'100%'}>
                                <Title className={classes.title}>
                                    <Text
                                        component="span"
                                        inherit
                                        c={'white'}
                                        variant="gradient"
                                        gradient={{ from: 'primary.0', to: 'violet.2' }}
                                    >
                                        {title}
                                    </Text>
                                </Title>
                                {!!description && <Text c={'white'} fz={25} ml={5}>
                                    {description}
                                </Text>}
                            </Stack>

                            {!!image && <Group justify='center' w='100%'>
                                <Image w={imageWidth ? imageWidth : 400} mt={imageWidth ? 0 : 0} src={image} />
                            </Group>
                            }

                            {content}
                        </Group>




                    </div>
                </div>
            </Container>
        </div>
    );
}