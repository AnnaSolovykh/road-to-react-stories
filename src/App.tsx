import React, { useCallback, useEffect, useReducer, useState } from "react";
import List from "./List";
import SearchForm from "./SearchForm";
import axios from "axios";
import styled  from "styled-components";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

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

const useSemiPersistentState = (
    key: string, 
    initialState: string
  ):[string, (newValue: string) => void] => {
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
  
export type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

export type Stories = Array<Story>;
type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};

interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT';
}

interface StoriesFetchSuccessAction {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Stories;
}

interface StoriesFetchFailureAction {
  type: 'STORIES_FETCH_FAILURE';
}

interface StoriesRemoveAction {
  type: 'REMOVE_STORY';
  payload: Story;
}

type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction;

const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
) => {
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

  const handleRemoveStory = React.useCallback((item: Story)  => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, []);

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`)
  }

  console.log('B:App');


  return (
    <StyledContainer>
      <StyledHeadlinePrimary>My Hacker Stories</StyledHeadlinePrimary>

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