import React from 'react'
import { AspectRatio, Button, Group, Modal, Paper } from '@mantine/core';
import { IconFileInvoice } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { PolicyInvoicePDFMy, PolicyInvoicePDFId } from '@/features/app-pdf';
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { useViewportSize } from '@mantine/hooks';
import { usePage } from '@inertiajs/react';

export default function InvoicePreview({ data, name }: { data: any, name: string }) {

    const { settings }: any = usePage().props;
    const [opened, { open, close }] = useDisclosure(false);
    const { height, width } = useViewportSize();

    const template = settings?.invoice_pdf_template ? settings?.invoice_pdf_template.value : 1;

    return (
        <>
            <Button size='xs' color='orange' leftSection={<IconFileInvoice size={16} />} onClick={() => { open() }}>Download Invoice</Button>
            <Modal opened={opened} onClose={close} title="Invoice" size='xl'>

                <AspectRatio ratio={1 / 1.41} mah={height - 200} mx={'auto'}>
                    {opened && (template == 1) && <PDFViewer height={height - 1000} key={Date.now()}>
                        <PolicyInvoicePDFId data={data} title={Date.now()} key={Date.now()} />
                    </PDFViewer>}
                    {opened && (template == 2) && <PDFViewer height={height - 1000} key={Date.now()}>
                        <PolicyInvoicePDFMy data={data} title={Date.now()} key={Date.now()} />
                    </PDFViewer>}
                </AspectRatio>

            </Modal>
        </>
    )
}
