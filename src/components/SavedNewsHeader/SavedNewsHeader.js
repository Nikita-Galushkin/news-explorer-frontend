import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader({ cards }) {
  return (
    <section className="saved-news-header">
      <h1 className="saved-news__title">Сохраненные статьи</h1>
      <p className="saved-news__quantity">Грета, у вас {cards.length} сохранённых статей</p>
      <p className="saved-news__keyword">
        По ключевым словам:
        <span className="saved-news__keyword-bold"></span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;