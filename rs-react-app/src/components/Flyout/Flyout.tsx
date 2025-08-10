import { useDispatch } from 'react-redux';
import { clearSelectedList } from '../../store/store';

interface FlyoutProps {
  itemsCount: number;
}

export const Flyout = ({ itemsCount }: FlyoutProps) => {
  const dispatch = useDispatch();

  const handleUnselectClick = () => {
    dispatch(clearSelectedList());
  };

  const handleDownloadClick = () => {};

  return (
    <div className="self-start">
      <p className="font-bold  bg-gray-100 py-2 mb-4 text-start pl-4">
        Selected items: {itemsCount}
      </p>
      <div>
        <button
          onClick={handleUnselectClick}
          className="bg-amber-100 px-4 py-1 rounded-lg hover:cursor-pointer hover:scale-105"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownloadClick}
          className="bg-amber-100 px-4 py-1 rounded-lg ml-4 hover:cursor-pointer hover:scale-105"
        >
          DownLoad
        </button>
      </div>
    </div>
  );
};
