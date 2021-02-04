import React from 'react';
import './ResultNotFound.css';

function ResultNotFound() {

  return (
    <section className="result-not-found">
      <div className="result-not-found__image"></div>
      <h1 className="result-not-found__title">Ничего не найдено</h1>
      <p className="result-not-found__description">
        К сожалению по вашему запросу ничего не найдено.
      </p>
    </section>
  );
}

export default ResultNotFound;