import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export interface ResultTableProps {
    data: { [key: string]: string | number }[];
}

export default function ResultTableComponent({ data }: ResultTableProps) {
    const headings = Object.keys(data[0]);
    return (<Box>
        <TableContainer>
            <Table variant='simple'>
                {/* <TableCaption>Query Data</TableCaption> */}
                <Thead bg="teal.100">
                    <Tr>
                        {headings.map((heading) => {
                            return <Th key={heading}>{heading}</Th>
                        })}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row, index) => {
                        return (<Tr key={index}>
                            {headings.map((heading) => {
                                return <Td key={heading}>{row[heading]}</Td>
                            })}
                        </Tr>)
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    </Box>)
}