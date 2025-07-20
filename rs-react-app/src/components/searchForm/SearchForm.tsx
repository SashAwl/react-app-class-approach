import React from 'react';

interface SearchProps {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export class Search extends React.Component<SearchProps> {
  render() {
    const { inputValue, onChange, onSearch } = this.props;
    return (
      <section>
        <input
          type="search"
          placeholder="Input search term ..."
          onChange={onChange}
          value={inputValue}
        />
        <button onClick={onSearch} className="search__submit">
          Search
        </button>
      </section>
    );
  }
}
