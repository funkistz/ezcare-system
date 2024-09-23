import { Input, Switch } from '@mantine/core';

function AppSwitch({ id, label, placeholder, description, error, required = false, onChange, props, value, values, errors, checked }: any) {

    return (
        <Input.Wrapper
            id={id}
            withAsterisk={required}
            description={description}
            error={errors ? errors[id] : error}
            mt='sm'
        >
            <Switch
                id={id}
                label={label}
                placeholder={placeholder ? placeholder : label}
                value={values ? (values[id] ? values[id] : '') : (value ? value : '')}
                onChange={onChange}
                size="md"
                checked={checked}
            // mt='md'
            />
        </Input.Wrapper>
    );
}

export default AppSwitch;