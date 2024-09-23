import { MantineProvider, MantineThemeOverride, MantineColorsTuple } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

const primary: MantineColorsTuple = [
    "#f3eefb",
    "#e3d9f3",
    "#c5aee7",
    "#a682dd",
    "#8b5cd3",
    "#7b44ce",
    "#7338cc",
    "#622bb5",
    "#5726a2",
    "#4a1f8f"
];

export const theme: MantineThemeOverride = {
    colors: {
        primary
    },
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <MantineProvider theme={theme}>
            <Notifications position="top-right" zIndex={2077} />
            {children}
        </MantineProvider>
    );
}