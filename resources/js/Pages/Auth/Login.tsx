import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Paper, Text, rem, Title, Button, Center, Anchor, BackgroundImage, Group, TextInput, Flex, Box, Checkbox } from '@mantine/core';
import { Image } from '@mantine/core';
import classes from './Login.module.css';
import GuestLayout from '@/Components/layout/GuestLayout';

interface LoginProps {
    status: string;
    canResetPassword: boolean;
}

export default function Login(args: LoginProps) {

    const { status, canResetPassword } = args;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onChange = (event: { target: { name: any; value: any } }) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Center h='100vh' w='100%'>
                {/* <BackgroundImage src="/sinarautologo.jpeg" h='100vh'> */}
                <Flex
                    h='100%'
                    // bg="rgba(0, 0, 0, .3)"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                >
                    <Flex justify="center"
                        align="center" bg='gray.9' h={400} w={400} p={60} style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, overflow: 'hidden', border: '1px solid #fff' }}>
                        <Image mx="auto" src="/images/ezcarelogo.png" alt="logo" />
                    </Flex>
                    <Box>
                        <form onSubmit={submit}>
                            {status && <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>}


                            {/* <Text color="dimmed" size="sm" align="center" mt={5}>
                            Do not have an account yet?{' '}
                            <Anchor size="sm" component="button">
                                Create account
                            </Anchor>
                        </Text> */}

                            <Paper withBorder shadow="md" p={30} w={400} h={400} style={{ borderTopRightRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                                <Title mb='xl'>Login</Title>
                                <TextInput
                                    name='email'
                                    placeholder="Email"
                                    label="Email"
                                    type='text'
                                    value={data.email}
                                    onChange={onChange}
                                    autoComplete='username'
                                    autoFocus
                                    error={errors.email}
                                    required
                                    withAsterisk
                                />
                                <TextInput
                                    name='password'
                                    label="Password"
                                    placeholder="Password"
                                    type='password'
                                    value={data.password}
                                    autoComplete='current-password'
                                    onChange={onChange}
                                    required
                                    mt="md"
                                    error={errors.password}
                                />
                                <Group justify="space-between" mt="lg">
                                    <Checkbox
                                        label='Remember'
                                        name='remember'
                                        value={data.remember}
                                        onChange={(e: { target: { checked: any } }) => e.target.checked}
                                    />
                                    {canResetPassword && (
                                        <Link href='/forgot-password' className='text-sm text-slate-600 underline hover:text-slate-900'>
                                            <Anchor component="button" size="sm">
                                                Forgot password?
                                            </Anchor>
                                        </Link>
                                    )}

                                </Group>
                                <Button fullWidth mt="xl" type='submit'>
                                    Sign in
                                </Button>
                            </Paper>
                        </form>
                    </Box>
                </Flex>
            </Center>
        </>
    );
}

Login.layout = (page: React.ReactNode) => {
    return (
        <GuestLayout
            children={page}
        />
    );
};
