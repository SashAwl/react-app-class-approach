import { useEffect, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useSearchParams,
  useParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetCharactersQuery } from '../../store/apiSlice';
import { type errorMessageType } from '../../types/errorMessageType';
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
import { RefetchButton } from '../RefetchButton/RefetchButton';

export const ItemDataLayout = () => {
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const selectedItemsQuantity = useSelector(selectedItemsCount);
  const [searchParams, setSearchParams] = useSearchParams();
  const { itemId } = useParams();

  const { data, error, isLoading, refetch } = useGetCharactersQuery({
    page: currentPage,
    search: query,
  });

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
      if (itemId) {
        navigate({
          pathname: '/characters',
          search: 'page=1' + `${query ? '&search=' + query : ''}`,
        });
      } else {
        setSearchParams({ page: '1', search: query });
      }
      setIsSearchTriggered(false);
    }
  }, [query, navigate, isSearchTriggered, itemId, setSearchParams]);

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
    if (itemId) {
      navigate({
        pathname: '/characters',
        search: `page=${page}` + `${query ? '&search=' + query : ''}`,
      });
    } else {
      setSearchParams({ page: String(page), search: query });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Search
        inputValue={inputValue}
        onChange={handleChangeInput}
        onSearch={handleClickSearch}
      />
      {!error && (
        <div className="flex gap-2 items-center">
          <h2 className="m-8 font-bold text-xl mask-radial-from-neutral-200 tracking-wider">
            Your results
          </h2>
          <RefetchButton refresh={refetch} />
        </div>
      )}
      {isLoading && <Spinner />}
      {error && (
        <ErrorMessage
          error={
            (error &&
              'data' in error &&
              (error as errorMessageType).data.error) ||
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
