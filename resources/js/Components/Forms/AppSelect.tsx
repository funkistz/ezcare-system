import { Input, Select } from '@mantine/core';

function AppSelect(options: any) {

    return (
        <>
            <Select
                // searchable={true}
                mt={8}
                radius={'sm'}
                placeholder={options.placeholder ? options.placeholder : 'Please Select'}

                value={options.values ? options.values[options.id] : (options.value ? options.value : '')}
                error={options.errors ? options.errors[options.id] : options.error}
                {...options}
            />
        </>
    );
}


function AppSelectOld({ id, label, placeholder, description, error, required = false, onChange, props, value, data, values, errors, searchable }: any) {
    return (
        <Input.Wrapper
            id={id}
            withAsterisk={required}
            label={label}
            description={description}
            error={errors ? errors[id] : error}
            mt='sm'
        >
            <Select
                data={data ? data : []}
                id={id}
                placeholder={placeholder}
                searchable={searchable}
                value={values ? (values[id] ? values[id] : '') : (value ? value : '')}
                onChange={(e) => {
                    const target = {
                        id: id,
                        value: e,
                    }
                    return onChange({ target })
                }}
            />
        </Input.Wrapper>
    );
}

export default AppSelect;