import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCharacterItem } from '../../utils/apiUtils';
import type { Character } from '../../types/characterTypes';
import { Spinner } from '../Spinner/Spinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const ItemDetails = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loadingItem, setLoadingItem] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();

  const fetchDataCharacter = useCallback(
    async (id: number) => {
      setLoadingItem(true);
      fetchCharacterItem(
        id,
        (character) => {
          setCharacter(character);
          setLoadingItem(false);
          setError(null);
        },
        (message) => {
          console.log(message);
          setError('No characters found for your query');
          setLoadingItem(false);
        }
      );
    },
    [itemId]
  );

  useEffect(() => {
    if (character) {
      console.log('character loaded:', character);
    }
  }, [character]);

  useEffect(() => {
    if (itemId) {
      fetchDataCharacter(+itemId);
    }
  }, [fetchDataCharacter, itemId]);

  return (
    <div className="relative">
      {loadingItem && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {!loadingItem && !error && <h3>{character?.name}</h3>}
      <img src={character?.image} alt="photo" />
      <button className="absolute right-1 top-" onClick={() => navigate(`/`)}>
        X
      </button>
    </div>
  );
};
