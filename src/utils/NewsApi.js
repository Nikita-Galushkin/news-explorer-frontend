function getNews(searchString) {

  const currentDate = new Date();
  const dtms = currentDate.valueOf();
  const days = 7;
  const fromDate = new Date(dtms - ((24 * 3600 * 1000) * days));

  const url = `https://nomoreparties.co/news/v2/everything?` +
    `language=ru&` +
    `q=${searchString}&` +
    `from=${fromDate.toISOString()}&` +
    `to=${currentDate.toISOString()}&` +
    `pageSize=100&` +
    `apiKey=1da83ecf9e924ecfb22223be6534e5db`;
  const req = new Request(url);

  return fetch(req)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export {
  getNews,
};
