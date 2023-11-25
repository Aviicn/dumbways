
const path = require('path');

const express = require('express');

const hbs = require('hbs');
const app = express();
 

app.set('views',path.join(__dirname,'views'));

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/',(req, res) => {
 
  res.render('home');
});

app.get('/home',(req, res) => {
    
    res.render('home');
  });
  

app.get('/about',(req, res) => {
  res.send('This is about page');
});
 
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});