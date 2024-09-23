import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import Container from '@/Components/Container';
import Header from '@/Components/Header';
import AdminLayout from '@/Components/layout/AdminLayout';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({ mustVerifyEmail, status }: Props) {
    return (
        <div>
            <Head title='Profile' />
            <div className='grid gap-x-8 gap-y-12 sm:grid-cols-2'>
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className='max-w-xl border bg-white p-4 sm:rounded-lg sm:p-8'
                />
                <UpdatePasswordForm className='max-w-xl border bg-white p-4 sm:rounded-lg sm:p-8' />
                {/* <DeleteUserForm className='max-w-xl border bg-white p-4 sm:rounded-lg sm:p-8' /> */}
            </div>
        </div>
    );
}

Edit.layout = (page: any) => <AdminLayout title='profile' children={page} />;
