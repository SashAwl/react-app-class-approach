import './App.css';
import { ItemData } from './components/ItemData';
import type { Character } from './types';
import {
  getRequestURL,
  initialLocalStorage,
  setTermToLocalStorage,
  getTermFromLocalStorage,
} from './utilize';
import React from 'react';

interface State {
  characters: Character[];
  loading: boolean;
  error: string | null;
  query: string;
  inputValue: string;
  throwError: boolean;
}

class App extends React.Component<object, State> {
  state = {
    characters: [],
    loading: true,
    error: null,
    query: '',
    inputValue: '',
    throwError: false,
  };

  fetchData = async () => {
    try {
      const response = await fetch(getRequestURL(this.state.query));
      const dataJSON = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No characters found for your query');
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      this.setState({ characters: dataJSON.results, loading: false });
      this.setState(() => ({
        error: null,
      }));
    } catch (error) {
      console.log(error);
      this.setState(() => ({
        error: 'No characters found for your query',
        loading: false,
      }));
    }
  };

  componentDidMount(): void {
    initialLocalStorage();

    const term = getTermFromLocalStorage();
    if (term) {
      this.setState({ inputValue: term, query: term }, () => this.fetchData());
    } else {
      this.fetchData();
    }
  }

  handleClickSearch = () => {
    const queryValue = this.state.inputValue.trim();
    this.setState({ query: queryValue, loading: true }, () => this.fetchData());
    setTermToLocalStorage(queryValue);
  };

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target?.value;
    this.setState({ inputValue: inputValue });
  };

  handleErrorClick = () => {
    this.setState({ throwError: true });
  };

  setTermToLS = () => {};

  render() {
    const { characters, loading, error } = this.state;

    if (this.state.throwError) {
      throw new Error('Тестовая ошибка');
    }

    return (
      <>
        <section>
          <input
            type="search"
            placeholder="Input search term ..."
            onChange={this.handleChangeInput}
            value={this.state.inputValue}
          />
          <button onClick={this.handleClickSearch} className="search__submit">
            Search
          </button>
        </section>

        {loading && (
          <div className="flex flex-col justify-center items-center min-h-[200px] space-y-4">
            <div className="w-16 h-16 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-600 font-semibold text-lg">Loading...</p>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <section>
            <h2>Your results</h2>
            <div className="flex flex-col items-center">
              {characters.map((item: Character) => (
                <ItemData item={item} key={item.id} />
              ))}
            </div>
          </section>
        )}
        <button onClick={this.handleErrorClick}>Throw error</button>
      </>
    );
  }
}

export default App;
