function getDataFromAPI(url, callback) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      callback(error);
    });
}

// Использование
getDataFromAPI('https://jsonplaceholder.typicode.com/posts', (error, postsData) => {
  if (error) {
    console.error('Произошла ошибка при загрузке posts:', error.message);
    return;
  }

  // Сортировка по убыванию длины заголовка
  const postsSortedByTitleLength = postsData.sort((a, b) => 
    b.title.length - a.title.length
  );

  console.log('Посты, отсортированные по длине заголовка:');
  console.log(postsSortedByTitleLength);
});
