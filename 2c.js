function fetchDataFromAPI(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
}

async function executeAllTasks() {
  try {
    const postsData = await fetchDataFromAPI('https://jsonplaceholder.typicode.com/posts');
    const postsSortedByTitleLength = postsData.sort((a, b) => 
      b.title.length - a.title.length
    );
    console.log('Посты отсортированные по убыванию длины заголовка:');
    console.log(postsSortedByTitleLength);

    const commentsData = await fetchDataFromAPI('https://jsonplaceholder.typicode.com/comments');
    const commentsSortedByName = commentsData.sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    console.log('\nКомментарии упорядоченные по имени автора:');
    console.log(commentsSortedByName);

    const usersData = await fetchDataFromAPI('https://jsonplaceholder.typicode.com/users');
    const usersWithSelectedFields = usersData.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone
    }));
    console.log('\nПользователи с выбранными полями:');
    console.log(usersWithSelectedFields);

    const todosData = await fetchDataFromAPI('https://jsonplaceholder.typicode.com/todos');
    const incompleteTodos = todosData.filter(todo => !todo.completed);
    console.log('\nСписок невыполненных задач:');
    console.log(incompleteTodos);
  } catch (error) {
    console.error('Возникла ошибка:', error);
  }
}

executeAllTasks();
