import React, { useEffect, useState } from "react";
import List from "./List";
import InputWithLabel from "./InputWithLabel";

const initialStories = [
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

function App() {

  const getAsyncStories = () => 
    new Promise (resolve => 
      setTimeout(
        () => resolve({ data: { stories: initialStories} }),
        2000
      )
    );
  


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
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    getAsyncStories().then(result => {
      setStories(result.data.stories);
      setIsLoading(false);
    })
    .catch(()=> setIsError(true))
  }, []);
  
  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );
    setStories(newStories);
  };
//handleRemoveStory function filters out all the stories based on id 
// so any id that does not match the item that we are passing it will be filtered out.

  const handleSearch = (event) => {
      console.log(event.target.value);
      setSearchTerm(event.target.value);
    };

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
      {isError && <p>Something went wrong...</p>}
      {isLoading ? (
      <p>Loading...</p>
      ) : (
      <List list={searchStories} onRemoveItem={handleRemoveStory} title="React Ecosystem" />
      )}
      </div>
  )
  ;
}

export default App;
