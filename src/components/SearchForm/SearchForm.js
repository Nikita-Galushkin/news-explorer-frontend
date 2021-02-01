import React from 'react';
import './SearchForm.css';

function SearhForm({ handleSearch }) {
  const [searchValue, setSearchValue] = React.useState('');
  const setSearchValueHandler = (evt) => {
    setSearchValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(handleSearch) {
      handleSearch(searchValue);
    }
  };

  return (
    <form name={`searchform`} method='POST' action='#' className="search-form" onSubmit={handleSubmit}>
      <input onChange={setSearchValueHandler} placeholder="Введите тему новости" className="search-form__input" required></input>
      <button className="search-form__button">Искать</button>
    </form>
  );
}

export default SearhForm;