import React, { useState } from 'react';
import { Button, Input, VStack, Radio, RadioGroup, Alert, Text, Stack, Flex } from '@chakra-ui/react';
import {addDataset} from "../service/adddataset-api.ts";
import {ResponseStatus} from "../service/api-consts.ts";

function AddDatasetComponent() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [datasetName, setDatasetName] = useState('');
    const [toggleValue, setToggleValue] = useState('sections');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }

    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatasetName(event.target.value);
    };

    const handleSubmit = async () => {
        if (!datasetName) {
            setSuccess("");
            setError('Dataset name is required');
            return;
        }
        if (!selectedFile) {
            setSuccess("");
            setError('File is required');
            return;
        }
        const res = await addDataset(datasetName, await selectedFile.arrayBuffer(), toggleValue).then((res) => {
            if (res.type === ResponseStatus.Success) {
                console.log("add dataset success");
                return true;
            } else {
                console.log("add dataset failed: " + res.data);
                setSuccess("");
                setError(res.data);
                return false;
            }
        });
        if (!res) {
            return;
        }


        // Reset all fields
        setError('');
        setSuccess(`Dataset ${datasetName} submitted successfully!`);
        setSelectedFile(null);
        setDatasetName('');
        setToggleValue('sections');
    };

    return (
        <VStack spacing={3} border="4px solid" borderColor="gray.200" borderRadius="md" alignItems="stretch" >
            <Flex flexDirection="row" justifyContent="space-around">
                <Button as="label" htmlFor="file-upload">
                    Upload Dataset
                </Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </Flex>
            {selectedFile && <Text>Selected file: {selectedFile.name}</Text>}
            <Input type="file" id="file-upload" onChange={handleFileChange} style={{ display: 'none' }} />
            <Input placeholder="Dataset Name" value={datasetName} onChange={handleNameChange} />
            <RadioGroup onChange={setToggleValue} value={toggleValue}>
                <Stack direction="row" spacing={4} justifyContent="space-around">
                    <Radio value="sections">Sections</Radio>
                    <Radio value="rooms">Rooms</Radio>
                </Stack>
            </RadioGroup>
            {error && <Alert status="error">{error}</Alert>}
            {success && <Alert status="success">{success}</Alert>}
        </VStack>
    );
}

export default AddDatasetComponent;
