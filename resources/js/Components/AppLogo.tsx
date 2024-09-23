import { router } from "@inertiajs/react";
import { Title, Image, UnstyledButton, Text, Group, Select } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import axios from "axios";
import { useLaravelReactI18n } from "laravel-react-i18n";

const data = [
    { value: 'id', label: '🇮🇩 Indonesia' },
    { value: 'en', label: '🇺🇸 English' },
];

function AppLogo() {

    // const { classes, theme } = useStyles();
    const { currentLocale, setLocale } = useLaravelReactI18n();
    const goTo = () => {
        router.get('/');
    }

    return (<Group justify="start" gap={30}>
        {/* <Title order={1} style={classes.logo}>Ezcare</Title> */}
        <UnstyledButton onClick={goTo}>
            <Image src={'/images/logoblack.png'} h={50} w={120} mt={0} />
        </UnstyledButton>
    </Group>);
}

export default AppLogo;

const classes = {
    logo: {
        // fontFamily: 'Ethnocentric',
        fontSize: 20,
        //         color: 'white'
    }
};
