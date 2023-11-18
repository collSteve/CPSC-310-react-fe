import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
export interface RemovableItemProps {
    onClickRemove: (item: string) => void;
    item: string;
}
export default function RemovableItem({onClickRemove, item}: RemovableItemProps) {
    return (<Tag
        borderRadius='full'
        variant='solid'
        colorScheme='green'
      >
        <TagLabel>{item}</TagLabel>
        <TagCloseButton onClick={()=>{onClickRemove(item);}} />
      </Tag>);
}