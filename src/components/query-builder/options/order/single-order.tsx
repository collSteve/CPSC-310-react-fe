import { Box, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import { useContext } from "react";
import { DataSetContext } from "../../../../contexts/dataset-type-context";
import { Room_MFields, Room_SFields, Section_MFields, Section_SFields } from "../../../../shared/query/query-consts";
import { DataSetType } from "../../../../shared/dataset-consts";

export interface SingleOrderProps {
    orderValue: string;
    onChange: (orderValue: string) => void;
}
export default function SingleOrderComponent({ orderValue, onChange }: SingleOrderProps) {
    const datasetContext = useContext(DataSetContext);
    let validOrders: string[] = [];

    if (datasetContext.type == DataSetType.Sections) {
        validOrders = [...Section_MFields, ...Section_SFields];
    } else if (datasetContext.type == DataSetType.Rooms) {
        validOrders = [...Room_MFields, ...Room_SFields];
    }

    return (<Box>
        <InputGroup display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" gap="5px">
            {/* <FormLabel>Order Value</FormLabel> */}
            <InputLeftAddon children="Order Value" />
            <Select placeholder='query type'
                width="fit-content"
                value={orderValue}
                onChange={(event) => {
                    onChange(event.target.value as string);
                }}>
                {validOrders.map((validOrder) => {
                    const trueOrder = `${datasetContext.datasetPrefix}_${validOrder}`;
                    return (<option key={validOrder} value={trueOrder}>{trueOrder}</option>);
                })}
            </Select>
        </InputGroup>
    </Box>)
}