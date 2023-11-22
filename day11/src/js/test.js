const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming your HTML file is in the "public" directory

// Define routes
app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>');
});

app.get('/contact', (req, res) => {
  res.send('<h1>Contact Page</h1>');
});

app.post('/post-route', (req, res) => {
  const data = req.body;
  console.log('Handling POST request with data:', data);
  // You can perform actions based on the POST data here

  // Respond with a confirmation message
  res.send('POST request handled successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});