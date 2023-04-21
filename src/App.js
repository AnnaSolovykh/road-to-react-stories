import React, { useEffect, useState } from "react";
import List from "./List";
import InputWithLabel from "./InputWithLabel";


function App() {

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

  const useSemiPersistentState = (key, initialState) => {
    const [value,  setValue] = 
    useState(
      localStorage.getItem(key) || initialState
      )

      useEffect(()=> {
        localStorage.setItem(key, value)
      }, 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [value]);

      return [value,  setValue];
  };

  
  const [searchTerm,  setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = (event) => {
      console.log(event.target.value);
      setSearchTerm(event.target.value);
    }

  const searchStories = stories.filter( (story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel 
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr></hr>
      <List list={searchStories} title="React Ecosystem" />
    </div>
  )
  ;
}

export default App;
