import { Link } from 'react-router-dom';
import { ThrowErrorButton } from '../ThrowErrorButton/ThrowErrorButton';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [isThrowError, setIsThrowError] = useState(false);

  useEffect(() => {
    if (isThrowError) {
      throw new Error('Testing error');
    }
  }, [isThrowError]);

  const handleErrorClick = () => {
    setIsThrowError(true);
  };
  return (
    <div
      className="w-full justify-center flex gap-4 mb-8"
      style={{ gap: '20px', marginBottom: '30px' }}
    >
      <button>
        <Link to="/characters?page=1" className="no-underline text-black">
          Home
        </Link>
      </button>
      <button>
        <Link to="/about" className="no-underline text-black">
          About
        </Link>
      </button>
      <ThrowErrorButton handleThrowError={handleErrorClick} />
    </div>
  );
};
