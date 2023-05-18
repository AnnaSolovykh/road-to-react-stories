import React, { useCallback, useEffect, useReducer, useState } from "react";
import List from "./List";
import SearchForm from "./SearchForm";
import axios from "axios";
//npm install --save axios in terminal

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";


const useSemiPersistentState = (key, initialState) => {
const [value,  setValue] = 
useState(
  localStorage.getItem(key) || initialState
  );
  useEffect(()=> {
    localStorage.setItem(key, value)
  }, [value, key]);

  return [value,  setValue];
};

const storiesReducer = (state, action) => {
switch (action.type) {
  case 'STORIES_FETCH_INIT':
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  case 'STORIES_FETCH_SUCCESS':
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: action.payload,
    };
  case 'STORIES_FETCH_FAILURE':
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  case 'REMOVE_STORY':
    return {
      ...state,
      data: state.data.filter(
        story => action.payload.objectID !== story.objectID
      )
    };
  default: 
    throw new Error();
}
};

function App() {
  
  const [searchTerm,  setSearchTerm] = useSemiPersistentState('search', 'React');

  const [stories, dispatchStories] = useReducer(
    storiesReducer, 
    {data: [], isLoading: false, isError: false}
  );

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const handleFetchStories = useCallback(async() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' })

  try {
    const result = await axios.get(url); //axios in the place of fetch, also we don't need to convert to json any more
    dispatchStories({
      type: 'STORIES_FETCH_SUCCESS',
      payload: result.data.hits, //if we use axios, we add data.
    });
    }
    catch{
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories]);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = event => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = event => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`)
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      {stories.isError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
      <p>Loading...</p>
      ) : (
      <List 
        list={stories.data} 
        onRemoveItem={handleRemoveStory} 
        title="React Ecosystem" />
      )}
      </div>
  )
  ;
}

export default App;
