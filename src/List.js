import styled from "styled-components";
import React from "react";
import { ReactComponent as Check } from './check.svg';

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

    width: ${(props) => props.width};
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
    }
`;

const StyledButtonSmall = styled(StyledButton)`
    padding: 5px;
`;


const List = React.memo(
    ({ list, onRemoveItem }) =>
        console.log('B:List') || (
            <ul>
            {list.map((item) => (
                <Item
                key={item.objectID}
                item={item}
                onRemoveItem={onRemoveItem}
                />
            ))}
            </ul>
        )
    )

export default List;

export const Item = ({ item, onRemoveItem }) => {

    return (
    <StyledItem>
        <StyledColumn width="40%" key={item.objectID}>
                <a href={item.url}>{item.title}</a>      
        </StyledColumn>
        <StyledColumn width="20%">
            <StyledButtonSmall type="button" onClick={()=> onRemoveItem(item)}>
                <Check height="18px" width="18px" />
            </StyledButtonSmall>
        </StyledColumn>
    </StyledItem>
    )

}
