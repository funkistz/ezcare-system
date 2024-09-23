import React, { useState } from 'react'
import { AppDropzone } from '@/features';
import { router, usePage } from '@inertiajs/react';
import { Box, Divider, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { AppInspectionImport, FileListPreview } from '@/features/app-dropzone';
import FileForm from './FileForm';

export default function FileList({ policy }: { policy?: any }) {

    const [files, setFiles] = useState<any>([]);
    const { settings }: any = usePage().props;

    const [requiredFiles, setRequiredFiles] = useState(settings.policy_mandatory_documents ? settings.policy_mandatory_documents.value.split(',') : []);

    // policy_mandatory_documents
    // console.log('policy', policy)

    const onSuccess = (data: any, type: string) => {

        data.variant = type;

        router.put(route('policy.add_attachment', policy.id), data, {
            onSuccess: () => {
            },
        });
    }

    return (
        <>
            <Stack>
                <Text fw='bold'>Document List</Text>
                <Divider />
                <SimpleGrid cols={2}>
                    <Paper p='xs'>
                        <Stack gap={'xs'}>
                            <Text fz='md' fw='bolder'>{settings.ic_label ? settings.ic_label.value : 'KTP'}: {requiredFiles.includes("ic") && <span style={{ color: 'red' }}>(required)</span>}</Text>
                            <Stack my={2} gap={2}>
                                <AppInspectionImport policyNo={policy.policy_no} chassisNo={policy.vehicle.chassis_no} onSuccess={(data: any) => onSuccess(data, 'ic')} />
                                <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccess(data, 'ic')} />
                            </Stack>
                            {policy.ic_files && policy.ic_files.length > 0 && <Box p='md'>
                                <FileListPreview files={policy.ic_files} type='policy' />
                            </Box>}
                        </Stack>
                    </Paper>
                    <Paper p='xs'>
                        <Stack gap={'xs'}>
                            <Text fz='md' fw='bolder'>{settings.grant_label ? settings.grant_label.value : 'STNK'}: {requiredFiles.includes("grant") && <span style={{ color: 'red' }}>(required)</span>}</Text>
                            <Stack my={2} gap={2}>
                                <AppInspectionImport policyNo={policy.policy_no} chassisNo={policy.vehicle.chassis_no} onSuccess={(data: any) => onSuccess(data, 'grant')} />
                                <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccess(data, 'grant')} />
                            </Stack>
                            {policy.grant_files && policy.grant_files.length > 0 && <Box p='md'>
                                <FileListPreview files={policy.grant_files} type='policy' />
                            </Box>}
                        </Stack>
                    </Paper>
                    <Paper p='xs'>
                        <Stack gap={'xs'}>
                            <Text fz='md' fw='bolder'>Vehicle Photos: {requiredFiles.includes("vehicle") && <span style={{ color: 'red' }}>(required)</span>}</Text>
                            <Stack my={2} gap={2}>
                                <AppInspectionImport policyNo={policy.policy_no} chassisNo={policy.vehicle.chassis_no} onSuccess={(data: any) => onSuccess(data, 'vehicle')} />
                                <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccess(data, 'vehicle')} />
                            </Stack>
                            {policy.vehicle_files && policy.vehicle_files.length > 0 && <Box mt='md' p='md'>
                                <FileListPreview files={policy.vehicle_files} type='policy' />
                            </Box>}
                        </Stack>
                    </Paper>
                    <Paper p='xs'>
                        <Stack gap={'xs'}>
                            <Text fz='md' fw='bolder'>Chassis Number: {requiredFiles.includes("chassis") && <span style={{ color: 'red' }}>(required)</span>}</Text>
                            <Stack my={2} gap={2}>
                                <AppInspectionImport policyNo={policy.policy_no} chassisNo={policy.vehicle.chassis_no} onSuccess={(data: any) => onSuccess(data, 'chassis')} />
                                <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccess(data, 'chassis')} />
                            </Stack>
                            {policy.chassis_files && policy.chassis_files.length > 0 && <Box mt='md' p='md'>
                                <FileListPreview files={policy.chassis_files} type='policy' />
                            </Box>}
                        </Stack>
                    </Paper>
                    <Paper p='xs'>
                        <Stack gap={'xs'}>
                            <Text fz='md' fw='bolder'>{settings.odometer_label ? settings.odometer_label.value : 'Speedometer'} Photo: {requiredFiles.includes("speedometer") && <span style={{ color: 'red' }}>(required)</span>}</Text>
                            <Stack my={2} gap={2}>
                                <AppInspectionImport policyNo={policy.policy_no} chassisNo={policy.vehicle.chassis_no} onSuccess={(data: any) => onSuccess(data, 'speedometer')} />
                                <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccess(data, 'speedometer')} />
                            </Stack>
                            {policy.speedometer_files && policy.speedometer_files.length > 0 && <Box mt='md' p='md'>
                                <FileListPreview files={policy.speedometer_files} type='policy' />
                            </Box>}
                        </Stack>
                    </Paper>
                    <Paper p='xs'>
                        <Stack gap={'xs'}>
                            <Text fz='md' fw='bolder'>Service Reminder Sticker: {requiredFiles.includes("mileage") && <span style={{ color: 'red' }}>(required)</span>}</Text>
                            <Stack my={2} gap={2}>
                                <AppInspectionImport policyNo={policy.policy_no} chassisNo={policy.vehicle.chassis_no} onSuccess={(data: any) => onSuccess(data, 'mileage')} />
                                <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccess(data, 'mileage')} />
                            </Stack>
                            {policy.mileage_files && policy.mileage_files.length > 0 && <Box mt='md' p='md'>
                                <FileListPreview files={policy.mileage_files} type='policy' />
                            </Box>}
                        </Stack>
                    </Paper>
                    <Paper p='xs'>
                        <Stack gap={'xs'}>
                            <Text fz='md' fw='bolder'>Diagnose Report: {requiredFiles.includes("diagnose") && <span style={{ color: 'red' }}>(required)</span>}</Text>
                            <Stack my={2} gap={2}>
                                <AppInspectionImport policyNo={policy.policy_no} chassisNo={policy.vehicle.chassis_no} onSuccess={(data: any) => onSuccess(data, 'diagnose')} />
                                <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccess(data, 'diagnose')} />
                            </Stack>
                            {policy.diagnose_files && policy.diagnose_files.length > 0 && <Box mt='md' p='md'>
                                <FileListPreview files={policy.diagnose_files} type='policy' />
                            </Box>}
                        </Stack>
                    </Paper>
                    <Paper p='xs'>
                        <Stack gap={'xs'}>
                            <Text fz='md' fw='bolder'>Others:</Text>
                            <Stack my={2} gap={2}>
                                <AppInspectionImport policyNo={policy.policy_no} chassisNo={policy.vehicle.chassis_no} onSuccess={(data: any) => onSuccess(data, 'other')} />
                                <AppDropzone withIcon={false} onSuccess={(data: any) => onSuccess(data, 'other')} />
                            </Stack>
                            {policy.other_files && policy.other_files.length > 0 && <Box mt='md' p='md'>
                                <FileListPreview files={policy.other_files} type='policy' />
                            </Box>}
                        </Stack>
                    </Paper>
                </SimpleGrid>


            </Stack>

        </>
    )
}
