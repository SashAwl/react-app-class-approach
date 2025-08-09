import { useEffect, useState } from 'react';
import { getPaginationRange } from '../../utils/paginationUtils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  handlePagination,
}: PaginationProps) => {
  const [buttons, setButtons] = useState<(number | '...')[]>([]);

  useEffect(() => {
    const pageList = getPaginationRange(currentPage, totalPages);
    setButtons(pageList);
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={() => handlePagination(currentPage - 1)}
        className="hover:cursor-pointer disabled:cursor-default pr-4"
        disabled={currentPage === 1}
      >
        {' '}
        Prev{' '}
      </button>
      {buttons.map((item) => {
        if (item === '...') {
          return <span key={item + totalPages}>...</span>;
        }
        return (
          <button
            key={item}
            value={item}
            onClick={() => handlePagination(item)}
            className={`hover:cursor-pointer disabled:cursor-default disabled:opacity-25 disabled:bg-amber-200 px-3 py-1 rounded-2xl ${currentPage === item ? 'bg-amber-300' : ''}`}
            disabled={currentPage === item}
          >
            {item}
          </button>
        );
      })}
      <button
        onClick={() => handlePagination(currentPage + 1)}
        className="hover:cursor-pointer disabled:cursor-default pr-4"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
