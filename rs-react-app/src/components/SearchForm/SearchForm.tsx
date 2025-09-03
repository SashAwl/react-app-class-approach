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
        className="border-1 rounded-lg p-2"
      />
      <button
        onClick={onSearch}
        className="bg-amber-100 px-4 py-2 rounded-lg ml-4 hover:cursor-pointer hover:bg-amber-200 hover:scale-105 active:scale-94"
      >
        Search
      </button>
    </section>
  );
};
