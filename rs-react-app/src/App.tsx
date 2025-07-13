import './App.css';
import { ItemData } from './components/ItemData';
import type { Character } from './types';
import { getRequestURL } from './utilize';
import React from 'react';

interface State {
  characters: Character[];
  loading: boolean;
  error: string | null;
  query: string;
  inputValue: string;
}

class App extends React.Component<{}, State> {
  state = {
    characters: [],
    loading: true,
    error: null,
    query: '',
    inputValue: '',
  };

  fetchData = async () => {
    try {
      const response = await fetch(getRequestURL(this.state.query));
      const dataJSON = await response.json();

      if (!response.ok) {
        throw new Error('Not found');
      }
      this.setState({ characters: dataJSON.results, loading: false });
      this.setState(() => ({
        error: null,
      }));
    } catch (error) {
      this.setState(() => ({
        error: 'No characters found for your query',
        loading: false,
      }));
    }
  };

  componentDidMount(): void {
    this.fetchData();
  }

  handleClickSearch = () => {
    const queryValue = this.state.inputValue.trim();
    this.setState({ query: queryValue, loading: true }, () => this.fetchData());
  };

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target?.value;
    this.setState({ inputValue: inputValue });
  };

  render() {
    const { characters, loading, error } = this.state;
    return (
      <>
        <section>
          <input
            type="search"
            placeholder="Input search term ..."
            onChange={this.handleChangeInput}
          />
          <button onClick={this.handleClickSearch} className="search__submit">
            Search
          </button>
        </section>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <section>
            <h2>Your results</h2>
            <div className="flex flex-col items-center">
              {characters.map((item: Character) => (
                <ItemData item={item} />
              ))}
            </div>
          </section>
        )}
        <button className="error-button">Error button</button>
      </>
    );
  }
}

export default App;
