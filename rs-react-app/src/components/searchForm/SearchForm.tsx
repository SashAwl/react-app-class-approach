interface SearchProps {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const Search = ({ inputValue, onChange, onSearch }: SearchProps) => {
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
};
