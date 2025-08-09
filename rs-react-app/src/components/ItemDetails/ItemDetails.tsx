import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchCharacterItem } from '../../utils/apiUtils';
import type { Character } from '../../types/characterTypes';
import { Spinner } from '../Spinner/Spinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const ItemDetails = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoadingItem, setIsLoadingItem] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const fetchDataCharacter = useCallback(async (id: number) => {
    setIsLoadingItem(true);
    fetchCharacterItem(
      id,
      (character) => {
        setCharacter(character);
        setIsLoadingItem(false);
        setError(null);
      },
      (message) => {
        console.log(message);
        setError('No characters found for your query');
        setIsLoadingItem(false);
      }
    );
  }, []);

  useEffect(() => {
    if (itemId) {
      fetchDataCharacter(Number(itemId));
    }
  }, [fetchDataCharacter, itemId]);

  const handleClickClose = () => {
    navigate(`/characters?page=${currentPage}`);
  };

  return (
    <div className="relative">
      {isLoadingItem && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {!isLoadingItem && !error && (
        <div className="flex flex-col justify-center">
          <h3 className="m-4 font-medium text-lg mask-radial-from-neutral-200 tracking-wider">
            {character?.name || 'No name for this character'}{' '}
          </h3>
          <img
            src={
              character?.image ||
              'https://avatars.mds.yandex.net/i?id=e57de7764a82904075159743c7824dbfdd83fdc2-8407394-images-thumbs&ref=rim&n=33&w=200&h=200'
            }
            alt="photo"
          />
          <button
            className="absolute right-1 top-0 hover:cursor-pointer hover:bg-red-500 px-3 py-1 bg-gray-300 rounded-md"
            onClick={() => handleClickClose()}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};
