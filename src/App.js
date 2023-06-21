import React, { useCallback, useEffect, useReducer, useState } from "react";
import List from "./List";
import SearchForm from "./SearchForm";
import axios from "axios";
import styled from "styled-components";
import LastSearches from "./LastSearches";

const StyledContainer = styled.div`
  height: 130vh;
  padding: 20px;
  background: #83a4d4;
  background: linear-gradient(to left, #b6fbff, #83a4d4);
  color: #171212;

  @media only screen and (max-width:800px) {
    height: 200vh;
}
`;

const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const getUrl = (searchTerm) => `${API_ENDPOINT}${searchTerm}`;

const extractSearchTerm = (url) => url.replace(API_ENDPOINT, '');

const getLastSearches = (urls) =>
  urls
    .reduce((result, url, index) => {
      const searchTerm = extractSearchTerm(url);

      if (index === 0) {
        return result.concat(searchTerm);
      }

      const previousSearchTerm = result[result.length - 1];

      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
      }
    }, [])
    .slice(-6)
    .slice(0, -1);

const useSemiPersistentState = (key, initialState) => {
  const isMounted = React.useRef(false);

  const [value,  setValue] = 
  useState(
    localStorage.getItem(key) || initialState
    );
    useEffect(()=> {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        console.log('A');
        localStorage.setItem(key, value);
      }
    }, [value, key]);

    return [value,  setValue];
  };

const getSumComments = (stories) => {
  console.log('C');

  return stories.data.reduce(
    (result, value) => result + value.num_comments,
    0
  );
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

  const [urls, setUrls] = React.useState([getUrl(searchTerm)]);

  const handleFetchStories = useCallback(async() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' })

  try {
    const lastUrl = urls[urls.length - 1];
    const result = await axios.get(lastUrl);
    dispatchStories({
      type: 'STORIES_FETCH_SUCCESS',
      payload: result.data.hits, //if we use axios, we add data.
    });
    }
    catch{
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    }
  }, [urls]);

  useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories]);

  const handleRemoveStory = React.useCallback((item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, []);

  const handleSearchInput = event => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = event => {
    event.preventDefault();
    handleSearch(searchTerm);
  }

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    handleSearch(searchTerm);
  };

  const handleSearch = (searchTerm) => {
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
  };

  const lastSearches = getLastSearches(urls);

  const sumComments = React.useMemo(() => getSumComments(stories), [
    stories,
  ]);



  return (
    <StyledContainer>
      <StyledHeadlinePrimary>My Hacker Stories with {sumComments} comments</StyledHeadlinePrimary>
      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />
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
      </StyledContainer>
  )
  ;
}

export default App;