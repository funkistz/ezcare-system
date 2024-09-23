import React from 'react'
import { AspectRatio, Button, Group, Modal, Paper } from '@mantine/core';
import { IconFileInvoice } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { PolicyInvoicePDFMy, PolicyInvoicePDFId } from '@/features/app-pdf';
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { useViewportSize } from '@mantine/hooks';
import { usePage } from '@inertiajs/react';
import GoodsReceiptPDF from '@/features/app-pdf/components/GoodsReceiptPDF';

export default function GoodsReceipt({ data, name, label, amount, date }: { data: any, name?: string, label?: string, amount?:any, date?:any }) {

    const { settings }: any = usePage().props;
    const [opened, { open, close }] = useDisclosure(false);
    const { height, width } = useViewportSize();

    const template = settings?.invoice_pdf_template ? settings?.invoice_pdf_template.value : 1;

    if(Math.sign(amount) == 1 || data.invoice_type == 'Dealer') {
        return  <>
            <Button size='xs' color='orange' leftSection={<IconFileInvoice size={16} />} onClick={() => { open() }}>{label}</Button>
            <Modal opened={opened} onClose={close} title="Invoice" size='xl'>

                <AspectRatio ratio={1 / 1.41} mah={height - 200} mx={'auto'}>
                    {opened && (template == 1) && <PDFViewer height={height - 1000} key={Date.now()}>
                        {/* <PolicyInvoicePDFId data={data} title={Date.now()} key={Date.now()} /> */}
                    </PDFViewer>}
                    {opened && (template == 2) && <PDFViewer height={height - 1000} key={Date.now()}>
                        <GoodsReceiptPDF data={data} title={Date.now()} key={Date.now()} amount={amount} date={date} />
                    </PDFViewer>}
                </AspectRatio>

            </Modal>
        </>
    }

    // return (
    //     <>
    //         <Button size='xs' color='orange' leftSection={<IconFileInvoice size={16} />} onClick={() => { open() }}>{label}</Button>
    //         <Modal opened={opened} onClose={close} title="Invoice" size='xl'>

    //             <AspectRatio ratio={1 / 1.41} mah={height - 200} mx={'auto'}>
    //                 {opened && (template == 1) && <PDFViewer height={height - 1000} key={Date.now()}>
    //                     {/* <PolicyInvoicePDFId data={data} title={Date.now()} key={Date.now()} /> */}
    //                 </PDFViewer>}
    //                 {opened && (template == 2) && <PDFViewer height={height - 1000} key={Date.now()}>
    //                     <GoodsReceiptPDF data={data} title={Date.now()} key={Date.now()} amount={amount} />
    //                 </PDFViewer>}
    //             </AspectRatio>

    //         </Modal>
    //     </>
    // )
}
