import { usePage, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { AppTable, AppCard, AddButtonModal, UpdateButtonModal, AddButton, AppSelect, AppSegmentControl, AppYearPicker, AppDatePicker, AppTextArea, AppPrice } from '@/Components';
import { Group, Button, Modal, Box, SimpleGrid, Text, TextInput, Stack, Table, Paper, Grid, Input, Textarea, SegmentedControl, Alert, Select, Checkbox, LoadingOverlay, Divider } from '@mantine/core';
import AdminLayout from '@/Components/layout/AdminLayout';
import { DateInput } from '@mantine/dates';
import { IconCalendar, IconCar, IconCash, IconDeviceFloppy, IconFileCertificate, IconFileInvoice, IconLockAccess, IconUser } from '@tabler/icons-react';
import { AppInput } from '@/Components';
import axios, { Axios } from 'axios';
import moment from 'moment-timezone';
import { useDebouncedState } from '@mantine/hooks';

export default function Create({ values }: any) {

    const { countries, technicals, mos, dealers, coverages, discounts, discountsSelect, freePromos, freePromosSelect, coverageSelect, policy_years }: any = usePage().props;
    const { brands, warranty_plans, warranty_plans_real, vehicle_groups, vehicle_power_capacities, vehicle_conditions, vehicle_brands, taxes, settings, branches }: any = usePage().props;

    console.log('policy_years', policy_years)

    const [activeTax, setActiveTax] = useState<any>();
    const [models, setModels] = useState<any>([]);
    const [variants, setVariants] = useState<any>([]);
    const [identityType, setIdentityType] = useState<any>('email');

    const [searchReg, setSearchReg] = useState<any>([]);
    const [vehicleFound, setVehicleFound] = useState<any>(true);
    const [searchIC, setSearchIC] = useState<any>([]);
    const [customerFound, setCustomerFound] = useState<any>(true);
    const [states, setStates] = useState([])
    const [isCalculatePrice, setIsCalculatePrice] = useState<any>(false);

    const [powerCapacity, setPowerCapacity] = useDebouncedState(null, 500);

    const policyTypes = [
        {
            'label': 'New',
            'value': 'new'
        },
        {
            'label': 'Renew',
            'value': 'renew'
        },
    ];
    const pricingTypes = [
        {
            'label': 'Dealer',
            'value': 'dealer'
        },
        {
            'label': 'Retail',
            'value': 'retail'
        },
    ];
    const [minYear, setMinYear] = useState(1);
    const anyObject: any = [];
    const { data, setData, post, put, reset, errors } = useForm({

        //Customer
        ic: values ? values.ic : '',
        first_name: values ? values.first_name : '',
        last_name: values ? values.last_name : '',
        email: values ? values.email : '',
        phone_no: values ? values.phone_no : '',
        username: values ? values.username : '',
        // nationality: values ? values.nationality : 'ID',
        nationality: (values && values.nationality) ? values.nationality : (settings.default_country ? settings.default_country.value : ''),
        line1: values ? values.line1 : '',
        line2: values ? values.line2 : '',
        line3: values ? values.line3 : '',
        city: values ? values.city : '',
        postcode: values ? values.postcode : '',
        // country: values ? values.country : 'ID',
        country: (values && values.country) ? values.country : (settings.default_country ? settings.default_country.value : ''),
        state: values ? values.state : '',

        //Warranty Details
        warranty_plan_id: values ? values.warranty_plan_id : '',
        period: values ? values.period : 1,
        activated_at: values ? values.activated_at : '',
        expired_at: values ? values.expired_at : '',

        //Vehicle
        registration_no: values ? values.registration_no : '',
        chassis_no: values ? values.chassis_no : '',
        engine_no: values ? values.engine_no : '',
        vehicle_brand_id: values ? values.vehicle_brand_id : '',
        vehicle_model_id: values ? values.vehicle_model_id : '',
        vehicle_variant_id: values ? values.vehicle_variant_id : '',
        power_capacity: values ? values.power_capacity : '',
        power_type: values ? values.power_type : 'cc',
        vehicle_condition_id: values ? values.vehicle_condition_id : '',
        year: values ? values.year : null,
        registration_date: values ? values.registration_date : '',
        mileage: values ? values.mileage : '',

        //price
        pricing_type: values ? values.pricing_type : 'dealer',
        tax_id: values ? values.tax_id : (settings.tax ? settings.tax.value : ''),

        //Price retail
        warranty_plan_price: values ? values.warranty_plan_price : '',
        subtotal_with_tax: values ? values.subtotal_with_tax : '',
        subtotal_without_tax: values ? values.subtotal_without_tax : '',
        total_coverage: values ? values.total_coverage : '',
        total_discount: values ? values.total_discount : '',
        total_tax: values ? values.total_tax : '',
        total_price: values ? values.total_price : '',
        discountWithAmounts: anyObject,
        coveragesWithAmounts: anyObject,

        //Price dealer
        dealer_warranty_plan_price: values ? values.dealer_warranty_plan_price : '',
        dealer_subtotal_with_tax: values ? values.dealer_subtotal_with_tax : '',
        dealer_subtotal_without_tax: values ? values.dealer_subtotal_without_tax : '',
        dealer_total_coverage: values ? values.dealer_total_coverage : '',
        dealer_total_discount: values ? values.dealer_total_discount : '',
        dealer_total_tax: values ? values.dealer_total_tax : '',
        dealer_total_price: values ? values.dealer_total_price : '',
        dealer_discountWithAmounts: anyObject,
        dealer_coveragesWithAmounts: anyObject,

        //Policy
        type: values ? values.type : '',
        with_addon: values ? values.with_addon : false,
        branch_id: values ? values.branch_id : '',
        policy_no: values ? values.policy_no : '',
        policy_type: values ? values.policy_type : 'new',
        remarks: values ? values.remarks : '',

        salesman: values ? values.salesman : '',
        dealer_id: values ? values.dealer_id : '',
        marketing_officer_id: values ? values.marketing_officer_id : '',
        technical_staff_id: values ? values.technical_staff_id : '',

        coverages: anyObject,
        discounts: anyObject,
        freePromos: anyObject,

        is_foc: values ? values.is_foc : false,
    });

    console.log('data', data)

    const [planPricing, setPlanPricing] = useState<any>();

    const onChangeBrand = (e: any) => {
        setData('vehicle_brand_id', e)
        getModels(e);
        getVariants(e);
    }
    const getModels = (brand_id: any) => {

        axios.get(route('api.vehicle-models.findBybrandId'), { params: { brand_id: brand_id } }).then((response) => {
            if (response.data) {
                setModels(response.data.data)
                console.log('data after brand', data)
                // setData({ ...data })
            }
        });
    }
    const getVariants = (brand_id: any) => {

        axios.get(route('api.vehicle-variants.findBybrandId'), { params: { brand_id: brand_id } }).then((response) => {
            if (response.data) {
                setVariants(response.data.data)
                console.log('data after variant', data)
                // setData({ ...data })
            }
        });
    }

    useEffect(() => {

        getQuotationPrice(data);

    }, [data.vehicle_model_id, data.warranty_plan_id, data.vehicle_condition_id, data.power_type, data.power_capacity, data.period, data.tax_id, data.with_addon, data.discounts, data.coverages])

    useEffect(() => {

        console.log('warranty_plans_real', warranty_plans_real)

    }, [data.warranty_plan_id])

    const getQuotationPrice = (processData: any) => {

        if (processData.vehicle_model_id && processData.warranty_plan_id && processData.period && processData.tax_id) {
            // if (processData.warranty_plan_id) {

            setIsCalculatePrice(true);

            axios.get(route('plan-pricing.calculate-price'), { params: processData }).then((response: any) => {
                console.log('getQuotationPrice', response);

                setIsCalculatePrice(false);

                if (response.data) {
                    setPlanPricing(response.data.data);
                    onActivatedDateChange(processData.activated_at);
                    // console.log('plan pricing', response.data.data)
                    // setData('price', response.data.data.price);
                } else {
                    setPlanPricing(null);
                    onActivatedDateChange(processData.activated_at);
                    // setData('price', '');
                }
            }).catch((reason: any) => {
                onActivatedDateChange(processData.activated_at);
                setPlanPricing(null);
            });

        } else {
            onActivatedDateChange(processData.activated_at);
            setPlanPricing(null);
        }

    };

    useEffect(() => {
        calculatePrice();
    }, [planPricing]);

    useEffect(() => {
        if (data.country) {
            axios.get(route('api.country-state.states', data.country)).then((response) => {
                console.log('states', response.data.data);
                setStates(response.data ? response.data.data : []);
            });
        } else {
            setStates([]);
        }

    }, [data.country])

    const calculatePrice = () => {

        console.log('planPricing', planPricing);

        if (planPricing && planPricing.retail && planPricing.dealer) {


            setData({
                ...data,
                warranty_plan_price: planPricing.retail.warranty_plan_price,
                subtotal_without_tax: planPricing.retail.subtotal_without_tax,
                subtotal_with_tax: planPricing.retail.subtotal,
                total_coverage: planPricing.retail.total_coverage,
                total_discount: planPricing.retail.total_discount,
                total_tax: planPricing.retail.tax_price,
                total_price: planPricing.retail.total_price,
                coveragesWithAmounts: planPricing.retail.coverages ? planPricing.retail.coverages : [],
                discountWithAmounts: planPricing.retail.discounts ? planPricing.retail.discounts : [],

                dealer_warranty_plan_price: planPricing.dealer.warranty_plan_price,
                dealer_subtotal_without_tax: planPricing.dealer.subtotal_without_tax,
                dealer_subtotal_with_tax: planPricing.dealer.subtotal,
                dealer_total_coverage: planPricing.dealer.total_coverage,
                dealer_total_discount: planPricing.dealer.total_discount,
                dealer_total_tax: planPricing.dealer.tax_price,
                dealer_total_price: planPricing.dealer.total_price,
                dealer_coveragesWithAmounts: planPricing.retail.dealer_coverages ? planPricing.retail.dealer_coverages : [],
                dealer_discountWithAmounts: planPricing.dealer.discounts ? planPricing.dealer.discounts : [],
            })

        } else {
            setData({
                ...data,
                warranty_plan_price: 0,
                subtotal_without_tax: 0,
                subtotal_with_tax: 0,
                total_coverage: 0,
                total_discount: 0,
                total_tax: 0,
                total_price: 0,
                coveragesWithAmounts: [],
                discountWithAmounts: [],

                dealer_warranty_plan_price: 0,
                dealer_subtotal_without_tax: 0,
                dealer_subtotal_with_tax: 0,
                dealer_total_coverage: 0,
                dealer_total_discount: 0,
                dealer_total_tax: 0,
                dealer_total_price: 0,
                dealer_coveragesWithAmounts: [],
                dealer_discountWithAmounts: [],
            })
        }
    }

    const searchVehicle = () => {

        axios.get(route('api.vehicles.index'), { params: { registration_no: searchReg } }).then((response) => {
            console.log('response.data.data', response.data.data);

            if (response.data.data) {
                const vehicle = response.data.data;
                setVehicleFound(response.data.data);

                // console.log('moment', moment())
                // console.log('vehicle moment', moment(vehicle.registration_date).valueOf())

                setData({
                    ...data,
                    chassis_no: vehicle.chassis_no,
                    engine_no: vehicle.engine_no,
                    mileage: vehicle.mileage,
                    power_capacity: vehicle.power_capacity,
                    power_type: vehicle.power_type,
                    registration_date: moment(vehicle.registration_date).toDate(),
                    registration_no: vehicle.registration_no,
                    vehicle_brand_id: String(vehicle.vehicle_brand_id),
                    vehicle_condition_id: String(vehicle.vehicle_condition_id),
                    vehicle_model_id: String(vehicle.vehicle_model_id),
                    year: moment(vehicle.year),
                });
                setPowerCapacity(vehicle.power_capacity);
                getModels(vehicle.vehicle_brand_id);
            } else {
                setData('registration_no', searchReg);
                setVehicleFound(null);
            }
        });
    }

    const searchCustomer = () => {

        axios.get(route('api.customers.index'), { params: { ic: searchIC } }).then((response) => {
            console.log('response.data.data', response.data.data);

            if (response.data.data) {
                const customer = response.data.data;
                setCustomerFound(response.data.data);

                console.log('customer', customer)
                setData({
                    ...data,
                    ic: customer.ic,
                    first_name: customer.first_name,
                    last_name: customer.last_name,
                    nationality: customer.nationality,
                    email: customer.email,
                    phone_no: customer.phone_no,
                    line1: customer.line1,
                    line2: customer.line2,
                    line3: customer.line3,
                    postcode: customer.postcode,
                    city: customer.city,
                    state: customer.state,
                    country: customer.country,
                });
            } else {
                setData('ic', searchIC);
                setCustomerFound(null);
            }
        });
    }

    const onPhoneNoChange = (e: any) => {
        let phone = e.target.value;
        if (e.target.value.substring(0, 1) == '0') {
            phone = phone.replace(/^.{1}/g, settings.phone_country_code.value);
        }
        if (e.target.value && e.target.value.substring(0, 1) != '+') {
            phone = '+' + phone;
        }
        if (e.target.value == '+') {
            phone = '';
        }
        setData('phone_no', phone);
    }

    const onActivatedDateChange = (e: any) => {
        const expiredAt = e ? moment(e).add(data.period, 'years').subtract(1, 'days').toDate() : null;

        setData({
            ...data,
            activated_at: e,
            expired_at: expiredAt
        });
    }

    useEffect(() => {

        if (powerCapacity) {
            setData('power_capacity', powerCapacity);
        }

    }, [powerCapacity])


    const addCoverage = (coverageId: any) => {

        console.log('addCoverage', coverageId);
        // const findDiscount = discounts.find((e: any) => e.id != discountId);
        const findCoverage = coverages.find((e: any) => e.id == coverageId);
        const coverageExist = data.coverages.find((e: any) => e.id == coverageId);

        if (!coverageExist) {
            findCoverage.period = 1;
            console.log('addCoverage', findCoverage)
            const newData = { ...data, coverages: [...data.coverages, findCoverage] };
            setData(newData);
        }
    }

    const editCoverage = (coverageId: any, period: number) => {

        const newDataBefore = data.coverages.filter((e: any) => e.id != coverageId);
        // console.log('newDataBefore', newDataBefore)

        const coverageExist = data.coverages.find((e: any) => e.id == coverageId);
        coverageExist.period = period;

        if (coverageExist) {
            console.log('coverageExist', coverageExist)
            const newData = { ...data, coverages: [...newDataBefore, coverageExist] };
            setData(newData);

            console.log('newData', newData)
        }
    }

    const addDiscount = (discountId: any) => {

        console.log('addDiscount', discountId);
        // const findDiscount = discounts.find((e: any) => e.id != discountId);
        const findDiscount = discounts.find((e: any) => e.id == discountId);
        const discountExist = data.discounts.find((e: any) => e.id == discountId);

        if (!discountExist) {
            const newData = { ...data, discounts: [...data.discounts, findDiscount] };
            setData(newData);
        }
    }

    const addFreePromo = (promoId: any) => {

        console.log('addFreePromo', promoId);
        // const findDiscount = discounts.find((e: any) => e.id != discountId);
        const findPromo = freePromos.find((e: any) => e.id == promoId);
        const promoExist = data.freePromos.find((e: any) => e.id == promoId);

        if (!promoExist) {
            const newData = { ...data, freePromos: [...data.freePromos, findPromo] };
            setData(newData);
        }
    }

    const deleteCoverage = (coverage: any) => {
        const newCoverage = data.coverages.filter((e: any) => { return e.id != coverage.id });
        const newData = { ...data, coverages: newCoverage };
        setData(newData);
    }

    const deleteDiscount = (discount: any) => {
        const newDiscount = data.discounts.filter((e: any) => { return e.id != discount.id });
        const newData = { ...data, discounts: newDiscount };
        setData(newData);
    }

    const deletePromo = (promo: any) => {
        const newPromo = data.freePromos.filter((e: any) => { return e.id != promo.id });
        const newData = { ...data, freePromos: newPromo };
        setData(newData);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!data.total_price || data.total_price == 0) {
            return;
        }

        console.log('test', 'test')
        post(route('policy.store'), {
            data,
            onSuccess: (result) => {
                // console.log('result', result)
                // router.get(route('policy.show', ));
            },
            onError: () => {

            }
        });
    }

    const changeWarrantyPlan = (warranty_plan_id: any) => {

        const realPlan = warranty_plans_real.find((plan: any) => plan.id == warranty_plan_id)

        const minY = realPlan.year_package ? realPlan.year_package : 1;
        setMinYear(minY);

        setData({ ...data, period: minY, warranty_plan_id: warranty_plan_id });
    }

    return (
        <form onSubmit={onSubmit}>
            <AppCard title='Quotations'>
                <div>
                    <Grid mb={10}>
                        <Grid.Col span={12} >
                            <Group justify='flex-end' p={10}>
                                <Button color='green' type='submit' leftSection={<IconDeviceFloppy />} disabled={!data.total_price}>Submit Policy</Button>
                            </Group>
                            {/* <AppCard title='Quotations'> */}
                            <SimpleGrid cols={3} mt={10} mb={10}>
                                <Stack justify='space-between'>
                                    <AppCard leftComponent={<Group>
                                        <IconFileCertificate size={30} />
                                        <Text fz={18} fw={'bolder'} tt={'capitalize'}>{'Warranty Details'}</Text>
                                    </Group>}>
                                        <>
                                            <AppSelect searchable required label='Warranty Plan' id='warranty_plan_id' data={warranty_plans} values={data} onChange={(e: any) => changeWarrantyPlan(e)} />
                                            {/* <AppInput type='number' min={minYear} label='Period (Year)' id='period' values={data} onChange={(e: any) => setData('period', e)} readOnly={minYear > 1} /> */}
                                            <AppSelect required label='Period (Year)' data={policy_years} id='period' values={data} onChange={(e: any) => setData('period', e)} />

                                            {/* policy_years */}
                                            <AppDatePicker required label='Activation Date' id='activated_at' values={data} onChange={onActivatedDateChange} />
                                            <AppDatePicker required disabled label='Expiry Date' id='expired_at' values={data} />

                                        </>
                                    </AppCard>
                                    <AppCard leftComponent={<Group>
                                        <IconFileInvoice size={30} />
                                        <Text fz={18} fw={'bolder'} tt={'capitalize'}>{'Policy Details'}</Text>
                                    </Group>}>
                                        <>
                                            <AppSelect searchable label='Branch' required id='branch_id' values={data} data={branches} onChange={(e: any) => setData('branch_id', e)} />
                                            <AppInput label='Policy No' required id='policy_no' values={data} errors={errors} onChange={(e: any) => setData('policy_no', e.target.value.toLowerCase().replace(/\s/g, ''))} />
                                            <AppSelect label='Policy Type' required id='type' values={data} data={policyTypes} errors={errors} onChange={(e: any) => setData('type', e)} />
                                            <AppTextArea label='Remarks' id='remarks' values={data} errors={errors} onChange={(e: any) => setData('remarks', e.target.value)} />
                                        </>
                                    </AppCard>
                                </Stack>

                                <AppCard leftComponent={<Group>
                                    <IconCar size={30} />
                                    <Text fz={18} fw={'bolder'} tt={'capitalize'}>{'Vehicle Details'}</Text>
                                </Group>}>
                                    <Group gap={5} mt={'md'}>
                                        <TextInput placeholder='Search Registration No' value={searchReg} onChange={(e) => { setSearchReg(e.target.value.toLowerCase().replace(/\s/g, '')) }} style={{ borderTopLeftRadius: 0 }} miw={200} />
                                        <Button onClick={() => searchVehicle()}>Search</Button>
                                    </Group>

                                    {!vehicleFound && <Text mt={10}>Vehicle not found. New record will be create.</Text>}

                                    <AppInput label='Registration No' id='registration_no' required values={data} onChange={(e: any) => setData('registration_no', e.target.value)} readOnly />
                                    <AppInput label='Chassis No' id='chassis_no' required values={data} onChange={(e: any) => setData('chassis_no', e.target.value)} />
                                    <AppInput label='Engine No' id='engine_no' required values={data} onChange={(e: any) => setData('engine_no', e.target.value)} />

                                    <Group gap={5} >
                                        <AppSelect searchable label='Vehicle Brand' required id='vehicle_brand_id' data={vehicle_brands} value={data.vehicle_brand_id} onChange={(e: any) => onChangeBrand(e)} />
                                        <AppSelect searchable label='Vehicle Model' required id='vehicle_model_id' data={models} value={data.vehicle_model_id} onChange={(e: any) => setData('vehicle_model_id', e)} />
                                        <AppSelect searchable label='Vehicle Variant' id='vehicle_variant_id' data={variants} value={data.vehicle_variant_id} onChange={(e: any) => setData('vehicle_variant_id', e)} />
                                    </Group>

                                    <Group gap={5} >
                                        <AppSegmentControl label='Vehicle Power' id='power_type' data={['cc', 'kw']} values={data} onChange={(e: any) => setData('power_type', e)} />
                                        <AppInput mt={35} type='number' value={powerCapacity} onChange={setPowerCapacity} />
                                    </Group>

                                    <AppSelect label='Vehicle Condition' id='vehicle_condition_id' data={vehicle_conditions} values={data} onChange={(e: any) => setData('vehicle_condition_id', e)} />

                                    <AppYearPicker required label='Year' id='year' values={data} onChange={(e: any) => setData('year', e)} />
                                    <AppDatePicker required label='Registration Date' id='registration_date' values={data} onChange={(e: any) => { console.log('registration_date', e); setData('registration_date', e) }} />

                                    {moment().diff(data.registration_date, 'years') > settings.vehicle_max_year.value && <Alert variant="light" color="red" title="Error" mt={'md'}>
                                        Vehicle age cannot more than {settings.vehicle_max_year.value} years
                                    </Alert>}

                                    <AppInput required type='number' label='Mileage' id='mileage' values={data} onChange={(e: any) => setData('mileage', e)} />

                                </AppCard>

                                <AppCard options={{ bg: 'orange.1' }} leftComponent={<Group>
                                    <IconCash size={30} />
                                    <Text fz={18} fw={'bolder'} tt={'capitalize'}>{'Warranty Details'}</Text>
                                </Group>}>
                                    <Box px={'sm'}>

                                        {/* <AppSegmentControl label='Pricing Type' required id='pricing_type' values={data} data={pricingTypes} onChange={(e: any) => setData('pricing_type', e)} /> */}

                                        <AppSelect searchable label='Add Coverage' data={coverageSelect} onChange={(e: any) => addCoverage(e)} />

                                        <Stack gap={10} mt='md'>
                                            {data.coverages && data.coverages.map((coverage: any, index: any) => {
                                                return <Paper p='xs' radius='sm' key={index}>
                                                    <Group justify='space-between' >
                                                        <Text fz='sm'>{coverage.name}: {coverage.price}</Text>
                                                        <Button size='xs' color='red' onClick={() => deleteCoverage(coverage)}>Delete</Button>
                                                    </Group>
                                                    <AppInput type='number' label='Period (Year)' value={coverage.period} onChange={(e: any) => editCoverage(coverage.id, e)} />
                                                </Paper>
                                            })}
                                        </Stack>

                                        <AppSelect searchable label='Add Discount / Loading' data={discountsSelect} onChange={(e: any) => addDiscount(e)} />

                                        <Stack gap={10} mt='md'>
                                            {data.discounts && data.discounts.map((discount: any, index: any) => {
                                                return <Paper p='xs' radius='sm' key={index}>
                                                    <Group justify='space-between'>
                                                        <Text fz='sm'>{discount.name}: {discount.discount}</Text>
                                                        <Button size='xs' color='red' onClick={() => deleteDiscount(discount)}>Delete</Button>
                                                    </Group>
                                                </Paper>
                                            })}
                                        </Stack>

                                        <AppSelect searchable label='Add Free Promo' data={freePromosSelect} onChange={(e: any) => addFreePromo(e)} />

                                        <Stack gap={10} mt='md'>
                                            {data.freePromos && data.freePromos.map((freePromo: any, index: any) => {
                                                return <Paper p='xs' radius='sm' key={index}>
                                                    <Group justify='space-between'>
                                                        <Text fz='sm'>{freePromo.name}: {freePromo.discount}</Text>
                                                        <Button size='xs' color='red' onClick={() => deletePromo(freePromo)}>Delete</Button>
                                                    </Group>
                                                </Paper>
                                            })}
                                        </Stack>
                                        <AppSelect label='Tax' id='tax_id' data={taxes} defaultValue={'1'} values={data} onChange={(e: any) => setData('tax_id', e)} />

                                        {/* <Checkbox
                                            mt='md'
                                            label="Include Add-On"
                                            checked={data.with_addon} onChange={(e: any) => setData('with_addon', e.target.checked)}
                                        /> */}
                                        <Checkbox
                                            mt='md'
                                            label="FOC"
                                            checked={data.is_foc} onChange={(e: any) => setData('is_foc', e.target.checked)}
                                        />

                                        <Stack gap={0} mt={'sm'}>
                                            {/* <Table>
                                                <Table.Thead>
                                                    <Table.Tr>
                                                        <Table.Th></Table.Th>
                                                        <Table.Th>Dealer</Table.Th>
                                                        <Table.Th>Retail</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    <Table.Tr>
                                                        <Table.Td>Subtotal without tax:</Table.Td>
                                                        <Table.Td><AppPrice price={data.subtotal_without_tax} /></Table.Td>
                                                        <Table.Td><AppPrice price={data.subtotal_without_tax} /></Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                        <Table.Td>Total Tax:</Table.Td>
                                                        <Table.Td><AppPrice price={data.total_tax} /></Table.Td>
                                                        <Table.Td><AppPrice price={data.total_tax} /></Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                        <Table.Td>Subtotal with tax:</Table.Td>
                                                        <Table.Td><AppPrice price={data.subtotal_with_tax} /></Table.Td>
                                                        <Table.Td><AppPrice price={data.subtotal_with_tax} /></Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                        <Table.Td>Total Discount:</Table.Td>
                                                        <Table.Td><AppPrice price={data.total_discount} /></Table.Td>
                                                        <Table.Td><AppPrice price={data.total_discount} /></Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                        <Table.Td>Total Price:</Table.Td>
                                                        <Table.Td><AppPrice price={data.total_price} /></Table.Td>
                                                        <Table.Td><AppPrice price={data.total_price} /></Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table> */}
                                            <Box style={{ position: 'relative' }} py='md'>
                                                <LoadingOverlay visible={isCalculatePrice} zIndex={1000} overlayProps={{ radius: "md", blur: 2 }} />
                                                <Text fw='bold' mb={6}>Dealer Price</Text>
                                                <Group justify='space-between'>
                                                    <Text fz={14}>Subtotal (without tax):</Text>
                                                    <Text fz={14} tt={'capitalize'}><AppPrice price={data.dealer_subtotal_without_tax} /></Text>
                                                </Group>
                                                <Group justify='space-between'>
                                                    <Text fz={14}>Total Tax:</Text>
                                                    <Text fz={14} tt={'capitalize'}><AppPrice price={data.dealer_total_tax} /></Text>
                                                </Group>
                                                <Group justify='space-between'>
                                                    <Text fz={14}>Subtotal (with tax):</Text>
                                                    <Text fz={14} tt={'capitalize'}><AppPrice price={data.dealer_subtotal_with_tax} /></Text>
                                                </Group>
                                                <Group justify='space-between'>
                                                    <Text fz={14}>Total Coverage:</Text>
                                                    <Text fz={14} tt={'capitalize'}><AppPrice price={data.dealer_total_coverage} /></Text>
                                                </Group>
                                                <Group justify='space-between'>
                                                    <Text fz={14}>Total Discount:</Text>
                                                    <Text fz={14} tt={'capitalize'}><AppPrice price={data.dealer_total_discount} /></Text>
                                                </Group>
                                                <Group justify='space-between'>
                                                    <Text fz={16} fw={'bolder'}>Total Price:</Text>
                                                    <Text fz={16} tt={'capitalize'} fw={'bolder'}> <AppPrice price={data.dealer_total_price} /></Text>
                                                </Group>

                                                <Text fw='bold' mb={6} mt={25}>Retail Price</Text>
                                                <Group justify='space-between'>
                                                    <Text fz={14}>Subtotal (without tax):</Text>
                                                    <Text fz={14} tt={'capitalize'}><AppPrice price={data.subtotal_without_tax} /></Text>
                                                </Group>
                                                <Group justify='space-between'>
                                                    <Text fz={14}>Total Tax:</Text>
                                                    <Text fz={14} tt={'capitalize'}><AppPrice price={data.total_tax} /></Text>
                                                </Group>
                                                <Group justify='space-between'>
                                                    <Text fz={14}>Subtotal (with tax):</Text>
                                                    <Text fz={14} tt={'capitalize'}><AppPrice price={data.subtotal_with_tax} /></Text>
                                                </Group>
                                                <Group justify='space-between'>
                                                    <Text fz={14}>Total Coverage:</Text>
                                                    <Text fz={14} tt={'capitalize'}><AppPrice price={data.total_coverage} /></Text>
                                                </Group>
                                                <Group justify='space-between'>
                                                    <Text fz={14}>Total Discount:</Text>
                                                    <Text fz={14} tt={'capitalize'}><AppPrice price={data.total_discount} /></Text>
                                                </Group>
                                                <Group justify='space-between'>
                                                    <Text fz={16} fw={'bolder'}>Total Price:</Text>
                                                    <Text fz={16} tt={'capitalize'} fw={'bolder'}> <AppPrice price={data.total_price} /></Text>
                                                </Group>
                                            </Box>

                                        </Stack>
                                        {/* <AppInput label='Selling' required id='full_name' /> */}
                                    </Box>
                                </AppCard>
                            </SimpleGrid>
                            {/* </AppCard> */}
                        </Grid.Col>
                    </Grid>
                    <Divider mb={20} />
                    <Grid>
                        <Grid.Col span={4}>
                            <AppCard leftComponent={<Group>
                                <IconUser size={30} />
                                <Text fz={18} fw={'bolder'} tt={'capitalize'}>{'Customer Details'}</Text>
                            </Group>}>
                                <Box px={'sm'}>
                                    <Group gap={5} mt={'md'}>
                                        <TextInput placeholder={'Search ' + settings.ic_label ? settings.ic_label.value : 'KTP' + ' No'} value={searchIC} onChange={(e) => setSearchIC(e.target.value.replace(/\s/g, ''))} style={{ borderTopLeftRadius: 0 }} miw={200} />
                                        <Button onClick={() => searchCustomer()}>Search</Button>
                                    </Group>

                                    {!customerFound && <Text mt={10}>Customer not found. New record will be create.</Text>}

                                    <AppInput label={settings.ic_label ? settings.ic_label.value : 'KTP'} required id='ic' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('ic', e.target.value)} readOnly />
                                    <AppInput label='First Name' required id='first_name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('first_name', e.target.value)} />
                                    <AppInput label='Last Name' required id='last_name' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('last_name', e.target.value)} />
                                    <AppSelect searchable label='Nationality' required id='nationality' data={countries} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('nationality', e)} />

                                    <Divider label='Identity' mt={15} />

                                    <AppSegmentControl data={[
                                        { 'label': 'Email &  Phone', 'value': 'email' },
                                        { 'label': 'Username', 'value': 'username' }
                                    ]} value={identityType} onChange={(e: any) => { setData({ ...data, email: '', phone_no: '', username: '' }); setIdentityType(e) }} />

                                    {identityType == 'email' && <>
                                        <AppInput required label='Email' id='email' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('email', e.target.value)} />
                                        <AppInput label='Phone No' required id='phone_no' values={data} errors={errors ? errors : null} onChange={(e: any) => onPhoneNoChange(e)} />
                                    </>}
                                    {identityType == 'username' && <>
                                        <AppInput required label='Username' id='username' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('username', e.target.value)} />
                                    </>}

                                    <Group mt={'md'}>
                                        <Text>Address</Text>
                                    </Group>

                                    <AppInput placeholder='Line 1' id='line1' required values={data} errors={errors ? errors : null} onChange={(e: any) => setData('line1', e.target.value)} />
                                    <AppInput placeholder='Line 2' id='line2' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('line2', e.target.value)} />
                                    <AppInput placeholder='Line 3' id='line3' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('line3', e.target.value)} />

                                    <AppInput label='City' required id='city' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('city', e.target.value)} />
                                    <AppInput label='Postcode' required id='postcode' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('postcode', e.target.value)} />
                                    <AppSelect searchable label='Country' required id='country' data={countries} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('country', e)} />
                                    <AppSelect searchable label='State' required id='state' data={states} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('state', e)} />
                                </Box>
                            </AppCard>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <AppCard leftComponent={<Group>
                                <IconLockAccess size={30} />
                                <Text fz={18} fw={'bolder'} tt={'capitalize'}>{'Staff Details'}</Text>
                            </Group>}>
                                <>
                                    <AppInput required label='Salesman' id='salesman' values={data} errors={errors ? errors : null} onChange={(e: any) => setData('salesman', e.target.value)} />
                                    <AppSelect required searchable label='Dealer' id='dealer_id' data={dealers} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('dealer_id', e)} />
                                    <AppSelect required searchable label='Marketing Officer' id='marketing_officer_id' data={mos} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('marketing_officer_id', e)} />
                                    <AppSelect required searchable label='Technical In Charge' id='technical_staff_id' data={technicals} values={data} errors={errors ? errors : null} onChange={(e: any) => setData('technical_staff_id', e)} />

                                </>
                            </AppCard>
                        </Grid.Col>

                    </Grid>


                </div>
            </AppCard>
        </form>
    )
}


Create.layout = (page: any) => <AdminLayout children={page} title='Create Policy' />;