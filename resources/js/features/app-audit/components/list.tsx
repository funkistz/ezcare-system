import { AppTable, UpdateButton } from '@/Components'
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useForm, usePage } from '@inertiajs/react';
import { Box, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ListLog({ title = 'Audit Log', size = 'lg', modelName, modelId,  options = {} }: { title?: string, size?: string, modelName:string, modelId: Number, options?: any }) {

    const [opened, { open, close }] = useDisclosure(false);
    const { policy }: any = usePage().props;
    const { height, width } = useWindowDimensions();
    const [respond, setRespond] = useState<any>([]); 

    useEffect(() => {
        if (opened) {
            callAPI();
        }
    }, [opened]);

    const tableData = (data: []) => {
        const values: any = [];
        data.map((value: any) => {
            values.push({
                'model': value?.auditable_type,
            });
        })
        return values;
    }

    const headerOptions = {
        'action': { ta: 'right' }
    }


    const callAPI = async () => {
        const params = {
            model_name: modelName,
            model_id: modelId ? modelId.toString() : ''
        }

        const result = await axios.post(route('api.audit.getlist', params)).then((result) => {
            let data = result.data;
            setRespond(data)
            console.log('result', data);

        }).catch((error) => {
            console.log('Show error notification!', error)
            return Promise.reject(error)
        })
    }
    
    return <>
        <Modal opened={opened} onClose={close} title={title} size={size} radius={'lg'} padding='md' closeOnClickOutside={false} mah={height}  >
            <Box mah={height - 200} style={{ overflow: 'scroll' }}>
                <AppTable headerOptions={headerOptions} data={tableData(respond)} />
            </Box>
        </Modal>
        <UpdateButton label={title} onClick={open} options={options} />
    </>
}
