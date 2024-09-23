import React, { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import AppInput from '@/Components/Forms/AppInput';

export default function UpdatePasswordForm({ className }: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const { data, setData, put, errors, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section>
            <header className='mb-4 px-4 sm:px-0'>
                <h2 className='text-lg font-medium text-slate-900'>Update Password</h2>

                <p className='mt-1 text-sm text-slate-600'>
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <div className={className}>
                <form onSubmit={submit} className='space-y-6'>

                    <AppInput type='password' label='Current Password' id='current_password' value={data.current_password} onChange={(e: any) => setData('current_password', e.target.value)} error={errors.current_password} required />
                    <AppInput type='password' label='New Password' id='password' value={data.password} onChange={(e: any) => setData('password', e.target.value)} error={errors.password} required />
                    <AppInput type='password' label='Confirm Password' id='password_confirmation' value={data.password_confirmation} onChange={(e: any) => setData('password_confirmation', e.target.value)} error={errors.password_confirmation} required />

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
