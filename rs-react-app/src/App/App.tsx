import './App.css';
import { Footer } from '../components/Footer-tmp/Footer';
import { Header } from '../components/Header-tmp/Header';
import { Main } from '../components/Main-tmp/Main';
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
  }, [navigate]);
  return (
    <div className="bg-olive-gradient">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
