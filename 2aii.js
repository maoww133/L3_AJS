function retrieveAndSortComments(callback) {
  const apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(comments => {
      const alphabeticallySortedComments = comments.sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      callback(null, alphabeticallySortedComments);
    })
    .catch(error => {
      callback(error, null);
    });
}

retrieveAndSortComments((error, commentsSortedByName) => {
  if (error) {
    console.error('Не удалось загрузить комментарии:', error.message);
    return;
  }

  console.log('Список комментариев, упорядоченный по имени автора:\n');

  commentsSortedByName.forEach(comment => {
    console.log(`Имя:       ${comment.name}`);
    console.log(`Адрес:     ${comment.email}`);
    console.log(`Содержание: ${comment.body}`);
    console.log('─'.repeat(60));
  });
});
