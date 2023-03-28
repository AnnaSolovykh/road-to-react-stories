import React from "react";
import List from "./List";
import Search from "./Seach";


function App() {
  
      const handleSearch = (event) => {
        console.log(event.target.value)
      }

  const stories = [
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
  ];

  const jsLibraries = [
    {
      title: "jQuery",
      url: "http://www.jQuery.org/",
      objectID: 0,
    },
  
    {
      title: "Angular",
      url: "http://wwww.angularjs.org/",
      objectID: 1,
    },
  ];

  
  return (//we are passing different sets of values tp render different content
    <div>
      <List list={stories} title="React Ecosystem"/>
      <List list={jsLibraries} title="Javascript Libraries"/>
      <Search onSearch={handleSearch}/>
    </div>
  )
  ;
}

export default App;
