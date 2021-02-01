import React from 'react';
import './NewsCard.css';
import { Route, Switch } from 'react-router-dom';
import { getArticleDate } from '../../utils/utils';
import imageDefult from '../../images/image_01.jpg';

function NewsCard({ article, onSaveArticle, onDeleteArticle }) {
  const [spanClassName, setSpanClassName] = React.useState('card__span');
  const [toSaveArticle, setToSaveArticle] = React.useState({
    keyword: '',
    title: '',
    text: '',
    date: '',
    source: '',
    link: '',
    image: '',
    _id: '',
  });
  
  React.useEffect(() => {
    setToSaveArticle({
      keyword: article.keyword,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage,
      _id: article._id,
    })
  }, [article]);

  const handleMouseEnter = () => {
    if(!localStorage.getItem('jwt')) {
      setSpanClassName('card__span card__span-active');
    };
  };

  const handleMouseLeave = () => {
    setSpanClassName('card__span');
  };

  function handleSaveArticle(e) {
    if(localStorage.getItem('jwt')) {
      e.target.classList.remove('card__button_type_save');
      e.target.classList.add('card__button_type_save-active');  
      onSaveArticle(toSaveArticle);
    }
  };
  
  function handleDeleteArticle() {
    onDeleteArticle(toSaveArticle);
  };
  
  return (
    <li className="card">
      <img src={article.urlToImage || article.image || imageDefult} alt={article.title || 'фоновая картинка'} className="card__image"></img>
      <a href={article.url || article.link || ''} target="blank" className="card__source">
        {article.source.name || article.source || ''}
      </a>
      <Switch>
        <Route exact path="/">
          <span className={spanClassName}>Войдите, чтобы сохранять статьи</span>
          <button disabled={article.isSaved === true} className={article.isSaved === false ? "card__button card__button_type_save" : "card__button card__button_type_save-active"} type="submit" onClick={handleSaveArticle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ></button>
        </Route>
        <Route path="/saved-news">
          <p className="card__keyword">{article.keyword || ''}</p>
          <span className={spanClassName}>Убрать из сохраненных</span>
          <button className="card__button card__button-delete" type="submit" onClick={handleDeleteArticle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></button>
        </Route>
      </Switch>
      <div className="card__info">
        <p className="card__news-date">{getArticleDate(article.publishedAt || article.date || '')}</p>
        <h2 className="card__title">{article.title || ''}</h2>
        <p className="card__text">{article.description || article.text || ''}</p>
      </div>
    </li>
  );
}

export default NewsCard;
