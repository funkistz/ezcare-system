import React from 'react';
import FilePreview from './FilePreview';
import { Flex, SimpleGrid } from '@mantine/core';

export default function FileListPreview({ files, type = 'file' }: { files: any, type?: string }) {

    return (
        <>
            <Flex wrap='wrap' gap='xs'>
                {files.map((file: any, index: any) => {
                    return <FilePreview key={index} file={file} type={type} />;
                })}
            </Flex>
        </>
    )
}
