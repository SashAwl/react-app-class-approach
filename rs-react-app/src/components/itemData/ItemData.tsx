import { useNavigate } from 'react-router-dom';
import type { Character } from '../../types';

interface ItemProps {
  item: Character;
}

export const ItemData = ({ item }: ItemProps) => {
  if (!item) {
    throw new Error('Missing item prop');
  }

  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-4" style={{ gap: '40px' }}>
      <h3
        className="text-right  hover:cursor-pointer"
        onClick={() => navigate(`/${item.id}`)}
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
