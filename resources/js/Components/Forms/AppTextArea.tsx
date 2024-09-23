import { Textarea } from '@mantine/core';

function AppInput(options: any) {

    return (
        <>
            <Textarea
                placeholder={options.placeholder ? options.placeholder : options.label}
                cols={3}
                mt={8}
                radius={'sm'}
                {...options}
                value={options.values ? options.values[options.id] : options.value}
                error={options.errors ? options.errors[options.id] : options.error}
            />
        </>
    );
}

export default AppInput;