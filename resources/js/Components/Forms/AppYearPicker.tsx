import { Input, MultiSelect } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';

function AppYearPicker(options: any) {

    return (
        <>
            <YearPickerInput
                clearable
                mt={8}
                radius={'sm'}
                placeholder={options.placeholder ? options.placeholder : 'Select Year'}

                value={options.values ? options.values[options.id] : (options.value ? options.value : '')}
                error={options.errors ? options.errors[options.id] : options.error}
                {...options}
            />
        </>
    );
}

export default AppYearPicker;
