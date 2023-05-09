import React, { useCallback, useEffect, useReducer, useState } from "react";
import List from "./List";
import InputWithLabel from "./InputWithLabel";
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

  const handleFetchStories = useCallback(() => {
    if (!searchTerm) return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' })

    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then(response => response.json())
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() => 
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, [searchTerm]);

  useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories]);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
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
