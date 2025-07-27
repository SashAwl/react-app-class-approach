import type { Character } from '../../types';
import { ItemData } from '../itemData/ItemData';

interface ListProps {
  characters: Character[];
}

export const ItemDataList = ({ characters }: ListProps) => {
  return (
    <section>
      <div className="flex flex-col items-center">
        {characters.map((item: Character) => (
          <ItemData item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};
