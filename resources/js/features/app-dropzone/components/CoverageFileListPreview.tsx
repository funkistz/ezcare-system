import React from 'react';
import FilePreview from './FilePreview';
import { Flex, SimpleGrid } from '@mantine/core';
import CoverageFilePreview from './CoverageFilePreview';

export default function CoverageFileListPreview({ files, type = 'file' }: { files: any, type?: string }) {

    return (
        <>
            <Flex wrap='wrap' gap='xs'>
                {files.map((file: any, index: any) => {
                    return <CoverageFilePreview key={index} file={file} type={type} />;
                })}
            </Flex>
        </>
    )
}
