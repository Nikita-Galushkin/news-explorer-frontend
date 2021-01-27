import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNews from '../SavedNews/SavedNews';
import Preloader from '../Preloader/Preloader';
import ResultNotFound from '../ResultNotFound/ResultNotFound';
import arrCard from '../../utils/arrCard';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SuccessRegister from '../SuccessRegister/SuccessRegister';

function App() {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isSuccessRegisterOpen, setIsSuccessRegisterOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleAuthorizationOpen() {
    setIsSuccessRegisterOpen(false);
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }

  function handleRegisterOpen() {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  }

  function handleRegister() {
    setIsRegisterOpen(false);
    setIsSuccessRegisterOpen(true);
  }

  function handleLogin() {
    setLoggedIn(true);
    setIsLoginOpen(false);
  }

  function logOut() {
    setLoggedIn(false);
  }

  function closeAllPopup(e) {
    if (e.target === e.currentTarget || e.key === 'Escape') {
      setIsLoginOpen(false);
      setIsSuccessRegisterOpen(false);
      setIsRegisterOpen(false);
    }
  }
  return (
    <div className="page" onKeyDown={closeAllPopup}>
      <Switch>
        <Route exact path="/">
          <Header
            onAuthorizeClick={handleAuthorizationOpen}
            headerClassName={'header header__main'}
            loggedIn={loggedIn}
            logOut={logOut}
            onClose={closeAllPopup}
          />
          <Main />
          <Preloader />
          <ResultNotFound />
          <NewsCardList />
          <About />
        </Route>
        <Route path="/saved-news">
          <Header
            headerClassName={'header header__saved-news'}
            loggedIn={loggedIn}
            logOut={logOut}
            onClose={closeAllPopup}
          />
          <SavedNews cards={arrCard} />
        </Route>
      </Switch>
      <Login
        isOpen={isLoginOpen}
        onClose={closeAllPopup}
        onLogin={handleLogin}
        changeModal={handleRegisterOpen}
      />
      <Register
        isOpen={isRegisterOpen}
        onClose={closeAllPopup}
        onRegister={handleRegister}
        changeModal={handleAuthorizationOpen}
      />
      <SuccessRegister
        isOpen={isSuccessRegisterOpen}
        onClose={closeAllPopup}
        changeModal={handleAuthorizationOpen}
      />
      <Footer />
    </div>
  );
}

export default App;