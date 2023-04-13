import React, { useEffect } from "react";
import List from "./List";
import Search from "./Seach";
import { useState } from "react";


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

  // const jsLibraries = [
  //   {
  //     title: "jQuery",
  //     url: "http://www.jQuery.org/",
  //     objectID: 0,
  //   },
  
  //   {
  //     title: "Angular",
  //     url: "http://wwww.angularjs.org/",
  //     objectID: 1,
  //   },
  // ];



  const [searchTerm,  setSearchTerm] = 
    useState(localStorage.getItem('search') || 'React')
  //we are setting searchTerm to default value that comes either from 
  //local Storage,or, if it doesn't exist,fr om the default key term React
  
  useEffect(()=> {
    localStorage.setItem('search', searchTerm)
  }, [searchTerm]);
  //"search" is equal to event.target.value
  //the first argument is function, 
  //the second argument is an array. We want the function to be called if the array changes.
  //If the array is empty, the component renders once after the component renders for the first time.
  //if there is state there, it renders at the initial render and every time the state changes.
  //This is called the DEPENDANCY ARRAY
  //And whole effect is SIDE-EFFECT


  const handleSearch = (event) => {
      console.log(event.target.value);
      setSearchTerm(event.target.value);
    }

  // const searchStories = stories.filter(function (story) {
  //   return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  const searchStories = stories.filter( (story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} searchTerm={searchTerm}/>
      <hr></hr>
      <List list={searchStories} title="React Ecosystem" />
      {/* <List list={jsLibraries} title="Javascript Libraries"/> */}
    </div>
  )
  ;
}

export default App;
