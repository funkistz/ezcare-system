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
    h2: {
        fontFamily: 'Roboto Bold',
        fontSize: 14,
        marginBottom: 5
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
        fontSize: 8,
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
        marginTop: 10,
        padding: 0,
        position: 'relative'
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
        padding: 2,
        borderBottom: '1px solid #000',
        fontSize: 6,

    },
    tableCol1: {
        width: "3vw",
        borderRight: '1px solid #000',
    },
    tableCol2: {
        width: "8vw",
        borderRight: '1px solid #000'
    },

    tableCol3: {
        width: "8vw",
        borderRight: '1px solid #000'
    },
    tableCol4: {
        width: "8vw",
        borderRight: '1px solid #000'
    },
    tableCol5: {
        width: "12vw",
        borderRight: '1px solid #000'
    },
    tableCol6: {
        width: "12vw",
        borderRight: '1px solid #000'
    },
    tableCol7: {
        width: "8vw",
        borderRight: '1px solid #000'
    },
    tableCol8: {
        width: "8vw",
        borderRight: '1px solid #000'
    },
    tableCol9: {
        width: "8vw",
        borderRight: '1px solid #000'
    },
    tableCol10: {
        width: "8vw",
        borderRight: '1px solid #000'
    },
    tableCol11: {
        width: 50,
    },
    tableColYearly: {
        width: "7.62vw",
        borderRight: '1px solid #000'
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
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    centerRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    rightRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    flexBetween: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default function SOAPDF({ data, title }: { data: any, title: any }) {

    const [first, setfirst] = useState(data)
    const [domain, setdomain] = useState(window.location.origin)

    // const yearPackage = data.warranty_plan.year_package ? data.warranty_plan.year_package : 1;
    // const yearName = (yearPackage > 1) ? data.policy.period + ' YEARS' : data.policy.period + ' YEAR';

    console.log('PolicyInvoicePDF', data)

    // return <></>;

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

    // const addresses = data.bill_to_address.split("\\n");

    return (
        <Document title={title}>
            <Page size="A4" style={styles.page}>
                <View style={styles.column}>
                    <View style={styles.header}>
                        <View style={styles.column}>
                            <View style={styles.row}>
                                <Text style={styles.h3}>EZCARE WARRANTY SDN BHD</Text>
                                <Text style={{ ...styles.slim, marginLeft: 2 }}>(1213936-K)</Text>

                            </View>
                            <Text style={styles.addressLine}>NO 1A & 3</Text>
                            <Text style={styles.addressLine}>JALAN 8/1, SEKSYEN 8</Text>
                            <Text style={styles.addressLine}>43650 BANDAR BARU BANGI</Text>
                            <Text style={styles.addressLine}>SELANGOR</Text>
                            <Text style={styles.addressLine}>No. Tel : 03-8922 0571/0572</Text>
                        </View>

                        <View style={styles.logoWrapper}>
                            {/* <Text>Image</Text> */}
                            <Image cache src={domain + '/images/ezcare_warranty_logo_award.png'} style={styles.logo} />
                        </View>
                    </View>
                    <View style={{ ...styles.rightRow }}>
                        <Text style={styles.addressLine}>DATE : {moment().format('DD/MM/yyyy')}</Text>
                    </View>
                    <View style={{ ...styles.rightRow }}>
                        <Text style={styles.addressLine}>SST REG NO. : B16-1808-31025881</Text>
                    </View>
                    <View style={styles.centerRow}>
                        <Text style={styles.h2}>STATEMENT OF ACCOUNT</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            {data.dealer && data.dealer.main_address && <>
                                <Text style={styles.h3}>{data.dealer.name}</Text>
                                <Text style={styles.addressLine}>{data.dealer.main_address.line1}</Text>
                                {data.dealer.main_address.line2 != '' && <Text style={styles.addressLine}>{data.dealer.main_address.line2}</Text>}
                                {data.dealer.main_address.line3 != '' && <Text style={styles.addressLine}>{data.dealer.main_address.line3}</Text>}
                                <Text style={styles.addressLine}>{data.dealer.main_address.postcode} {data.dealer.main_address.city}</Text>
                                <Text style={styles.addressLine}>{data.dealer.main_address.state}</Text>
                            </>}

                            <div style={{ marginTop: 10 }} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{ ...styles.table, width: '100vw' }}>
                            <View style={{ ...styles.tableRow, width: '100vw' }}>
                                <View style={{ ...styles.tableCol1, ...styles.tableCol }}><Text>NO.</Text></View>
                                <View style={{ ...styles.tableCol2, ...styles.tableCol }}><Text>Invoice Date</Text></View>
                                <View style={{ ...styles.tableCol3, ...styles.tableCol }}><Text>Invoice No.</Text></View>
                                <View style={{ ...styles.tableCol4, ...styles.tableCol }}><Text>Vehicle Reg No.</Text></View>
                                <View style={{ ...styles.tableCol5, ...styles.tableCol }}><Text>Vehicle Description</Text></View>
                                <View style={{ ...styles.tableCol6, ...styles.tableCol }}><Text>Chasis No.</Text></View>
                                <View style={{ ...styles.tableCol7, ...styles.tableCol }}><Text>Payment Date</Text></View>
                                <View style={{ ...styles.tableCol8, ...styles.tableCol }}><Text>Receipt No./Payment Reference</Text></View>
                                <View style={{ ...styles.tableCol9, ...styles.tableCol, ...styles.tableColFlexBottom }}><Text>Debit (RM)</Text></View>
                                <View style={{ ...styles.tableCol10, ...styles.tableCol, ...styles.tableColFlexBottom }}><Text>Credit (RM)</Text></View>
                                <View style={{ ...styles.tableCol11, ...styles.tableCol, ...styles.tableColFlexBottom }}><Text>Balance (RM)</Text></View>
                            </View>
                            {data.items && data.items.data && data.items.data.map((item: any, index: any) => {
                                return <View style={{ ...styles.tableRow, width: '100vw' }} key={index}>
                                    <View style={{ ...styles.tableCol1, ...styles.tableCol }}>
                                        <Text>{index + 1}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol2, ...styles.tableCol }}>
                                        <Text>{item.invoice_date}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol3, ...styles.tableCol }}>
                                        <Text>{item.invoice_no}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol4, ...styles.tableCol }}>
                                        <Text>{item.registartion_no}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol5, ...styles.tableCol }}>
                                        <Text>{item.vehicle}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol6, ...styles.tableCol }}>
                                        <Text>{item.chassis_no}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol7, ...styles.tableCol }}>
                                        <Text>{item.paid_at}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol8, ...styles.tableCol }}>
                                        <Text>{item.payment_remarks}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol9, ...styles.tableCol, ...styles.tableColFlexBottom }}>
                                        <Text>{item.debit}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol10, ...styles.tableCol, ...styles.tableColFlexBottom }}>
                                        <Text>{item.credit}</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol11, ...styles.tableCol, ...styles.tableColFlexBottom }}>
                                        <Text>{item.balance}</Text>
                                    </View>
                                </View>
                            })}
                            <View style={{ ...styles.tableRow, width: '100vw' }}>
                                <View style={{ ...styles.tableCol8, ...styles.tableCol, ...styles.tableColFlexBottom, width: '67vw' }}>
                                    <Text>TOTAL</Text>
                                </View>
                                <View style={{ ...styles.tableCol9, ...styles.tableCol, ...styles.tableColFlexBottom }}>
                                    <Text>{data.total.debit}</Text>
                                </View>
                                <View style={{ ...styles.tableCol10, ...styles.tableCol, ...styles.tableColFlexBottom }}>
                                    <Text>{data.total.credit}</Text>
                                </View>
                                <View style={{ ...styles.tableCol11, ...styles.tableCol, ...styles.tableColFlexBottom }}>
                                    <Text>{data.total.balance}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{ ...styles.table, width: '100vw', marginTop: 20 }}>
                            <View style={{ ...styles.tableRow, width: '100vw' }} >
                                {data.yearly && Object.keys(data.yearly).map((index: any) => {
                                    return <View key={index} style={{ ...styles.tableColYearly, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>{index}</Text>
                                    </View>
                                })}
                            </View>
                            <View style={{ ...styles.tableRow, width: '100vw' }} >
                                {data.yearly && Object.keys(data.yearly).map((index: any) => {
                                    return <View key={index} style={{ ...styles.tableColYearly, ...styles.tableCol, textAlign: 'right' }}>
                                        <Text>{data.yearly[index]}</Text>
                                    </View>
                                })}
                            </View>
                            <View style={{ ...styles.tableRow, width: '100vw' }}>
                                <View style={{ ...styles.tableCol, textAlign: 'right', width: '91.5%' }}>
                                    <Text>TOTAL OUTSTANDING &nbsp;&nbsp;&nbsp; RM {data.total_yearly}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        {/* <View style={styles.tableNoBorder}>
                            <View style={styles.tableRow}>
                                <View style={{ width: "64%" }}></View>
                                <View style={{ width: "16%", paddingTop: 6, ...styles.tableColFlexBottom }}><Text>Total:</Text></View>
                                <View style={{ width: "20%", paddingTop: 6, paddingRight: 5, ...styles.tableColFlexBottom }}><Text>RM <AppPriceShow price={data.total} /></Text></View>
                            </View>
                        </View> */}
                    </View>
                    <View style={styles.row}>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ ...styles.p, marginBottom: 5 }}>NOTE TO RECIPIENT</Text>
                            <Text style={{ ...styles.p, marginBottom: 20 }}></Text>
                            <View style={styles.row}>
                                <Text style={{ ...styles.p, width: 150 }}>BENEFICIARY :</Text>
                                <Text style={{ ...styles.p, width: 200 }}>EZCARE WARRANTY SDN BHD</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={{ ...styles.p, width: 150 }}>BENEFICIARY'S ACCOUNT :</Text>
                                <Text style={{ ...styles.p, width: 200 }}>5623 8452 5692</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={{ ...styles.p, width: 150 }}>BENEFICIARY'S BANK :</Text>
                                <Text style={{ ...styles.p, width: 200 }}>MAYBANK</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ ...styles.p, fontSize: 7 }}>1. Please email the bank slip at info@ezcare-warranty.com once payment has been made.</Text>
                        <Text style={{ ...styles.p, fontSize: 7 }}>2. All details and amount show will be considered correct.</Text>
                        <Text style={{ ...styles.p, fontSize: 7 }}>3. Any discrepancy must inform us in writing within 3 days.</Text>
                        <Text style={{ ...styles.p, fontSize: 7 }}>4. Please do not hesitate to contact us if you need any further information.</Text>
                    </View>
                    <View style={{ ...styles.centerRow }}>
                        <Text style={{ fontSize: 8, fontStyle: 'italic' }}>This is a computer-generated document. No signature is required.</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
// /images/ezcare_warranty_logo_award.png