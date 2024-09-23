import { TextInput, NumberInput } from '@mantine/core';

function AppInput(options: any) {

    const mt = options.noMargin ? 0 : 8;

    return (
        <>
            {options.type != 'number' &&
                <TextInput
                    mt={mt}
                    placeholder={options.placeholder ? options.placeholder : options.label}
                    radius={'sm'}
                    {...options}
                    value={options.values ? options.values[options.id] : (options.value ? options.value : '')}
                    error={options.errors ? options.errors[options.id] : (options.error ? options.error : '')}
                />
            }
            {options.type == 'number' &&
                <NumberInput
                    mt={mt}
                    radius={'sm'}
                    placeholder={options.placeholder ? options.placeholder : options.label}

                    {...options}
                    value={options.values ? options.values[options.id] : (options.value ? options.value : '')}
                    error={options.errors ? options.errors[options.id] : (options.error ? options.error : '')}
                />
            }
        </>
    );
}

export default AppInput;