import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

function SavedNews({ cards }) {
  return (
    <>
      <SavedNewsHeader cards={cards} />
      <NewsCardList cardsClassName="cards_type_saved-news" />
    </>
  );
}

export default SavedNews;
