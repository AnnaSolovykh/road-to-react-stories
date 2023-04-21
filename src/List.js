const List = ({ list, onRemoveItem }) => 
    list.map(item => (
        <Item 
            key={item.objectID}
            item={item}
            onRemoveItem={onRemoveItem}
        />
    ));

export default List;

export const Item = ({ item, onRemoveItem }) => {
    return (
    <>
        <li key={item.objectID}>
            <span>
                <a href={item.url}>{item.title}</a>
            </span>            
        </li>
        <br></br>
        <button type="button" onClick={()=> onRemoveItem(item)}>remove</button>
    </>
    )

}
