import './App.css';
import { ItemDataList } from './components/itemDataList/ItemDataList';
import { Search } from './components/searchForm/SearchForm';
import { Spinner } from './components/spinner/Spinner';
import { ThrowErrorButton } from './components/throwErrorButton/ThrowErrorButton';
import type { Character } from './types';
import {
  initialLocalStorage,
  setTermToLocalStorage,
  getTermFromLocalStorage,
} from './utilize/utilizeLocalStorage';
import { fetchCharacters } from './utilize/utilizeAPI';
import { useCallback, useEffect, useState } from 'react';
import { ErrorMessage } from './components/errorMessage/ErrorMessage';

export const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Testing error');
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    fetchCharacters(
      query,
      (characters) => {
        setCharacters(characters);
        setLoading(false);
        setError(null);
      },
      (message) => {
        console.log(message);
        setError('No characters found for your query');
        setLoading(false);
      }
    );
  }, [query]);

  useEffect(() => {
    initialLocalStorage();

    const term = getTermFromLocalStorage();
    if (term) {
      setInputValue(term);
      setQuery(term);
    } else {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [query, fetchData]);

  const handleClickSearch = () => {
    const queryValue = inputValue.trim();
    setQuery(queryValue);
    setLoading(true);
    setTermToLocalStorage(queryValue);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target?.value;
    setInputValue(inputValue);
  };

  const handleErrorClick = () => {
    setThrowError(true);
  };

  return (
    <>
      <Search
        inputValue={inputValue}
        onChange={handleChangeInput}
        onSearch={handleClickSearch}
      />
      {loading && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {!loading && !error && <ItemDataList characters={characters} />}
      <ThrowErrorButton handleThrowError={handleErrorClick} />
    </>
  );
};
