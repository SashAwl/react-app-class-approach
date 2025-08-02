interface SearchProps {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const Search = ({ inputValue, onChange, onSearch }: SearchProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };
  return (
    <section>
      <input
        type="search"
        placeholder="Input search term ..."
        onChange={onChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <button onClick={onSearch} className="search__submit">
        Search
      </button>
    </section>
  );
};
