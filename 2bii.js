function getIncompleteTodosWithPromise() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(todos => {
      const pendingTodos = todos.filter(todo => !todo.completed);
      return pendingTodos;
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
