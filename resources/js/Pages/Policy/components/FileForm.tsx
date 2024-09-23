import { AppInput, AppSelect } from '@/Components'
import { Paper, Image } from '@mantine/core'
import React from 'react'

export default function FileForm({ file }: { file: any }) {

    const types = [
        { label: 'Grant', value: 'grant' },
        { label: 'Vehicle', value: 'vehicle' },
        { label: 'Diagnose', value: 'diagnose' },
        { label: 'Other', value: 'other' },
    ];

    return (
        <>
            <Paper p='xs' w={250}>
                <Image src={'https://www.invoicesimple.com/wp-content/uploads/2018/06/sample-invoice-colored-red.png'} />
                <AppSelect placeholder='Type' data={types} />
                <AppInput label='Name' />
                <AppInput label='Remarks' />
            </Paper>
        </>
    )
}
