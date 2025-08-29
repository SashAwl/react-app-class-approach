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
    <div className="flex items-center fixed left-4 bottom-8 z-3 bg-gradient-to-r from-gray-100/95 via-gray-100/95 via-80% to-gray-100/40  w-3/4 text-xs">
      <p className="font-bold py-2 mr-8 text-start pl-4">
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
