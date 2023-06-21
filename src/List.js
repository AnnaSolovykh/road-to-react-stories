import React from "react";
import styled from "styled-components";
import { sortBy } from 'lodash';
import { ReactComponent as Check } from './check.svg';

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

const SORTS = {
    NONE: (list) => list,
    TITLE: (list) => sortBy(list, 'title'),
    AUTHOR: (list) => sortBy(list, 'author'),
    COMMENT: (list) => sortBy(list, 'num_comments').reverse(),
    POINT: (list) => sortBy(list, 'points').reverse(),
};

const List = React.memo(
    ({ list, onRemoveItem }) => {
    
    const [sort, setSort] = React.useState({
        sortKey: 'NONE',
        isReverse: false,
    });

    const handleSort = (sortKey) => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;

        setSort({ sortKey, isReverse });
    };

    const sortFunction = SORTS[sort.sortKey];
    const sortedList = sort.isReverse
        ? sortFunction(list).reverse()
        : sortFunction(list);

        return (
            <ul>
            <li style={{ display: 'flex' }}>
                <span style={{ width: '40%' }}>
                    <StyledButtonSmall type="button" onClick={() => handleSort('TITLE')}>
                    Title
                    </StyledButtonSmall>
                </span>
                <span style={{ width: '30%' }}>
                    <StyledButtonSmall type="button" onClick={() => handleSort('AUTHOR')}>
                    Author
                    </StyledButtonSmall>
                </span>
                <span style={{ width: '10%' }}>
                    <StyledButtonSmall type="button" onClick={() => handleSort('COMMENT')}>
                    Comments
                    </StyledButtonSmall>
                </span>
                <span style={{ width: '10%' }}>
                    <StyledButtonSmall type="button" onClick={() => handleSort('POINT')}>
                    Points
                    </StyledButtonSmall>
                </span>
                <span style={{ width: '10%' }}>Actions</span>
                </li>
        
                {sortedList.map((item) => (
                <Item
                    key={item.objectID}
                    item={item}
                    onRemoveItem={onRemoveItem}
                />
                ))}
            </ul>
        )
    }
)


export default List;

export const Item = ({ item, onRemoveItem }) => {

    return (
        <li style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}>
            <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>{item.author}</span>
        <span style={{ width: '10%' }}>{item.num_comments}</span>
        <span style={{ width: '10%' }}>{item.points}</span>
        <span style={{ width: '10%' }}>
            <StyledButtonSmall type="button" onClick={() => onRemoveItem(item)}>
                <Check height="18px" width="18px" />
            </StyledButtonSmall>
        </span>
        </li>
    )
}