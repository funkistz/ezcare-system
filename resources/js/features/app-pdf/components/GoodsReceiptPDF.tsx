import React, { useState } from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Button } from '@mantine/core';
import moment from 'moment';
import { AppPriceShow } from '@/Components';

const styles = StyleSheet.create({
    page: {
        padding: 25,
        display: 'flex',
        flexDirection: 'row',
    },
    section: {
        width: '50%',
    },
    alignRight: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    logoWrapper: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 20
    },
    logo: {
        width: 150,
        height: 70,
    },
    h3: {
        fontFamily: 'Roboto Bold',
        fontSize: 9,
        marginBottom: 5
    },
    slim: {
        fontWeight: 200,
        fontSize: 9,
    },
    h3Slim: {
        fontFamily: 'Roboto Bold',
        fontSize: 9,
    },
    p: {
        fontFamily: 'Roboto',
        fontSize: 9,
        marginBottom: 2
    },
    addressLine: {
        fontFamily: 'Roboto',
        fontSize: 9,
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    pSlim: {
        fontFamily: 'Roboto',
        fontSize: 9,
        marginBottom: 6
    },
    table: {
        // backgroundColor: 'green'
        border: '1px solid #000',
        borderBottom: '0px',
        fontSize: 9,
        marginTop: 10
    },
    tableNoBorder: {
        fontSize: 9,
        marginTop: 10
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        padding: 5,
        borderBottom: '1px solid #000',
    },
    tableCol1: {
        width: "5%",
        borderRight: '1px solid #000'
    },
    tableCol2: {
        width: "46%",
        borderRight: '1px solid #000'
    },
    tableCol3: {
        width: "13%",
        borderRight: '1px solid #000'
    },
    tableCol4: {
        width: "18%",
        borderRight: '1px solid #000'
    },
    tableCol5: {
        width: "18%",
    },
    tableColFlexBottom: {
        display: 'flex',
        alignItems: 'flex-end',
        // justifyContent: 'flex-end',
    },
    tableCell: {
        width: "95%",
        margin: "auto",
        marginBottom: 5,
        fontSize: 9,
    },
    tableCelRight: {
        width: "95%",
        textAlign: 'right',
        marginRight: 10,
        marginBottom: 5,
        fontSize: 9,

    },
    tableCol2Full: {
        width: "77%",
        borderRight: '1px solid #000'
    },
});

export default function GoodsReceiptPDF({ data, title, amount, date }: { data: any, title: any, amount?: any, date?:any }) {

    const [first, setfirst] = useState(data)
    const [domain, setdomain] = useState(window.location.origin)

    const yearPackage = data.warranty_plan.year_package ? data.warranty_plan.year_package : 1;
    const yearName = (yearPackage > 1) ? data.policy.period + ' YEARS' : data.policy.period + ' YEAR';

    console.log('PolicyInvoicePDF', data)

    console.log('amount: ', amount)


    Font.register({
        family: 'Roboto',
        src: '/fonts/Roboto/Roboto-Regular.ttf'
    });
    Font.register({
        family: 'Roboto Medium',
        src: '/fonts/Roboto/Roboto-Medium.ttf'
    });
    Font.register({
        family: 'Roboto Bold',
        src: '/fonts/Roboto/Roboto-Bold.ttf'
    });

    const addresses = data.bill_to_address.split("\\n");


    const totalPrice = (array: any) => {
        const sum = array.reduce((accumulator: any, currentObject: any, i: any) => {
            if (i == 0) {
                console.log('i: ', amount)
                return accumulator + Number(amount);
            } else {
                return accumulator + currentObject.total_with_tax;
            }
        }, 0);

        return sum
    }

    return (
        <Document title={title}>
            <Page size="A4" style={styles.page}>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Text style={{ fontSize: 25, fontFamily: 'Roboto Bold', marginTop: 10 }}>OFFICIAL RECEIPT</Text>
                        </View>
                        <View style={styles.logoWrapper}>
                            {/* <Text>Image</Text> */}
                            <Image cache src={domain + '/images/ezcare_warranty_logo_award.png'} style={styles.logo} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <View style={styles.row}>
                                <Text style={styles.h3}>EZCARE WARRANTY SDN BHD</Text>
                                <Text style={{ ...styles.slim, marginLeft: 2 }}>(1213936-K)</Text>
                            </View>
                            {data.branch_address && <>
                                <Text style={styles.addressLine}>{data.branch_address.line1}</Text>
                                {data.billable_address.line2 != '' && <Text style={styles.addressLine}>{data.branch_address.line2}</Text>}
                                {data.billable_address.line3 != '' && <Text style={styles.addressLine}>{data.branch_address.line3}</Text>}
                                <Text style={styles.addressLine}>{data.branch_address.postcode} {data.branch_address.city}</Text>
                                <Text style={styles.addressLine}>{data.branch_address.state}</Text>
                            </>}

                            <div style={{ marginTop: 10 }} />

                            <Text style={styles.h3}>BILL TO</Text>
                            <Text style={styles.h3}>{data.billable.full_name}</Text>
                            {data.billable_address && <>
                                <Text style={styles.addressLine}>{data.billable_address.line1}</Text>
                                {data.billable_address.line2 != '' && <Text style={styles.addressLine}>{data.billable_address.line2}</Text>}
                                {data.billable_address.line3 != '' && <Text style={styles.addressLine}>{data.billable_address.line3}</Text>}
                                <Text style={styles.addressLine}>{data.billable_address.postcode} {data.billable_address.city}</Text>
                                <Text style={styles.addressLine}>{data.billable_address.state}</Text>
                            </>}
                            {/* <Text style={styles.p}>{data.bill_to_name}</Text>
                            {addresses.map((address: any, index: any) => {
                                return <Text key={index} style={styles.p}>{address}</Text>;
                            })} */}
                        </View>
                        <View style={{ ...styles.section, textAlign: 'right' }}>
                            <Text style={styles.h3Slim}>SST ID NO:</Text>
                            <Text style={styles.pSlim}>B16-1808-31025881</Text>
                            <Text style={styles.h3Slim}>DATE:</Text>
                            <Text style={styles.pSlim}>{ date ? moment(date).format('D/MM/YYYY') : '-' }</Text>
                            <Text style={styles.h3Slim}>REFERENCE NO:</Text>
                            {/* <Text style={{ ...styles.pSlim, textTransform: 'uppercase' }}>{data.policy.branch.code + String(data.id).padStart(6, '0')}</Text> */}
                            <Text style={{ ...styles.pSlim, textTransform: 'uppercase' }}>{data.invoice_no + 'R'}</Text>
                            <Text style={styles.h3Slim}>INVOICE NO:</Text>
                            <Text style={{ ...styles.pSlim, textTransform: 'uppercase' }}>{data.invoice_no}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={{ ...styles.tableCol1, ...styles.tableCol }}><Text>NO.</Text></View>
                                <View style={{ ...styles.tableCol2Full, ...styles.tableCol }}><Text>DESCRIPTION</Text></View>
                                {/* <View style={{ ...styles.tableCol3, ...styles.tableCol, ...styles.tableColFlexBottom }}>
                                    <Text>QUANTITY</Text>
                                </View>
                                <View style={{ ...styles.tableCol4, ...styles.tableCol, ...styles.tableColFlexBottom }}>
                                    <Text>UNIT PRICE (RM)</Text>
                                </View> */}
                                <View style={{ ...styles.tableCol5, ...styles.tableCol, ...styles.tableColFlexBottom }}><Text>AMOUNT WITH TAX (RM)</Text></View>
                            </View>
                            {data.items.map((item: any, index: any) => {
                                return <View style={styles.tableRow} key={index}>
                                    <View style={{ ...styles.tableCol1, ...styles.tableCol }}>
                                        <Text>{index + 1}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol2Full, ...styles.tableCol }}>
                                        {(index == 0) && <>
                                            <Text style={{ ...styles.p, textTransform: 'uppercase' }}>{data.policy.vehicle.name}</Text>
                                            <Text style={{ ...styles.p, textTransform: 'uppercase' }}>Reg no: {data.policy.vehicle.registration_no}</Text>
                                            <Text style={styles.p}>YEAR: {data.policy.vehicle.year}</Text>
                                            <Text style={styles.p}>ENGINE NO: {data.policy.vehicle.engine_no}</Text>
                                            <Text>CHASSIS NO:{data.policy.vehicle.chassis_no}</Text>
                                            <Text style={{ ...styles.p, marginBottom: 10, textTransform: 'uppercase' }}>CUSTOMER NAME: {data.policy.customer.full_name}</Text>

                                            <Text style={styles.p}>{data.warranty_plan?.name} </Text>
                                            <Text style={styles.p}>{yearName}</Text>
                                        </>}

                                        {/* warranty_plan */}
                                        {(index > 0) && <>
                                            <Text style={styles.p}>{item.description}</Text>
                                        </>}

                                        {(index == 0) && <>
                                            {data.free_promos && data.free_promos.map((promo: any, index: any) => {
                                                return <Text key={index} style={{ ...styles.p, textTransform: 'uppercase' }}>{promo.name}</Text>
                                            })}
                                        </>}
                                    </View>
                                    {/* <View style={{ ...styles.tableCol3, ...styles.tableCol, ...styles.tableColFlexBottom }}><Text>{item.quantity}</Text></View>
                                    <View style={{ ...styles.tableCol4, ...styles.tableCol, ...styles.tableColFlexBottom }}>
                                        {item.rate > 0 && <>
                                            <Text><AppPriceShow price={item.rate} /></Text>
                                            <Text>SST: <AppPriceShow price={item.tax_amount} /></Text>
                                        </>
                                        }
                                    </View> */}
                                    <View style={{ ...styles.tableCol5, ...styles.tableCol, ...styles.tableColFlexBottom, borderBottomWidth: index == (data.items.length - 1) ? 1 : 0 }}>
                                        {index == (data.items.length - 1) && <Text>RM <AppPriceShow price={index == (data.items.length - 1) ? amount : ''} /></Text>}
                                    </View>
                                </View>
                            })}
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.tableNoBorder}>
                            {/* <View style={styles.tableRow}>
                                <View style={{ width: "64%" }}></View>
                                <View style={{ width: "16%", paddingTop: 0, ...styles.tableColFlexBottom }}><Text>Subtotal:</Text></View>
                                <View style={{ width: "20%", paddingTop: 0, paddingRight: 5, ...styles.tableColFlexBottom }}><Text>RM <AppPriceShow price={data.subtotal} /></Text></View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={{ width: "64%" }}></View>
                                <View style={{ width: "16%", paddingTop: 6, ...styles.tableColFlexBottom }}><Text>Discount:</Text></View>
                                <View style={{ width: "20%", paddingTop: 6, paddingRight: 5, ...styles.tableColFlexBottom }}><Text>RM <AppPriceShow price={data.discount} /></Text></View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={{ width: "64%" }}></View>
                                <View style={{ width: "16%", paddingTop: 6, ...styles.tableColFlexBottom }}><Text>Tax:</Text></View>
                                <View style={{ width: "20%", paddingTop: 6, paddingRight: 5, ...styles.tableColFlexBottom }}><Text>RM <AppPriceShow price={data.tax} /></Text></View>
                            </View> */}
                            <View style={styles.tableRow}>
                                <View style={{ width: "64%" }}></View>
                                <View style={{ width: "16%", paddingTop: 6, ...styles.tableColFlexBottom }}><Text>Total:</Text></View>
                                <View style={{ width: "20%", paddingTop: 6, paddingRight: 5, ...styles.tableColFlexBottom }}><Text>RM <AppPriceShow price={amount} /></Text></View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
// /images/ezcare_warranty_logo_award.png