
//1 
/*const List = () => {
    const listItems = props.list.map( item => (
        <li key={item.objectID}>{item.title}</li>
        )) 
        return (
            <ul>
        {listItems}
        </ul>
        )
}*/

//2
/*const List = (props) => {
    function listItem (item) {
        return <li key={item.objectID}>{item.title}</li>
        }
        return (
            <ul>
            { props.list.map(listItem)}
            </ul>
        )

}*/

//3
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
 
//export const Item = (props) => {
   // const item = props.item;
  //  const { item } = props;
  export const Item = ({item}) => {
    return (
        <li key={item.objectID}>
        <span>
            <a href={item.url}>{item.title}</a>
        </span>            
        </li>
    )
}
