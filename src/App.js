import React, { useCallback, useEffect, useReducer, useState } from "react";
import List from "./List";
import SearchForm from "./SearchForm";
import axios from "axios";
import styled from "styled-components";
import LastSearches from "./LastSearches";

const StyledContainer = styled.div`
  height: 100%;
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

const StyledButton = styled.button`
    background: transparent;
    border: 1px solid #171212;
    padding: 5px 15px;
    cursor: pointer;
    margin-left: 40px;

    transition: all 0.1s ease-in;

    &:hover {
        background: #171212;
        fill: #ffffff;
        color: white;
    }
`;

const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const getUrl = (searchTerm, page) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const extractSearchTerm = (url) =>
  url
    .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
    .replace(PARAM_SEARCH, '');

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
      data:
      action.payload.page === 0
        ? action.payload.list
        : state.data.concat(action.payload.list),
      page: action.payload.page,
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
    { data: [], page: 0, isLoading: false, isError: false }
  );

  const [urls, setUrls] = React.useState([getUrl(searchTerm, 0)]);

  const handleFetchStories = useCallback(async() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' })

  try {
    const lastUrl = urls[urls.length - 1];
    const result = await axios.get(lastUrl);
    dispatchStories({
      type: 'STORIES_FETCH_SUCCESS',
      payload: {
        list: result.data.hits,
        page: result.data.page,
      },
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
    handleSearch(searchTerm,0);
  }

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm, 0);
  };

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, stories.page + 1);
  };

  const handleSearch = (searchTerm, page) => {
    const url = getUrl(searchTerm, page);
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

      {stories.isError && <p>Something went wrong ...</p>}

      <List list={stories.data} onRemoveItem={handleRemoveStory} />

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <StyledButton type="button" onClick={handleMore}>
          More
        </StyledButton>
      )}
    </StyledContainer>
  )
  ;
}

export default App;