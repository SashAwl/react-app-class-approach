import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Character } from '../../types/characterTypes';
import { useEffect } from 'react';
import { toggleSelect, type RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

interface ItemProps {
  item: Character;
}

export const ItemData = ({ item }: ItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selectedItems);

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

  const handleChange = (id: number) => {
    dispatch(toggleSelect(id));
  };

  function isSelected(id: number, list: number[]) {
    return list.includes(id);
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <h3
        className="text-right  hover:cursor-pointer"
        onClick={handlerClickItem}
      >
        <input
          type="checkbox"
          name="check"
          id={'nameItem' + item.id}
          checked={isSelected(item.id, selected)}
          onChange={() => handleChange(item.id)}
        />
        <label htmlFor={'nameItem' + item.id}>
          {' '}
          {item.name || 'No name for this character'}
        </label>
      </h3>
      <div className="text-left">
        <p>Gender: {item.gender || 'No gender for this character'}</p>
        <p>Status: {item.status || 'No status for this character'}</p>
        <p>Species: {item.species || 'No species for this character'}</p>
      </div>
    </div>
  );
};
