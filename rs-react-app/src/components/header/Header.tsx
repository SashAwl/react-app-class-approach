import { Link } from 'react-router-dom';
import { ThrowErrorButton } from '../ThrowErrorButton/ThrowErrorButton';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [isThrowError, setIsThrowError] = useState(false);

  const styleButton =
    'no-underline text-black border-2 border-white hover:border-gray-200 px-4 py-2 rounded-xl active:scale-94';

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
        <Link to="/characters?page=1" className={styleButton}>
          Home
        </Link>
      </button>
      <button>
        <Link to="/about" className={styleButton}>
          About
        </Link>
      </button>
      <ThrowErrorButton
        handleThrowError={handleErrorClick}
        menuStyle={styleButton}
      />
    </div>
  );
};
