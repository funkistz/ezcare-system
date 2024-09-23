import React from 'react'
import {
    IconSettings,
    IconSwitchHorizontal,
    IconLogout,
    IconLayoutDashboard,
    IconCar,
    IconList,
    IconBookmarks,
    IconUsers,
    IconListDetails,
    IconUserCircle,
    IconLockAccess,
    IconPhoto,
    IconFingerprint,
    IconUsersGroup,
    IconReportAnalytics,
    IconAddressBook,
    IconPhone,
    IconDeviceCameraPhone,
    IconDeviceMobile,
    IconBuildingWarehouse,
    IconHelp,
    IconReportSearch,
    IconSlideshow,
    IconBuildingStore,
    IconTruck,
    IconSteeringWheel,
    IconShieldCheck,
    IconCarCrash
} from '@tabler/icons-react';

export const adminLinks = [
    {
        label: 'Dashboard',
        icon: IconLayoutDashboard,
        link: route('dashboard'),
        permission: '',
    },
    {
        label: 'Policy',
        icon: IconAddressBook,
        link: route('policy.index'),
        permission: 'policy.view',
    },
    {
        label: 'Inspection',
        icon: IconReportSearch,
        permission: '',
        links: [
            {
                label: 'Schedule',
                link: route('schedule-inspection.index'),
            },
            {
                label: 'Inspection',
                link: route('inspection.index'),
            },
            {
                label: 'Non-Inspection',
                link: route('non-inspection.index'),
            },
        ]
    },
    {
        label: 'Approval',
        icon: IconShieldCheck,
        link: route('approval.index'),
        permission: 'approval.view',
    },
    {
        label: 'Claims',
        icon: IconCarCrash,
        link: route('policy-claim.index'),
        permission: '',
    },
    {
        label: 'Staff',
        icon: IconUsersGroup,
        link: route('staffs.index'),
        permission: 'staff.view',
    },
    {
        label: 'Customer',
        icon: IconLayoutDashboard,
        link: route('customers.index'),
        permission: 'customer.view',
    },
    {
        label: 'Support Quotations',
        icon: IconHelp,
        link: route('support_quotation.index'),
        permission: 'customer.view',
    },
    {
        label: 'Workshops',
        icon: IconBuildingWarehouse,
        link: route('workshops.index'),
        permission: 'workshop.view',
    },
    {
        label: 'Dealer',
        link: route('dealers.index'),
        icon: IconBuildingStore,
        permission: '', //  'dealer.view'
    },
    {
        label: 'Suppliers',
        link: route('supplier.index'),
        icon: IconTruck,
        permission: '',
    },
    {
        label: 'Car Parts',
        link: route('car-parts.index'),
        icon: IconSteeringWheel,
        permission: '',
    },
    {
        label: 'Settings',
        icon: IconSettings,
        // link: route('roles.index'),
        permission: 'setting.view',
        links: [
            {
                label: 'General Setting',
                link: route('general-settings.index'),
            },
            {
                label: 'Warranty Plan',
                link: route('warranty-plans.index'),
            },
            {
                label: 'Vehicle Brand & Model',
                link: route('vehicle-brands.index'),
            },
            {
                label: 'Vehicle Group',
                link: route('vehicle-groups.index'),
            },
            {
                label: 'Vehicle CC/KW',
                link: route('vehicle-powers.index'),
            },
            {
                label: 'Vehicle Condition',
                link: route('vehicle-conditions.index'),
            },
            {
                label: 'Plan Pricing',
                link: route('plan-pricing.index'),
            },
            {
                label: 'Coverage',
                link: route('coverages.index'),
            },
            {
                label: 'Plan Discount',
                link: route('plan-discounts.index'),
            },
            {
                label: 'Free Promo',
                link: route('free-promos.index'),
            },
            {
                label: 'Branch',
                link: route('branches.index'),
            },
            {
                label: 'Vacancy',
                link: route('vacancy.index'),
            },
            {
                label: 'Tax',
                link: route('taxes.index'),
            },
            {
                label: 'Service Type',
                link: route('oil-types.index'),
            },
            {
                label: 'Role Permission',
                link: route('roles.index'),
            },
        ]
    },
    {
        label: 'Desktop Banner',
        icon: IconSlideshow,
        link: route('banner.index'),
        permission: '',
    },
    {
        label: 'Mobile Settings',
        icon: IconDeviceMobile,
        // link: route('roles.index'),
        permission: 'setting.view',
        links: [
            {
                label: 'Generals',
                link: route('mobile-settings.generals.index'),
            },
            {
                label: 'Banners',
                link: route('mobile-settings.banners.index'),
            },

        ]
    },
    {
        label: 'Reports',
        icon: IconReportAnalytics,
        permission: '',
        // link: route('roles.index'),
        links: [
            {
                label: 'Policy',
                link: route('reports.policySimple'),
            },
            {
                label: 'SOA',
                link: route('reports.soa'),
            },
            {
                label: 'OS',
                link: route('reports.os'),
            },
            // {
            //     label: 'Customer',
            //     link: route('report-policy.index'),
            // },
        ]
    },
    // {
    //     label: 'Banner',
    //     icon: IconPhoto,
    //     link: route('banner.index'),
    // },
    // {
    //     label: 'Staff',
    //     icon: IconUsers,
    //     link: route('staffs.index'),
    // },
];