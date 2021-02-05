import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

function SavedNews({ saveArticles, onDeleteArticle }) {
  
  return (
    <>
      <SavedNewsHeader 
        saveArticles={saveArticles}
      />
      <NewsCardList
        saveArticles={saveArticles}
        onDeleteArticle={onDeleteArticle}
        cardsClassName={saveArticles.length === 0 ? 'cards_type_length' : ''} 
      />
    </>
  );
}

export default SavedNews;
