import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getPaginationRange } from '../../utils/paginationUtils';

interface PaginationProps {
  totalPages: number;
  handlePagination: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Pagination = ({
  totalPages,
  handlePagination,
}: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const [buttons, setButtons] = useState<(number | '...')[]>([]);
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page') || '1');

  useEffect(() => {
    setButtons(getPaginationRange(currentPage, totalPages));
  }, [currentPage, totalPages]);

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      navigate(`/characters?page=${currentPage - 1}`);
    }
  };

  const handlePaginationNext = () => {
    if (currentPage < totalPages) {
      navigate(`/characters?page=${currentPage + 1}`);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => handlePaginationPrev()}
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
            onClick={(e) => handlePagination(e)}
            className="hover:cursor-pointer disabled:cursor-default disabled:border-black disabled:bg-sky-500/100"
            disabled={currentPage === item}
          >
            {item}
          </button>
        );
      })}
      <button
        onClick={() => handlePaginationNext()}
        className="hover:cursor-pointer disabled:cursor-default pr-4"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
