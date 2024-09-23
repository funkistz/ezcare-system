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
    { title: 'Email', description: <a href="mailto: informasi@ezcare-warranty.com" style={{ color: 'white' }}>informasi@ezcare-warranty.com</a>, icon: IconAt },
    { title: 'WhatsApp', description: <a target='_blank' href="https://api.whatsapp.com/send?phone=6281110020356&text=Hai%20Ezcare%20Warranty,%20Saya%20ingin%20mengetahui%20informasi%20lebih%20lanjut%20tentang%20paket%20garansi%20anda.%20Berikut%20informasi%20STNK%20kendaraan%20saya." style={{ color: 'white' }}>+6281110020356</a>, icon: IconBrandWhatsapp },
    { title: 'General Inquiries', description: <a href="tel:02138250134" style={{ color: 'white' }}>02138250134</a>, icon: IconPhone },
    { title: '24/7 Emergency Hotline', description: <a href="tel:628118777655" style={{ color: 'white' }}>628118777655</a>, icon: IconPhone },
    // { title: 'Hotline', description: '1 300 88 8287', icon: IconPhone },
];
export function ContactIconsList() {
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