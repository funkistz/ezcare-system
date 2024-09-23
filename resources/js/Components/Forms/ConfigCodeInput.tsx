import React, { useState } from 'react'
import { Group, Switch } from '@mantine/core';
import AppInput from './AppInput';

export default function ConfigCodeInput({ values, setData, errors = null, isEdit = false }: { values: any, setData: any, errors?: any, isEdit?: any }) {

    const [auto, setAuto] = useState(true)

    const onChange = (e: any) => {
        if (auto && e.target.id == 'name' && !isEdit) {
            const tempName = urlSafe(e.target.value);
            setData({ ...values, code: tempName, [e.target.id]: e.target.value })
        } else {
            setData({ ...values, [e.target.id]: e.target.value })

        }
    };

    function urlSafe(value: String) {
        return value == undefined ? '' : value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    return (
        <>
            {!isEdit && <Group gap={'sm'}>
                <AppInput label='Code' id='code' required value={values.code} onChange={onChange} errors={errors} readOnly={auto} description='*Auto option will generate code base on name input'></AppInput>
                <Switch onLabel="auto" offLabel="manual" size="lg" mt={45} checked={auto} onChange={(value: any) => setAuto(value.target.checked)} />
            </Group>}
            {!!isEdit && <Group gap={'sm'}>
                <AppInput label='Code' id='code' required value={values.code} readOnly={true} description='*Cannot be edited'></AppInput>
            </Group>}
            <AppInput label='Name' required id='name' value={values.name} errors={errors ? errors : null} onChange={onChange} disabled={!!values.id} />
        </>
    )
}
