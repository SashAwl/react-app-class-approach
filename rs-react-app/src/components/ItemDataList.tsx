import React from 'react';
import type { Character } from '../types';
import { ItemData } from './ItemData';

interface ListProps {
  characters: Character[];
}

export class ItemDataList extends React.Component<ListProps> {
  render() {
    const { characters } = this.props;
    return (
      <section>
        <h2>Your results</h2>
        <div className="flex flex-col items-center">
          {characters.map((item: Character) => (
            <ItemData item={item} key={item.id} />
          ))}
        </div>
      </section>
    );
  }
}
