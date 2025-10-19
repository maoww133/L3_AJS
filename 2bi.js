const https = require('https');

function getUsersWithPromise() {
  return new Promise((resolve, reject) => {
    const apiEndpoint = 'https://jsonplaceholder.typicode.com/users';
    
    https.get(apiEndpoint, (response) => {
      let responseData = '';
      
      response.on('data', (chunk) => {
        responseData += chunk;
      });
      
      response.on('end', () => {
        try {
          const usersList = JSON.parse(responseData);
          const processedUsers = usersList.map(user => ({
            id: user.id,
            name: user.name,
            username: 'maoww',
            email: 'cwer133@gmail.com',
            phone: '+375444444444'
          }));
          resolve(processedUsers);
        } catch (parsingError) {
          reject(parsingError);
        }
      });
      
    }).on('error', (requestError) => {
      reject(requestError);
    });
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