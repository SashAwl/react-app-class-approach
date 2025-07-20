import './App.css';
import { ErrorMessage } from './components/errorMessage/ErrorMessage';
import { ItemDataList } from './components/itemDataList/ItemDataList';
import { Search } from './components/searchForm/SearchForm';
import { Spinner } from './components/spinner/Spinner';
import { ThrowErrorButton } from './components/throwErrorButton/ThrowErrorButton';
import type { Character } from './types';
import {
  initialLocalStorage,
  setTermToLocalStorage,
  getTermFromLocalStorage,
} from './utilize/utilizeLocalStorage';
import { fetchCharacters } from './utilize/utilizeAPI';
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
    this.setState({ loading: true });
    fetchCharacters(
      this.state.query,
      (characters) => {
        this.setState({ characters, loading: false, error: null });
      },
      (message) => {
        console.log(message);
        this.setState({
          error: 'No characters found for your query',
          loading: false,
        });
      }
    );
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

  render() {
    const { characters, loading, error, inputValue } = this.state;

    if (this.state.throwError) {
      throw new Error('Testing error');
    }

    return (
      <>
        <Search
          inputValue={inputValue}
          onChange={this.handleChangeInput}
          onSearch={this.handleClickSearch}
        />
        {loading && <Spinner />}
        {error && <ErrorMessage error={error} />}
        {!loading && !error && <ItemDataList characters={characters} />}
        <ThrowErrorButton handleThrowError={this.handleErrorClick} />
      </>
    );
  }
}

export default App;
