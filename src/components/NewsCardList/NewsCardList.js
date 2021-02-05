import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import Button from '../Button/Button';
import { NUMBER_OF_CARDS } from '../../utils/constants';

function NewsCardList({ articles, saveArticles, onSaveArticle, setIsRegisterOpen, onDeleteArticle, cardsClassName }) {
  const [onClick, setOnClick] = React.useState(false);
  
  const handleClick = () => {
    setOnClick(true);
  };

  return (
    <section className={`cards ${cardsClassName}`}>
      <Switch>
        <Route exact path="/">
          <h1 className="cards__title">Результаты поиска</h1>
          <ul className="cards__list">
            { !onClick
              ? articles && articles.slice(0, NUMBER_OF_CARDS).map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  onSaveArticle={onSaveArticle}
                  setIsRegisterOpen={setIsRegisterOpen}
                />
              ))
              : articles && articles.map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  type='main'
                  onSaveArticle={onSaveArticle}
                  setIsRegisterOpen={setIsRegisterOpen}
                />
              ))}
          </ul>
          { !onClick 
          ? <Button onClick={handleClick} name="Показать ещё" className="button button__main" />
          : null}
        </Route>
        <Route path="/saved-news">
          <ul className="cards__list">
            {saveArticles && saveArticles.map((article) => (
              <NewsCard
                key={article._id}
                article={article}
                onDeleteArticle={onDeleteArticle}
              />
            ))}
          </ul>
        </Route>
      </Switch>
    </section>
  );
}

export default NewsCardList;
