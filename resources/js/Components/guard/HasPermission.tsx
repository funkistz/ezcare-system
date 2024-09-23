import { usePage } from '@inertiajs/react';
import React from 'react'

export default function HasPermission({ permission, author, users, children }: { permission: string, children: any, author?: any, users?: any }) {

    const { permissions, auth }: any = usePage().props;
    let comp;

    console.log('auth', auth)

    if (author && auth && auth.user && (auth.user.id == author)) {
        comp = children;
    }

    if (Array.isArray(users) && auth && auth.user && (users.includes(auth.user.id))) {
        comp = children;
    }

    if (permissions && permissions.includes(permission)) {
        comp = children;
    }

    return comp
}
