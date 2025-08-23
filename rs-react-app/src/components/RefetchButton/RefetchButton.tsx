import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

interface RefreshButtonProps {
  refresh: () => void;
}

export const RefetchButton = ({ refresh }: RefreshButtonProps) => {
  const handleClickRefresh = () => {
    refresh();
  };

  return (
    <FontAwesomeIcon
      icon={faArrowRotateRight}
      onClick={handleClickRefresh}
      className="hover:cursor-pointer hover:bg-green-200 hover:scale-105 px-2 py-2 bg-gray-300 rounded-md active:scale-94"
    />
  );
};
