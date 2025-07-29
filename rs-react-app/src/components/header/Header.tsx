import { Link } from 'react-router-dom';
import { ThrowErrorButton } from '../ThrowErrorButton/ThrowErrorButton';
import { useState } from 'react';

export const Header = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Testing error');
  }
  const handleErrorClick = () => {
    setThrowError(true);
  };
  return (
    <div
      className="w-full justify-center flex gap-x-4 mb-8"
      style={{ gap: '20px', marginBottom: '30px' }}
    >
      <button>
        <Link to="/" className="no-underline text-black mr-8">
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
