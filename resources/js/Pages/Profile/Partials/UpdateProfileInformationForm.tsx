import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { PageProps } from '@/types';
import AppInput from '@/Components/Forms/AppInput';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }: Props) {
    const { auth } = usePage<PageProps>().props;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        username: auth.user.username ?? '',
        name: auth.user.name ?? '',
        email: auth.user.email ?? '',
    });

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <section>
            <header className='mb-4 px-4 sm:px-0'>
                <h2 className='text-lg font-medium text-slate-900'>Profile Information</h2>

                <p className='mt-1 text-sm text-slate-600'>
                    Update your account's profile information and email address.
                </p>
            </header>
            <div className={className}>
                <form onSubmit={submit} className='space-y-6'>
                    <AppInput label='Name' id='name' value={data.name} onChange={(e: any) => setData('name', e.target.value)} error={errors.name} required />
                    <AppInput label='Email' id='email' value={data.email} onChange={(e: any) => setData('email', e.target.value)} error={errors.email} required />
                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                        <div>
                            <p className='mt-2 text-sm'>
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method='post'
                                    as='button'
                                    className='text-slate-600 underline hover:text-slate-900'>
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className='mt-2 text-sm font-medium text-green-600'>
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className='flex items-center gap-4'>
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enterFrom='opacity-0'
                            leaveTo='opacity-0'
                            className='transition ease-in-out'>
                            <p className='text-sm text-slate-600'>Saved.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </section>
    );
}
