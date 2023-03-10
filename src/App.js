import React from "react";

const list = [
  {
    title: "React",
    url: "http://www.reactjs.org/",
    objectID: 0,
  },

  {
    title: "Redux",
    url: "http://wwww.redux.js.org/",
    objectID: 1,
  },

]
function App() {

  //1 
  const listItems = list.map( item => (
    <li key={item.objectID}>{item.title}</li>
  )) 

  //3 
  function listItem (item) {
    return <li key={item.objectID}>{item.title}</li>
  }
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <hr/>
{/* {1} */}
      <ul>
        {listItems}
      </ul>

{/* {2} */}
      <ul>
        {list.map (listitem => (
          <li key={listitem.objectID}>
            <span>
              <a href={listitem.url}>{listitem.title}</a>
            </span>            
          </li>
        ))}
      </ul>

{/* {3} */}
      <ul>
        {list.map(listItem)}
      </ul>

    </div>
  );
}

export default App;
