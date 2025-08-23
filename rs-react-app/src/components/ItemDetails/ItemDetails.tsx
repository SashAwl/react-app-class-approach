import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { type errorMessageType } from '../../types/errorMessageType';
import { useGetCharacterItemQuery } from '../../store/apiSlice';
import { Spinner } from '../Spinner/Spinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const ItemDetails = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetCharacterItemQuery({
    id: Number(itemId),
  });

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const handleClickClose = () => {
    navigate(`/characters?page=${currentPage}`);
  };

  return (
    <div className="relative">
      {isLoading && <Spinner />}
      {error && (
        <ErrorMessage
          error={
            (error &&
              'data' in error &&
              (error as errorMessageType).data.error) ||
            null
          }
        />
      )}
      {!isLoading && !error && (
        <div className="flex flex-col justify-center">
          <h3 className="m-4 font-medium text-lg mask-radial-from-neutral-200 tracking-wider">
            {data?.name || 'No name for this character'}{' '}
          </h3>
          <img
            src={
              data?.image ||
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
