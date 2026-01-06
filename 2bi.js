function getUsersWithPromise() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(users => {
      const processedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        username: 'maoww',
        email: 'cwer133@gmail.com',
        phone: '+375444444444'
      }));
      return processedUsers;
    });
}

getUsersWithPromise()
  .then(processedUsers => {
    console.log('Список обработанных пользователей:');
    console.log(processedUsers);
  })
  .catch(error => {
    console.error('Произошла ошибка при выполнении запроса:', error);
  });

showProcessedUsers();
