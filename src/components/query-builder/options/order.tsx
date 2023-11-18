import { Box, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { MultiOrder, OrderObj, OrderType } from "../options";
import { OrderDir } from "../../../shared/query/query-consts";
import SingleOrderComponent from "./order/single-order";
import MultiOrderComponent from "./order/multi-order";

export interface OrderProps {
    onChange: (order: OrderObj) => void;
    order: OrderObj;
}

// export const defaultSingleOrder: OrderObj = {type: OrderType.Single, order: ""};
// export const defaultMultiOrder: OrderObj = {type: OrderType.Multiple, order: { dir: OrderDir.DOWN, keys: [] }};

export default function OrderComponent({order, onChange}: OrderProps) {

    let orderContent = null;
    if (order.type === OrderType.Single) {
        const orderValue = order.order as string;
        orderContent = (<SingleOrderComponent orderValue={orderValue} onChange={(orderValue)=>{
            onChange({...order, order: orderValue});
        }}/>)
    } else if (order.type === OrderType.Multiple) {
        const orderValue = order.order as MultiOrder;
        orderContent = (<MultiOrderComponent orderValue={orderValue} onChange={(orderValue)=>{
            onChange({...order, order: orderValue});
        }}/>)
    }

    return (<Box display="flex" flexDirection="column">
        <h2 style={{ alignSelf: "start" }}>Order</h2>
        <RadioGroup onChange={(value)=>{
            if (value === OrderType.None) {
                onChange({type: OrderType.None, order: null});
            }
            else if (value === OrderType.Single) {
                onChange({type: OrderType.Single, order: ""});
            } 
            else if (value === OrderType.Multiple) {
                onChange({type: OrderType.Multiple, order: { dir: OrderDir.DOWN, keys: [] }});
            }
        }} value={order.type}>
            <Stack direction='row'>
                <Radio value={OrderType.None}>No Order</Radio>
                <Radio value={OrderType.Single}>Single Order</Radio>
                <Radio value={OrderType.Multiple}>Multiple Orders</Radio>
            </Stack>
        </RadioGroup>
        {orderContent}
    </Box>);
}