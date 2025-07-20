import React from 'react';
import type { Character } from '../../types';

interface ItemProps {
  item: Character;
}

export class ItemData extends React.Component<ItemProps> {
  render() {
    const { item } = this.props;

    return (
      <div className="grid grid-cols-2 gap-4" style={{ gap: '40px' }}>
        <h3 className="text-right">{item.name}</h3>
        <div className="text-left">
          <p>Gender: {item.gender}</p>
          <p>Status: {item.status}</p>
          <p>Species: {item.species}</p>
        </div>
      </div>
    );
  }
}
