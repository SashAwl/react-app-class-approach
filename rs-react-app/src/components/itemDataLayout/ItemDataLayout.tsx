import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { Character } from '../../types/characterTypes';
import { fetchCharacters } from '../../utils/apiUtils';
import {
  getTermFromLocalStorage,
  initialLocalStorage,
  setTermToLocalStorage,
} from '../../utils/localStorageUtils';
import { ItemDataList } from '../ItemDataList/ItemDataList';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Search } from '../SearchForm/SearchForm';
import { Spinner } from '../Spinner/Spinner';

export const ItemDataLayout = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

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

  return (
    <>
      <Search
        inputValue={inputValue}
        onChange={handleChangeInput}
        onSearch={handleClickSearch}
      />
      {loading && <Spinner />}
      {error && <ErrorMessage error={error} />}
      <h2>Your results</h2>
      <div className="flex">
        <div className="w-1/2">
          {!loading && !error && characters.length > 0 && (
            <ItemDataList characters={characters} />
          )}
        </div>
        <div className="w-1/2 border-l pl-4">
          {!loading && !error && <Outlet />}
        </div>
      </div>
    </>
  );
};
