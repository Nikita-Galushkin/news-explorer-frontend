import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import arrCard from '../../utils/arrCard';
import Button from '../Button/Button';

function NewsCardList({ cardsClassName }) {
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
              ? arrCard.slice(0, 3).map((card) => (
                <NewsCard
                  key={card._id}
                  img={card.img}
                  title={card.title}
                  text={card.text}
                  link={card.link}
                  source={card.source}
                  date={card.date}
                  keyword={card.keyword}
                />
              ))
              : arrCard.map((card) => (
                <NewsCard
                  key={card._id}
                  img={card.img}
                  title={card.title}
                  text={card.text}
                  link={card.link}
                  source={card.source}
                  date={card.date}
                  keyword={card.keyword}
                />
              ))}
          </ul>
          <Button onClick={handleClick} name="Показать ещё" className="button button__main" />
        </Route>
        <Route path="/saved-news">
          <ul className="cards__list">
            { arrCard.map((card) => (
              <NewsCard
                key={card._id}
                img={card.img}
                title={card.title}
                text={card.text}
                link={card.link}
                source={card.source}
                date={card.date}
                keyword={card.keyword}
              />
            ))}
          </ul>
        </Route>
      </Switch>
    </section>
  );
}

export default NewsCardList;
