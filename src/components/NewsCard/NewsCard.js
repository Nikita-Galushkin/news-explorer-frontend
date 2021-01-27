import React from 'react';
import './NewsCard.css';
import { Route, Switch } from 'react-router-dom';

function NewsCard({ img, title, text, link, source, date, keyword }) {
  const [spanClassName, setSpanClassName] = React.useState('card__span');

  const handleMouseEnter = (e) => {
    setSpanClassName('card__span card__span-active');
  };

  const handleMouseLeave = (e) => {
    setSpanClassName('card__span');
  };

  const onHandleClick = (e) => {
    e.target.classList.remove('card__button_type_save');
    e.target.classList.add('card__button_type_save-active');
  };

  return (
    <li className="card">
      <img src={img} alt={title} className="card__image"></img>
      <a href={link} target="blank" className="card__source">
        {source}
      </a>
      <Switch>
        <Route exact path="/">
          <span className={spanClassName}>Войдите, чтобы сохранять статьи</span>
          <button className="card__button card__button_type_save" type="submit" onClick={onHandleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></button>
        </Route>
        <Route path="/saved-news">
          <p className="card__keyword">{keyword}</p>
          <span className={spanClassName}>Убрать из сохраненных</span>
          <button className="card__button card__button-delete" type="submit" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></button>
        </Route>
      </Switch>
      <div className="card__info">
        <p className="card__news-date">{date}</p>
        <h2 className="card__title">{title}</h2>
        <p className="card__text">{text}</p>
      </div>
    </li>
  );
}

export default NewsCard;
