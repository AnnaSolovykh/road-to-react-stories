import styled from "styled-components";

const StyledButton = styled.button`
    background: transparent;
    border: 1px solid #171212;
    padding: 7px;
    cursor: pointer;
    margin-right: 20px;

    transition: all 0.1s ease-in;

    &:hover {
        background: #171212;
        fill: #ffffff;
        color: white;
    }
`;


const LastSearches = ({ lastSearches, onLastSearch }) => (
    <>
        {lastSearches.map((searchTerm, index) => (
            <StyledButton
            key={searchTerm + index}
            type="button"
            onClick={() => onLastSearch(searchTerm)}
            >
            {searchTerm}
            </StyledButton>
        ))}
    </>
);

export default LastSearches;