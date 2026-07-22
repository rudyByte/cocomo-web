const http = require('http');

function test(url) {
  http.get(url, (res) => {
    console.log(`STATUS for ${url}: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log(`LENGTH: ${data.length}`);
      if (data.includes('error') || data.includes('Error')) {
        console.log('CONTAINS ERROR TEXT!');
      }
    });
  }).on('error', (err) => {
    console.error(`ERROR fetching ${url}:`, err.message);
  });
}

test('http://localhost:3000/');
test('http://localhost:3000/cocomo-media');
