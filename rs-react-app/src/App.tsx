import './App.css';
import { getRequestURL } from './utilize';
import React from 'react';

interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;
}

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
        <section className="search">
          <input
            type="search"
            className="search__input"
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
          <section className="w-sm">
            <h2>Your results</h2>
            <div className="flex flex-col items-center">
              {characters.map((item: Character) => (
                <div
                  className="grid grid-cols-2 gap-4"
                  style={{ gap: '40px' }}
                  key={item.id}
                >
                  <h3 className="text-right">{item.name}</h3>
                  <div className="text-left">
                    <p className="descrip-gender">Gender: {item.gender}</p>
                    <p className="descrip-status">Status: {item.status}</p>
                    <p className="descrip-gender">Species: {item.species}</p>
                  </div>
                </div>
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
