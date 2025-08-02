import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Character } from '../../types/characterTypes';

interface ItemProps {
  item: Character;
}

export const ItemData = ({ item }: ItemProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  if (!item) {
    throw new Error('Missing item prop');
  }

  const handlerClickItem = () => {
    navigate(`/characters/${item.id}?page=${currentPage}`);
  };
  return (
    <div className="grid grid-cols-2 gap-4" style={{ gap: '40px' }}>
      <h3
        className="text-right  hover:cursor-pointer"
        onClick={handlerClickItem}
      >
        {item.name}
      </h3>
      <div className="text-left">
        <p>Gender: {item.gender}</p>
        <p>Status: {item.status}</p>
        <p>Species: {item.species}</p>
      </div>
    </div>
  );
};
