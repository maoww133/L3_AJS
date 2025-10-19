const https = require('https');

function fetchDataFromAPI(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let responseBody = '';
      
      response.on('data', (chunk) => {
        responseBody += chunk;
      });
      
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(responseBody);
          resolve(jsonData);
        } catch (parsingError) {
          reject(parsingError);
        }
      });
      
    }).on('error', (requestError) => {
      reject(requestError);
    });
  });
}

async function executeAllTasks() {
  try {
    const postsData = await fetchDataFromAPI('https://jsonplaceholder.typicode.com/posts');
    const postsSortedByTitleLength = postsData.sort((firstPost, secondPost) => 
      secondPost.title.length - firstPost.title.length
    );
    console.log('Посты отсортированные по убыванию длины заголовка:');
    console.log(postsSortedByTitleLength);

    const commentsData = await fetchDataFromAPI('https://jsonplaceholder.typicode.com/comments');
    const commentsSortedByName = commentsData.sort((firstComment, secondComment) => 
      firstComment.name.localeCompare(secondComment.name)
    );
    console.log('Комментарии упорядоченные по имени автора:');
    console.log(commentsSortedByName);

    const usersData = await fetchDataFromAPI('https://jsonplaceholder.typicode.com/users');
    const usersWithSelectedFields = usersData.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone
    }));
    console.log('Пользователи с выбранными полями:');
    console.log(usersWithSelectedFields);

    const todosData = await fetchDataFromAPI('https://jsonplaceholder.typicode.com/todos');
    const incompleteTodos = todosData.filter(todo => !todo.completed);
    console.log('Список невыполненных задач:');
    console.log(incompleteTodos);

  } catch (error) {
    console.error('Возникла ошибка:', error);
  }
}

executeAllTasks();