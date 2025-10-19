const https = require('https');

function retrieveAndSortComments(callback) {
  const apiUrl = 'https://jsonplaceholder.typicode.com/comments';
  
  https.get(apiUrl, (response) => {
    let collectedData = '';
    
    response.on('data', (chunk) => {
      collectedData += chunk;
    });
    
    response.on('end', () => {
      try {
        const commentsArray = JSON.parse(collectedData);
        const alphabeticallySortedComments = commentsArray.sort((first, second) => 
          first.name.localeCompare(second.name)
        );
        callback(null, alphabeticallySortedComments);
      } catch (parseError) {
        callback(parseError, null);
      }
    });
    
  }).on('error', (networkError) => {
    callback(networkError, null);
  });
}

retrieveAndSortComments((error, commentsSortedByName) => {
  if (error) {
    console.error('Не удалось загрузить комментарии:', error);
    return;
  }
  
  console.log('Список комментариев, упорядоченный по имени автора:');
  
  commentsSortedByName.forEach(comment => {
    console.log(`Имя: ${comment.name}`);
    console.log(`Адрес: ${comment.email}`);
    console.log(`Содержание: ${comment.body}`);
  });
});