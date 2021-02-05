import React from 'react';
import './SavedNewsHeader.css';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function SavedNewsHeader({ saveArticles }) {
  const [keywords, setKeywords] = React.useState([]);
  const [keywordsList, setKeywordsList] = React.useState('');
  const [declination, setDeclination] = React.useState('');
  const [keywordsAdditional, setKeywordsAdditional] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);
  const userName = currentUser.name;

  React.useEffect(() => {
    const arrayOfKeywords = saveArticles.map((item) => item.keyword).sort();
    const uniqueArrayKeywords = arrayOfKeywords.filter(function(item, pos) {
      return arrayOfKeywords.indexOf(item) === pos;
    });
    setKeywords(uniqueArrayKeywords);
  }, [saveArticles, userName]);

  React.useEffect(() => {
    const numberOfKeywords = keywords.length;
    console.log(numberOfKeywords);
    if (numberOfKeywords === 0) {
      setDeclination('сохраненных статей');
    };

    if (numberOfKeywords === 1) {
      setKeywordsList(keywords.slice(0, 1));
      setDeclination('сохраненная статья');
      setKeywordsAdditional('');
    };

    if (numberOfKeywords === 2) {
      const words = keywords.join(', ');
      setKeywordsList(words);
      setDeclination('сохраненных статьи');
      setKeywordsAdditional('');
    };

    if (numberOfKeywords === 3) {
      const words = keywords.slice(0, 2).join(', ');
      setKeywordsList(words);
      setDeclination('сохраненных статьи');
      setKeywordsAdditional(` и ${numberOfKeywords - 2}-му другому`);
    };

    if (numberOfKeywords > 3) {
      const words = keywords.slice(0, 2).join(', ');
      setKeywordsList(words);
      setDeclination('сохраненных статей');
      setKeywordsAdditional(` и ${numberOfKeywords - 2}-м другим`);
    };

    if (numberOfKeywords === 4) {
      setDeclination('сохраненные статьи');
    };

  }, [keywords, saveArticles]);

  return (
    <section className="saved-news-header">
      <h1 className="saved-news__title">Сохраненные статьи</h1>
      <p className="saved-news__quantity">{userName}, у вас {saveArticles.length} {declination}</p>
      <p className="saved-news__keyword">
        По ключевым словам:
        <span className="saved-news__keyword-bold"> {keywordsList}</span>
        <span className="saved-news__keyword-bold">{keywordsAdditional}</span>
      </p>
    </section>
  );
}
// keywordsAdditional
export default SavedNewsHeader;