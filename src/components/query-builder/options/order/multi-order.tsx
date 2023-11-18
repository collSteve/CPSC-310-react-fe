import { Box, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import { MultiOrder } from "../../options";
import { ALL_ORDER_DIRS, OrderDir, Room_MFields, Room_SFields, Section_MFields, Section_SFields } from "../../../../shared/query/query-consts";
import RemovableItem from "../removable-item";
import { useContext } from "react";
import { DataSetContext } from "../../../../contexts/dataset-type-context";
import { DataSetType } from "../../../../shared/dataset-consts";

export interface MultiOrderProps {
    orderValue: MultiOrder,
    onChange: (orderValue: MultiOrder) => void;
}

export default function MultiOrderComponent({ orderValue, onChange }: MultiOrderProps) {
    const datasetContext = useContext(DataSetContext);
    let validOrders: string[] = [];

    if (datasetContext.type == DataSetType.Sections) {
        validOrders = [...Section_MFields, ...Section_SFields];
    } else if (datasetContext.type == DataSetType.Rooms) {
        validOrders = [...Room_MFields, ...Room_SFields];
    }



    return (<Box display="flex" flexDirection="column">
        <InputGroup display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" gap="5px">
            {/* <FormLabel>Order Value</FormLabel> */}
            <InputLeftAddon children="Order Direction" />
            <Select placeholder='choose direction'
                width="fit-content"
                value={orderValue.dir}
                onChange={(event) => {
                    console.log(event.target.value);
                    const newOrderValue = { ...orderValue, dir: event.target.value as OrderDir };
                    onChange(newOrderValue);
                }}>
                {ALL_ORDER_DIRS.map((dir) => {
                    return (<option key={dir} value={dir}>{dir}</option>);
                })}
            </Select>
        </InputGroup>
        <h3 style={{ alignSelf: "start" }}>Order Keys:</h3>
        <Box w="90%" display="flex" flexDirection="row" justifyContent="start" flexWrap="wrap" boxShadow="base" marginTop="5px">
            {orderValue.keys.map((orderkey, index) => {
                return (<RemovableItem key={orderkey} item={orderkey} onClickRemove={() => {
                    const newOrderValue = [...orderValue.keys];
                    newOrderValue.splice(index, 1);
                    onChange({ ...orderValue, keys: newOrderValue });
                }} />)
            })}
        </Box>

        <InputGroup display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" gap="5px">
            {/* <FormLabel>Order Value</FormLabel> */}
            <InputLeftAddon children="Order Key Value" />
            <Select placeholder='order key'
                width="fit-content"
                value={validOrders[0]}
                onChange={(event) => {
                    const newOrderValue = [...orderValue.keys, event.target.value as string];
                    onChange({ ...orderValue, keys: [...new Set(newOrderValue)] });
                }}>
                {validOrders.map((validOrder) => {
                    const trueOrder = `${datasetContext.datasetPrefix}_${validOrder}`;
                    return (<option key={validOrder} value={trueOrder}>{trueOrder}</option>);
                })}
            </Select>
        </InputGroup>
    </Box>)
}