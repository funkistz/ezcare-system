import { Head, usePage, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guestlayout from '@/Components/layout/GuestLayout';
import { Carousel } from '@mantine/carousel';
import { Image, Box, Text, Title, Stack, Container, SimpleGrid, Button, Paper, ThemeIcon, Group, Divider, ScrollArea, Flex, Card, BackgroundImage, Center, rem } from '@mantine/core';
import { EzBenefitsCarousel, EzComment, EzCommentsCarousel, WAFloatingButton, EzFeature1, EzGetQuotation, EzCoverage } from '@/features/app-blog';
import { EzHeroTitle } from '@/features/app-blog/componenst/EzHeroTitle';
// import classes from './EcwMobileServices.module.css';
import { ContactIconsList } from './ContactIcons';
import { IconArrowRight, IconBrandWhatsapp, IconCar, IconCheck, IconColorSwatch, IconFileCertificate, IconInfoCircle, IconPresentationAnalytics, IconSignRight, IconUsersGroup } from '@tabler/icons-react';
import { EzEcwCarousel } from '@/features/app-blog/componenst/EzEcwCarousel';
import { EzYoutubeCard } from '@/features/app-blog/componenst/EzYoutubeCard';
import classes from './Career.module.css';


export default function Privacy() {

    const { careers }: any = usePage<PageProps>().props;

    console.log(careers)

    const ItemWrapper = ({ label }: any) => {

        return <Group>
            <ThemeIcon color='lime' size='sm'>
                <IconCheck color='white' />
            </ThemeIcon>
            <Text fz='md'>{label}</Text>
        </Group>

    }

    const SectionTitle = ({ label, label2, size = 1, align = 'center' }: any) => {
        return (<Stack mb={40} justify={'center'}>
            <Text fw={900} fz={{ base: 30 * size, sm: 30 * size, lg: 35 * size }} variant="gradient" gradient={{ from: 'violet.7', to: 'orange.5' }} ta={align} lh={1.2}>
                {label}
            </Text>
            {label2 && <Text fw={900} fz={{ base: 30 * size, sm: 30 * size, lg: 35 * size }} variant="gradient" gradient={{ from: 'violet.7', to: 'orange.5' }} ta='center' lh={0.8}>
                {label2}
            </Text>}
        </Stack>)
    }

    const Vacancy = (data: any) => {

        const result = data.data;

        return <Paper withBorder radius="md" className={classes.card}>
            <SectionTitle label={result.name} align={'left'} />
            {/* <Text size="xl" fw={500} mt="md">
                {result.description}
            </Text> */}
            {/* <Text size="sm" mt="sm">
               {result.description}
            </Text> */}
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {result.description}
            </div>
        </Paper>
    }

    return (
        <>
            <Head title='Ezcare' />

            <EzHeroTitle title={'Privacy Policy'}
            // description={'Door to door services covering area in Klang Valley & Johor Bahru.'} 
            />

            <Container size={'xl'} mt={40}>

                <Paper bg={'red.0'} p={'lg'} radius={'lg'} mb={20}>
                    <Container size="xl" py={0} px={20}>
                        <Box py="xl">
                            <SectionTitle label={'PRIVACY NOTICE'} />
                            <Text fw={'normal'} mb={20} fz={'lg'} ta='start' px={15}>
                                In line with the Personal Data Protection Act 2010 (“PDPA”), we are required to inform you that the personal data (“PERSONAL DATA”) you have provided to us or that is subsequently obtained by us from time to time, may be processed for the purpose of processing your warranty proposal, provision of warranty related products or services or any addition, alteration, variation cancellation and renewal and promotion of products.
                            </Text>
                            <Text fw={'normal'} mb={20} fz={'lg'} ta='start' px={15}>
                                The Personal Data is obtained when you fill up documents; liaise with us or any of our representative, agents and dealers; or give it to us or our representative, agents and dealers in person, over the telephone conversation, through online medium including our website, Facebook page or any other social media pages or from third parties you have consented to.
                                Your Personal Data may be disclosed to our related company, repairers or any other service providers including intermediary or motor claims/investigation/assessor. In such instances, it will be done in the manner compliance with the PDPA.
                            </Text>
                            <Text fw={'normal'} mb={20} fz={'lg'} ta='start' px={15}>
                                We may also disclose your Personal Data where such disclosure is required under the law, court orders or pursuant to guidelines issued by regulatory or other relevant authorities, if we reasonably believe that we have a lawful right to disclose your Personal Data or that we have your consent for such disclosure if you had known the same.
                            </Text>
                            <Text fw={'normal'} mb={20} fz={'lg'} ta='start' px={15}>
                                Where you have given us personal data that is of another individual (”OTHER PARTY”), you must ensure that you have informed the Other Party that you are providing the Other Party’s personal data to us, and have gotten the Other Party’s consent to do so. You must explain what is stated here to the Other Party, and ensure he/she understands, agrees and authorises us to deal with his/her personal data according to what is stated herein.
                            </Text>
                            <Text fw={'normal'} mb={50} fz={'lg'} ta='start' px={15}>
                                You may make enquiries, request for access to for correction, complaints or to limit usage or processing of your Personal Data at any time by informing us of such request. By continuously dealing with us, you hereby understand, agree and consent to the above-stated terms with respect to the processing of your Personal Data.
                            </Text>

                            <SectionTitle label={'WHAT INFORMATION DOES EZCARE WARRANTY GATHER?'} />

                            <Text fw={'normal'} mb={20} fz={'lg'} ta='start' px={15}>
                                Information You Give Us. We may collect and retain any information provided by you or gathered from your devices in connection with your online activity. For example, we collect information you give us when you:

                                <ul>
                                    <li>use our service or download materials from our Site;</li>
                                    <li>request a quote for warranty plan, enroll for warranty plan, submit claims or check the status of a claim, or engage in other transactions with us;</li>
                                    <li>request a quote for warranty plan, enroll for warranty plan, submit claims or check the status of a claim, or engage in other transactions with us;</li>
                                    <li>communicate with us, such as to provide feedback, complete an online survey, request support or service, register for event, apply for a job, or ask for additional information;</li>
                                    <li>register for or manage an account with us; or</li>
                                    <li>subscribe to newsletters, email lists or other content we provide.</li>
                                </ul>
                                We may collect information such as your first and last name, home or other physical address, email address, zip code, telephone number, other information that permits you to be contacted physically or online, or information about your interactions with us or others, and other information. You may choose not to provide certain information to us but doing so may restrict your ability to use our warranty plan or conduct certain business with Ezcare Warranty.
                            </Text>

                            <Text fw={'normal'} mb={20} fz={'lg'} ta='start' px={15}>
                                Device and Web Browsing Information. We may collect information from your devices and about your web browsing when you visit our Site. We may collect information such as:

                                <ul>
                                    <li>use our service or download materials from our Site;</li>
                                    <li>your IP address;</li>
                                    <li>the type of browser, devices and operating systems you use;</li>
                                    <li>identifiers associated with the device(s) you use to access our Site;</li>
                                    <li>the pages you visit and the features you use, including dates and times;</li>
                                    <li>if you navigated from or navigate to another website, the address of that website; and</li>
                                    <li>information regarding your internet service provider.</li>
                                </ul>
                            </Text>


                            <Text fw={'normal'} mb={20} fz={'lg'} ta='start' px={15}>
                                In addition, we may collect information about your activities on our Site through the use of cookies, clear GIFs or web beacons, local shared objects or Flash cookies, or through other identifiers or technologies, including similar technologies as they may evolve over time. We refer to these technologies collectively as Data Technologies.
                            </Text>

                            <Text fw={'normal'} mb={20} fz={'lg'} ta='start' px={15}>
                                Email. We may collect information regarding the effectiveness of our email and other communications with you. For example, we may know if you follow a link in an email we send to you.
                            </Text>

                            <Text fw={'normal'} mb={50} fz={'lg'} ta='start' px={15}>
                                Information from Other Sources. We may obtain information about you from other third parties. This information may include information about your use of this Site or our services, your use of other websites, your interests and preferences and other information about you or your household. We may combine the information we obtain from third parties with information that we have collected about you.
                            </Text>

                            <SectionTitle label={'HOW DOES EZCARE WARRANTY USE INFORMATION ABOUT ME?'} />
                            <Text fw={'normal'} mb={50} fz={'lg'} ta='center' px={15}>
                                We and others acting on our behalf may use the information that we gather to operate our businesses. For example, we may:
                                Operate and Support our Site and Services. We use the information that we gather in order to operate our Site and our services. For example, we may use the information that we collect or receive to provide support and assistance that you request or to diagnose or address technical problems in the operation of our Site or any of our services. If you establish an account with us, we may use information about you to manage or support your account.
                                Improve and Evolve our Services. We constantly evaluate and improve our Sites and services, including developing new products or services and using the information we gather to do so.
                                Advertise and Promote Products and Services. We may use the information we gather to offer, provide, or personalise products and services from us. For example, we may customise content, advertising, promotions and incentives to reflect your preferences, interests, or prior interactions with us and others.
                                Make Other Contacts. We may contact you through telephone, text, or chat for other purposes, as permitted by law.
                                This Notice only addresses our own information practices. This Notice does not apply to information you share with third parties even if we link to those third parties from a Site. These third parties may have their own privacy policies governing their use of information that you can access from their websites.
                                Please note that other parties may collect personally identifiable information about your online activities over time and across different websites when you use our Site.
                            </Text>
                            <SectionTitle label={'WHEN DOES EZCARE WARRANTY SHARE INFORMATION?'} />
                            <Text fw={'normal'} mb={50} fz={'lg'} ta='start' px={15}>
                                We may share the information we gather, including as follows:
                                Service Providers. We may share information with third party service providers and others who help us operate our business or provide services on our behalf. These service providers include credit bureaus, those who may help us verify identities and backgrounds, those who help us handle your account or provide customer service, and analytics companies, advertising networks and others that provide Data Technologies on our Sites.
                                Corporate Affiliates and Other Ventures. We may share information with our corporate affiliates for their everyday business purposes, to provide services or to perform marketing. We may also participate in joint ventures with others and we may share information as part of that joint venture.
                                Regulators. We may share information with regulators, including as necessary to comply with regulatory oversight of our businesses.
                                Promotional. We may share information with third parties who help us develop and promote products and services, including joint marketing, or to help us customise advertisements, offers, or other communications to you.
                                Business Transfer. We may share information we have collected from you in connection with the sale or merger of our business or the transfer of assets.
                                Protection of Ourselves and Others. We may use and share the information we gather to protect our own and others’ rights and property, including protection of our affiliates, customers and members of the public. We may use and share the information we gather to comply with applicable law, legal process, legal advice and for preventing fraud, theft, and injury to you, us or others.
                            </Text>
                            <SectionTitle label={'SAFEGUARDING YOUR PERSONALLY IDENTIFIABLE INFORMATION'} />
                            <Text fw={'normal'} mb={50} fz={'lg'} ta='start' px={15}>
                                We will take reasonable care to maintain appropriate safeguards to ensure the security, integrity and privacy of the information you have provided us with. In addition, we will take reasonable steps to ensure that third party business partners’ to whom we transfer any data will provide sufficient protection of that personal information.
                            </Text>
                            <SectionTitle label={'HOW DOES EZCARE WARRANTY PROVIDE UPDATES TO THIS NOTICE?'} />
                            <Text fw={'normal'} mb={50} fz={'lg'} ta='start' px={15}>
                                When we make material changes to this Notice, we will update this web page and change the Effective Date.
                            </Text>
                            <SectionTitle label={'HOW CAN EZCARE WARRANTY BE CONTACTED REGARDING PRIVACY ISSUES?'} />
                            <Text fw={'normal'} mb={50} fz={'lg'} ta='start' px={15}>
                                You can contact us with questions or comments about our privacy practices or this Notice by contacting us at:<br />
                                NO 1A & 3A,<br />
                                JALAN 8/1,SEKSYEN 8,<br />
                                43650 BANDAR BARU BANGI, SELANGOR<br />
                                info@ezcare-warranty.com<br />

                            </Text>

                        </Box>
                    </Container>
                </Paper>
            </Container>

            <WAFloatingButton />
        </>
    );
}

Privacy.layout = (page: any) => <Guestlayout children={page} />;
