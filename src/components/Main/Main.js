import React from 'react';
import './Main.css';
import SearhForm from '../SearchForm/SearchForm';

function Main({ handleSearch }) {

  return (
    <div className="main">
      <h1 className="main__title">Что творится в мире?</h1>
      <p className="main__description">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <SearhForm 
        handleSearch={handleSearch}
      />
    </div>
  );
}

export default Main;