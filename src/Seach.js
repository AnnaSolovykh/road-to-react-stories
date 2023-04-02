function Search(props) {
    return (
    <div>
        <label htmlFor="search">Search: </label>
        <input 
            id="search" 
            type="text" 
            onChange={props.onSearch}
            value={props.search}
            />
        <p>
            Seaching for <strong>{props.searchTerm}</strong> 
        </p>
    </div>
    )
}

export default Search;