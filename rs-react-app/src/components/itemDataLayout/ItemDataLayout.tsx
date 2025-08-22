import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useGetCharactersQuery } from '../../store/apiSlice';
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
import { selectedItemsCount } from '../../store/store';
import { Flyout } from '../Flyout/Flyout';

export const ItemDataLayout = () => {
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const selectedItemsQuantity = useSelector(selectedItemsCount);
  const [searchParams] = useSearchParams();
  const { data, error, isLoading } = useGetCharactersQuery({
    queryTerm: query,
    page: currentPage,
  });

  type errorMessage = FetchBaseQueryError & {
    data: {
      error: string;
    };
    status: string;
  };

  const navigate = useNavigate();

  useEffect(() => {
    initialLocalStorage();

    const term = getTermFromLocalStorage();
    if (term) {
      setInputValue(term);
      setQuery(term);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setTotalPages(data.info.pages);
    }
  }, [data]);

  useEffect(() => {
    if (isSearchTriggered) {
      navigate('/characters?page=1');

      setIsSearchTriggered(false);
    }
  }, [query, navigate, isSearchTriggered]);

  useEffect(() => {
    const pageFromQuery = searchParams.get('page') || '1';
    setCurrentPage(Number(pageFromQuery));
  }, [searchParams]);

  const handleClickSearch = () => {
    const queryValue = inputValue.trim();
    setQuery(queryValue);
    setTermToLocalStorage(queryValue);

    setIsSearchTriggered(true);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target?.value;
    setInputValue(inputValue);
  };

  const handleClickPagination = (page: number) => {
    setCurrentPage(page);
    navigate(`/characters?page=${page}`);
  };

  return (
    <div className="flex flex-col items-center">
      <Search
        inputValue={inputValue}
        onChange={handleChangeInput}
        onSearch={handleClickSearch}
      />
      {!error && (
        <h2 className="m-8 font-bold text-xl mask-radial-from-neutral-200 tracking-wider">
          Your results
        </h2>
      )}
      {isLoading && <Spinner />}
      {error && (
        <ErrorMessage
          error={
            (error && 'data' in error && (error as errorMessage).data.error) ||
            null
          }
        />
      )}
      {!error && (
        <div className="flex mb-8">
          <div className="w-1/2">
            {!isLoading &&
              !error &&
              data?.results &&
              data?.results.length > 0 && (
                <ItemDataList characters={data?.results} />
              )}
          </div>
          <div className="w-1/2 border-l pl-4">
            <div className="sticky top-0.5 -translate-y-0.5">
              {!isLoading && !error && <Outlet />}
            </div>
          </div>
        </div>
      )}
      {selectedItemsQuantity > 0 && (
        <Flyout itemsCount={selectedItemsQuantity} />
      )}
      {!isLoading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePagination={handleClickPagination}
        />
      )}
    </div>
  );
};
