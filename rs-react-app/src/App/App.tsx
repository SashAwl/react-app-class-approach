import './App.css';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.redirect;
    if (redirect) {
      sessionStorage.removeItem('redirect');
      navigate(redirect);
    }
  }, []);
  return (
    <div className="bg-olive-gradient">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
