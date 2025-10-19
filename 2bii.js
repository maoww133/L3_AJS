const https = require('https');

function getIncompleteTodosWithPromise() {
  return new Promise((resolve, reject) => {
    const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
    
    https.get(todosUrl, (response) => {
      let collectedData = '';
      
      response.on('data', (chunk) => {
        collectedData += chunk;
      });
      
      response.on('end', () => {
        try {
          const allTodos = JSON.parse(collectedData);
          const pendingTodos = allTodos.filter(todo => !todo.completed);
          resolve(pendingTodos);
        } catch (parseError) {
          reject(parseError);
        }
      });
      
    }).on('error', (networkError) => {
      reject(networkError);
    });
  });
}

getIncompleteTodosWithPromise()
  .then(pendingTasks => {
    console.log('Список незавершенных задач:');
    console.log(pendingTasks);
  })
  .catch(error => {
    console.error('Ошибка при получении задач:', error);
  });