import InputWithLabel from "./InputWithLabel";
import styled from 'styled-components';

const StyledSearchForm = styled.form`
    padding: 10px 0 20px 0;
    display: flex;
    align-items: baseline;


    @media only screen and (max-width:800px) {
        flex-direction: column;
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
        color: #ffffff;
    }

`;

const StyledButtonLarge = styled(StyledButton)`
    padding: 10px;
    margin-left: 0.3rem;
`;

type SearchFormProps = {
    searchTerm: string;
    onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm = ({
    searchTerm, 
    onSearchInput, 
    onSearchSubmit
}: SearchFormProps) => (
    <StyledSearchForm onSubmit={onSearchSubmit}>
        <InputWithLabel 
            id="search"
            value={searchTerm}
            onInputChange={onSearchInput}
        >
        <strong>Search:</strong>
        
        </InputWithLabel>
        <StyledButtonLarge
            type="submit"
            disabled={!searchTerm}
        >
        Submit
        </StyledButtonLarge>
    </StyledSearchForm>
)

export default SearchForm;