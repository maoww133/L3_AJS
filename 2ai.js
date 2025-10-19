const https = require('https');

function getDataFromAPI(url, callback) {
  https.get(url, (response) => {
    let rawData = '';
    
    response.on('data', (chunk) => {
      rawData += chunk;
    });
    
    response.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        callback(null, parsedData);
      } catch (parseError) {
        callback(parseError);
      }
    });
    
  }).on('error', (error) => {
    callback(error);
  });
}

getDataFromAPI('https://jsonplaceholder.typicode.com/posts', (error, postsData) => {
  if (error) {
    console.error('Произошла ошибка при загрузке posts:', error);
    return;
  }
  
  const postsSortedByTitleLength = postsData.sort((postA, postB) => 
    postB.title.length - postA.title.length
  );
  
  console.log('Posts отсортированные по длине title:', postsSortedByTitleLength);
});