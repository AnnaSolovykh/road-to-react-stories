
const List = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
            <ul>
                { props.list.map (listitem => (
                    <Item key={listitem.objectID} item={listitem}/>
                )
                )}
            </ul>
        </div>
    );
}


export default List;
 
  export const Item = ({item}) => {
    return (
        <li key={item.objectID}>
        <span>
            <a href={item.url}>{item.title}</a>
        </span>            
        </li>
    )
}
