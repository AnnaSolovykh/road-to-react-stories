import styled from "styled-components";
import { Story, Stories } from "./App";


const StyledItem = styled.li`
    display: flex;
    align-items: center;
    padding-bottom: 5px;
`;

const StyledColumn = styled.span`
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    a {
        color: inherit;
    }
    `;

const StyledButton = styled.button`
    background: transparent;
    border: 1px solid #171212;
    padding: 5px;
    cursor: pointer;

    transition: all 0.1s ease-in;

    &:hover {
        background: #171212;
        fill: #ffffff;
        color: white;
    }
`;

const StyledButtonSmall = styled(StyledButton)`
    padding: 5px;
`;


export type ListProps = {
    list: Stories;
    onRemoveItem: (item: Story) => void;
    title: string;
};

export const List = ({ list, onRemoveItem }: ListProps) => (
    <ul>
        {list.map((item) => (
            <Item
            key={item.objectID}
            item={item}
            onRemoveItem={onRemoveItem}
            />
        ))}
    </ul>
    );

export default List;

export type ItemProps = {
    item: Story;
    onRemoveItem: (item: Story) => void;
};

export const Item = ({ item, onRemoveItem }: ItemProps) => (
    <StyledItem>
        <StyledColumn key={item.objectID}>
                <a href={item.url}>{item.title}</a>      
        </StyledColumn>
        <StyledColumn>
            <StyledButtonSmall type="button" onClick={()=> onRemoveItem(item)}>
                remove
            </StyledButtonSmall>
        </StyledColumn>
    </StyledItem>
    )

