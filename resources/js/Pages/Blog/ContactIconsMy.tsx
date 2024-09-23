import { Text, Box, Stack, rem, ThemeIcon } from '@mantine/core';
import { IconSun, IconPhone, IconMapPin, IconAt, IconBrandWhatsapp } from '@tabler/icons-react';
import classes from './ContactIcons.module.css';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon: typeof IconSun;
    title: React.ReactNode;
    description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
    return (
        <div className={classes.wrapper} {...others}>
            <Box mr="md">
                <ThemeIcon variant="light" radius="md" size="xl" color="orange.3">
                    <Icon style={{ width: rem(24), height: rem(24) }} />
                </ThemeIcon>
            </Box>

            <div>
                <Text size="xs" className={classes.title} >
                    {title}
                </Text>
                <Text className={classes.description}>{description}</Text>
            </div>
        </div>
    );
}

const MOCKDATA = [
    { title: 'Email', description: <a href="mailto: info@ezcare-warranty.com" style={{ color: 'white' }}>info@ezcare-warranty.com</a>, icon: IconAt },
    { title: 'Hotline', description: <a href="tel:1300888287" style={{ color: 'white' }}>1 300 88 8287</a>, icon: IconPhone },
    { title: 'WhatsApp', description: <a target='_blank' href="https://api.whatsapp.com/send?phone=60132880177&text=Hai%20Ezcare%20Warranty" style={{ color: 'white' }}>+60132880177</a>, icon: IconBrandWhatsapp },
    { title: 'General Inquiries', description: <a href="tel:0389220571" style={{ color: 'white' }}>03-8922-0571</a>, icon: IconPhone },
];

export function ContactIconsListMy() {
    const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />);
    return <Stack>
        {items}
        <div className={classes.wrapper}>
            <Box mr="md">
                <ThemeIcon variant="light" radius="md" size="xl" color="orange.3">
                    <IconSun style={{ width: rem(24), height: rem(24) }} />
                </ThemeIcon>
            </Box>

            <div>
                <Text size="xs" className={classes.title}>
                    BUSINESS HOURS
                </Text>
                <Text className={classes.description}>Monday - Friday 9.00 am - 5.30 pm</Text>
                <Text className={classes.description}>Saturday - 9.00 am - 2.30 pm</Text>
                <Text className={classes.description}>Sunday & Public Holiday- Closed</Text>
            </div>
        </div>
    </Stack>;
}