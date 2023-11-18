import { OrderDir } from "../../shared/query/query-consts";
import { Divider, Flex } from "@chakra-ui/react";
import ColumnComponent from "./options/column";
import { OptionQuery } from "../query-builder";
import OrderComponent from "./options/order";

export enum OrderType {
    None = "NONE",
    Single = "SINGLE",
    Multiple = "MULTIPLE"
}
export type MultiOrder = { dir: OrderDir, keys: string[] }
export type OrderObj = { type: OrderType, order: string | MultiOrder | null };

export interface OptionProps {
    option: OptionQuery;
    onChange: (option: OptionQuery) => void;
}

export default function OptionComponent({ option, onChange }: OptionProps) {

    return (<Flex flexDirection="column">
        <ColumnComponent columnsList={option.COLUMNS} onChange={(columnsList) => {
            onChange({ ...option, COLUMNS: columnsList });
            // setColumnsList(columnsList);
        }} />
        <Divider marginTop="5px" marginBottom="5px" />
        <OrderComponent order={option.ORDER} onChange={(order)=>{
            onChange({...option, ORDER: order});
        }}/>
    </Flex>);
}