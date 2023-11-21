import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export type ValidQueryResult = { [key: string]: string | number }[];

export interface ResultTableProps {
    data: ValidQueryResult;
}

export default function ResultTableComponent({ data }: ResultTableProps) {
    const headings = Object.keys(data[0]);
    return (<TableContainer overflowY="scroll" overflowX="scroll" maxHeight="100%">
        <Table variant='simple'>
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
    </TableContainer>);
}