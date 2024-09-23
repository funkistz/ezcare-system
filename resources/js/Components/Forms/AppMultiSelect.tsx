import { Input, MultiSelect } from '@mantine/core';

function AppMultiSelect(options: any) {

    return (
        <>
            <MultiSelect
                searchable
                mt={8}
                radius={'sm'}
                {...options}
                error={options.errors ? options.errors[options.id] : options.error}
            />
        </>
    );
}

export default AppMultiSelect;
