import type { Character } from '../../types/characterType';
import { ItemData } from '../ItemData-tmp/ItemData';

interface ListProps {
  characters: Character[];
}

export const ItemDataList = ({ characters }: ListProps) => {
  return (
    <section>
      <div className="flex flex-col items-center gap-4">
        {characters.map((item: Character) => (
          <ItemData item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};
