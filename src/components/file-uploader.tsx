import React, { useState } from 'react';
import { Button, Text, Box } from '@chakra-ui/react';

const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file;
        if (event.target.files) {
            file = event.target.files[0];
            setSelectedFile(file);
            console.log(`Selected file is ${file.name}`)
        } else {
            console.log("No file selected");
        }
    };

    // from GPT
    return (
        <Box>
            <input type="file" id="file-uploader" onChange={handleFileChange} style={{ display: 'none' }} />
            <Button as="label" htmlFor="file-uploader">
                Select a file
            </Button>
            {selectedFile && <Text>Selected file: {selectedFile.name}</Text>}
        </Box>
    );
};

export default FileUploader;
