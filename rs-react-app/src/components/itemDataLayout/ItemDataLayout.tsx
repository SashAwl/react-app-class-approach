import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
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
import { Pagination } from '../Pagination/Pagination';

export const ItemDataLayout = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    fetchCharacters(
      query,
      currentPage,
      (characters, totalPages) => {
        setCharacters(characters);
        setLoading(false);
        setTotalPages(totalPages);
        setError(null);
      },
      (message) => {
        console.log(message);
        setError('No characters found for your query');
        setLoading(false);
      }
    );
  }, [query, currentPage]);

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
    if (query || currentPage > 1) {
      fetchData();
    }
  }, [query, fetchData, currentPage]);

  useEffect(() => {
    navigate('/characters?page=1');
  }, [query]);

  useEffect(() => {
    const pageFromQuery = searchParams.get('page') || '1';
    setCurrentPage(+pageFromQuery);
  }, [searchParams]);

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

  const handleClickPagination = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const page = event.currentTarget?.value;
    setCurrentPage(+page);
    navigate(`/characters?page=${page}`);
  };

  return (
    <>
      <Search
        inputValue={inputValue}
        onChange={handleChangeInput}
        onSearch={handleClickSearch}
      />
      {!error && <h2>Your results</h2>}
      {loading && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {!error && (
        <div className="flex">
          <div className="w-1/2">
            {!loading && !error && characters.length > 0 && (
              <ItemDataList characters={characters} />
            )}
          </div>
          <div className="w-1/2 border-l pl-4">
            <div className="sticky top-1/2 -translate-y-1/2">
              {!loading && !error && <Outlet />}
            </div>
          </div>
        </div>
      )}
      {!loading && !error && (
        <Pagination
          totalPages={totalPages}
          handlePagination={handleClickPagination}
        />
      )}
    </>
  );
};
