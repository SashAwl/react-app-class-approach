import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Character } from '../../types/characterTypes';
import { useEffect } from 'react';

interface ItemProps {
  item: Character;
}

export const ItemData = ({ item }: ItemProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  useEffect(() => {
    if (!item) {
      throw new Error('Missing item prop');
    }
  }, [item]);

  const handlerClickItem = () => {
    navigate(`/characters/${item.id}?page=${currentPage}`);
  };
  return (
    <div className="grid grid-cols-2 gap-4" style={{ gap: '40px' }}>
      <h3
        className="text-right  hover:cursor-pointer"
        onClick={handlerClickItem}
      >
        {item.name || 'No name for this character'}
      </h3>
      <div className="text-left">
        <p>Gender: {item.gender || 'No gender for this character'}</p>
        <p>Status: {item.status || 'No status for this character'}</p>
        <p>Species: {item.species || 'No species for this character'}</p>
      </div>
    </div>
  );
};
