import { useDispatch } from 'react-redux';
import { clearSelectedList } from '../../store/store';
import { useState } from 'react';

interface FlyoutProps {
  itemsCount: number;
}

export const Flyout = ({ itemsCount }: FlyoutProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  const handleUnselectClick = () => {
    dispatch(clearSelectedList());
  };

  const handleDownloadClick = () => {};

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  const handleWarningClick = () => {
    setIsVisible(true);
  };

  return (
    <div className="fixed left-4 bottom-8 z-3 w-full">
      {isVisible && (
        <div className="related flex items-center bg-gradient-to-r from-gray-100/95 via-gray-100/95 via-80% to-gray-50/40  w-full text-xs">
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
          <button
            onClick={handleCloseClick}
            className="absolute right-12 border-2 border-gray-200 px-2 py-0.5 bg-gray-100 rounded-lg active:scale-94 hover:scale-105 cursor-pointer"
          >
            x
          </button>
        </div>
      )}
      {!isVisible && (
        <p
          onClick={handleWarningClick}
          className="rounded-xl border-2 bg-gray-100 border-gray-200 px-2 py-0.5 w-fit active:scale-94 hover:scale-105 hover:bg-amber-50 cursor-pointer"
        >
          !
        </p>
      )}
    </div>
  );
};
