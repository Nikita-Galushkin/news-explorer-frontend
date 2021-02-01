import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNews from '../SavedNews/SavedNews';
import Preloader from '../Preloader/Preloader';
import ResultNotFound from '../ResultNotFound/ResultNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SuccessRegister from '../SuccessRegister/SuccessRegister';
import * as api from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getNews } from '../../utils/NewsApi';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [articles, setArticles] = React.useState([]);
  const [saveArticles, setSaveArticles] = React.useState([]);
  
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isSuccessRegisterOpen, setIsSuccessRegisterOpen] = React.useState(false);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [showResultNotFound, setResultNotFound] = React.useState(false);
  const [showNewsCardList, setShowNewsCardList] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    };
    if (jwt) {
      api.getContent(jwt)
        .then((data) => {
          if (data){
            setCurrentUser(data);
          }
          if (JSON.parse(localStorage.getItem('allArticles')) !== null) {
            setSaveArticles(JSON.parse(localStorage.getItem('allArticles')));
          }
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);

  function handleAuthorizationOpen() {
    setIsSuccessRegisterOpen(false);
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }

  function handleRegisterOpen() {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  }

  function closeAllPopup(e) {
    if (e.target === e.currentTarget || e.key === 'Escape') {
      setIsLoginOpen(false);
      setIsSuccessRegisterOpen(false);
      setIsRegisterOpen(false);
    }
  }

  function handleRegister(email, password, name) {
    api.register(email, password, name)
      .then((data) => {
        if(data) {
          setCurrentUser(data);
        }
        setIsRegisterOpen(false);
        setIsSuccessRegisterOpen(true);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Такой пользователь уже существует');
      });
  }

  function handleLogin(email, password) {
    api.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setIsLoginOpen(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Что то пошло не так');
      });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  }

  function handleSearch(searchValue) {
    setResultNotFound(false);
    setShowNewsCardList(false);
    setShowPreloader(true);
    getNews(searchValue)
      .then((res) => {
        if (res.articles.length === 0) {
          setResultNotFound(true);
        } else {
          setResultNotFound(false);
          const data = res.articles;
          const savedLinks = saveArticles.map(({ link }) => link);
          const saved = data.map((card) => {
            const isSaved = savedLinks.includes(card.url);
            return isSaved;
          });
          for(let i = 0; i < data.length; i++) {
            data[i].isSaved = saved[i];
            data[i].keyword = searchValue;
          }
          setArticles(data);
          setShowNewsCardList(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setResultNotFound(true);
        setShowPreloader(false);
      })
      .finally(() => {
        setShowPreloader(false)
      });
  }

  function handleSaveArticle(article) {
    api.saveArticle(article)
      .then((art) => {
        let existingArticles = JSON.parse(localStorage.getItem('allArticles'));
        if(existingArticles == null) existingArticles = [];
        existingArticles.push(art);
        localStorage.setItem('allArticles', JSON.stringify(existingArticles));

        setSaveArticles([...saveArticles, art]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleDeleteArticle(article) {
    api.deleteArticle(article._id)
      .then(() => {
        const newArrArticles = saveArticles.filter(i => i._id !== article._id);
        setSaveArticles(newArrArticles);

        localStorage.setItem('allArticles', JSON.stringify(newArrArticles));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" onKeyDown={closeAllPopup}>
        <Switch>
          <Route exact path="/">
            <Header
              onAuthorizeClick={handleAuthorizationOpen}
              headerClassName={'header header__main'}
              loggedIn={loggedIn}
              handleLogout={handleLogout}
              onClose={closeAllPopup}
            />
            <Main 
              handleSearch={handleSearch}
            />
            { showPreloader && <Preloader /> }
            { showResultNotFound && <ResultNotFound /> }
            { showNewsCardList && 
              <NewsCardList 
                articles={articles}
                onSaveArticle={handleSaveArticle}
              />
            }
            <About />
          </Route>
          <ProtectedRoute path="/saved-news" loggedIn={loggedIn} >
            <Header
              headerClassName={'header header__saved-news'}
              loggedIn={loggedIn}
              handleLogout={handleLogout}
              onClose={closeAllPopup}
            />
            <SavedNews 
              saveArticles={saveArticles}
              onDeleteArticle={handleDeleteArticle}
            />
          </ProtectedRoute>
        </Switch>
        <Login
          onLogin={handleLogin}
          isOpen={isLoginOpen}
          onClose={closeAllPopup}
          changeModal={handleRegisterOpen}
          message={message}
        />
        <Register
          isOpen={isRegisterOpen}
          onClose={closeAllPopup}
          onRegister={handleRegister}
          changeModal={handleAuthorizationOpen}
          message={message}
        />
        <SuccessRegister
          isOpen={isSuccessRegisterOpen}
          onClose={closeAllPopup}
          changeModal={handleAuthorizationOpen}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;