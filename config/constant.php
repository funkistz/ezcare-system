<?php

return [
    'status' => [
        'draft' => ['label' => 'Draft', 'value' => 'draft'],
        'activated' => ['label' => 'Activated', 'value' => 'activated'],
        'deactivated' => ['label' => 'Deactivated', 'value' => 'deactivated'],
        'void' => ['label' => 'Void', 'value' => 'void'],
        'unpaid' => ['label' => 'Unpaid', 'value' => 'unpaid'],
        'paid' => ['label' => 'Paid', 'value' => 'paid'],
        'partial' => ['label' => 'Partial', 'value' => 'partial'],
        'foc' => ['label' => 'Free of charge', 'value' => 'foc'],

        'pre_approved' => ['label' => 'Pre Approved', 'value' => 'pre_approved'],
        'pre_rejected' => ['label' => 'Pre Rejected', 'value' => 'pre_rejected'],
        'pending' => ['label' => 'Pending', 'value' => 'pending'],
        'approved' => ['label' => 'Approved', 'value' => 'approved'],
        'rejected' => ['label' => 'Rejected', 'value' => 'rejected'],
        'withdraw' => ['label' => 'Withdraw', 'value' => 'withdraw'],
        'appeal' => ['label' => 'Appeal', 'value' => 'appeal'],

        'no_record' => ['label' => 'No record', 'value' => 'no_record'],
        'mos' => ['label' => 'Miss service', 'value' => 'mos'],
        'los' => ['label' => 'Lack of service', 'value' => 'los'],
        'ok' => ['label' => 'Okay', 'value' => 'ok'],


    ],
    'payment_reasons' => [
        'comm_to_salesman' => ['label' => 'Commission to Salesman', 'value' => 'comm_to_salesman'],
        'comm_to_staff' => ['label' => 'Commission to Staff', 'value' => 'comm_to_staff'],
        'comm_to_dealer' => ['label' => 'Commission to Dealer', 'value' => 'comm_to_dealer'],
        'refund_to_customer' => ['label' => 'Refund to Customer', 'value' => 'refund_to_customer'],
        'refund_to_dealer' => ['label' => 'Refund to Dealer', 'value' => 'refund_to_dealer'],
        'others' => ['label' => 'Others', 'value' => 'others'],
    ],
    'transaction_requests' => [
        'warranty_price_change' => 'Warranty Price Change Request',
    ]
];
