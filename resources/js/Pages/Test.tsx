//  feature 1: name, card number, expire date can be input by form
//  featute 2: Show/Hide card number just keep 4 last digits another will replace by '*' 

import { Paper, Text, ThemeIcon, Input, Button, Group } from "@mantine/core";
import { MonthPickerInput } from '@mantine/dates';
import { useState } from "react";

function TestPage() {

    const [cardNumber, setCardNumber] = useState<any>();
    const [cardNumberHide, setCardNumberHide] = useState<any>();
    const [cardEpiredDate, setCardEpiredDate] = useState<any>();
    const [cardName, setCardName] = useState<any>('');

    const [showNumber, setShowNumber] = useState<any>(true);

    const onNumberChange = (value: any) => {

        const newValue = value.replace(/.(?=.{4,}$)/g, '*');

        // const start = value.slice(0, -4);
        // const end = value.slice(-4);
        // const newValue = start.replace(/./g, '*') + end;

        setCardNumber(value)
        setCardNumberHide(newValue)
    }

    const submitForm = (e: any) => {

        e.preventDefault();

        console.log('cardNumber', cardNumber);
        console.log('cardEpiredDate', cardEpiredDate);
        console.log('cardName', cardName);

    }

    return (<>
        <form onSubmit={submitForm}>
            <Paper shadow="xl" radius="lg" p={20} m={100} mb={20} w={400}>
                <Text mb={10} fz={20}>MasterCard</Text>
                <ThemeIcon>
                </ThemeIcon>

                <Text>{showNumber ? cardNumber : cardNumberHide}</Text>

                <Input.Wrapper
                    label='Valid thru'
                    size="xs"
                >
                    <MonthPickerInput
                        placeholder="Pick date"
                        variant="unstyled"
                        value={cardEpiredDate}
                        onChange={setCardEpiredDate}
                        mx="auto"
                        maw={400}
                    />
                </Input.Wrapper>

                <Input
                    variant="unstyled"
                    placeholder="Name on card"
                    size="md"
                    value={cardName}
                    onChange={(e) => setCardName(e.currentTarget.value)}
                />
            </Paper>
            <Paper shadow="xl" radius="lg" p={20} m={100} mb={20} w={400}>
                <Text mb={10} fz={20}>MasterCard</Text>
                <ThemeIcon>

                </ThemeIcon>

                <Input
                    variant="unstyled"
                    placeholder="Card Number"
                    size="lg"
                    value={cardNumber}
                    onChange={(e) => onNumberChange(e.currentTarget.value)}
                />

                <Input.Wrapper
                    label='Valid thru'
                    size="xs"
                >
                    <MonthPickerInput
                        placeholder="Pick date"
                        variant="unstyled"
                        value={cardEpiredDate}
                        onChange={setCardEpiredDate}
                        mx="auto"
                        maw={400}
                    />
                </Input.Wrapper>

                <Input
                    variant="unstyled"
                    placeholder="Name on card"
                    size="md"
                    value={cardName}
                    onChange={(e) => setCardName(e.currentTarget.value)}
                />
            </Paper>
            <Group ml={100} w={400} position="right">
                <Button type="submit">
                    Submit
                </Button>
                <Button type="submit" onClick={() => { setShowNumber(!showNumber) }}>
                    {showNumber ? 'Hide' : 'Show'}
                </Button>
            </Group>

        </form>

    </>);
}

export default TestPage;