//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
const app = express();
const port = 3000;
//set dynamic views file
app.set("views", path.join (__dirname, 'src/views'))

//set view engine
app.set('view engine', 'hbs');
//set public folder as static folder for static file
app.use(express.static('public'));

const bodyParser = require('body-parser');


app.use("/assets",  express.static(path.join(__dirname, 'src/assets')))
app.use("/js",  express.static(path.join(__dirname, 'src/js')))
app.use(express.urlencoded({extended:false}))

app.get('/', home)
app.get('/home', home)
app.get('/contact', contact)
app.get('/blog', blog)
app.get('/delete-blog/:id', deleteBlog)

app.get('/add-blog', addBlogView)
app.post('/add-blog', addBlog)

app.get('/blog-detail/:id', blogDetail)
app.get('/testimonial', testimonial)


 const data = [
    {
      title: "Title1",
      content: "Content1"
    },
    {
      title: "Title2",
      content: "Content2"
    },
    {
      title: "Title3",
      content: "Content3"
    }
  ]

function home(req, res){
  res.render('home')
}

function contact(req, res){
  res.render('contact')
}

function blog(req, res){
  res.render('blog', { data })
}

function addBlogView(req, res){
  res.render('add-blog')
}

function addBlog (req, res) {
  const { title, content } = req.body

  console.log("title :" , title)
  console.log("content:", content)


  res.redirect('blog')
}

function deleteBlog (req, res) {
  const { title, content } = req.body

  console.log("title :" , title)
  console.log("content:", content)


  res.redirect('blog')
}


function blogDetail(req,res){
  const { id } = req.params

  const title = "Title1"
  const content = "Content1"

  const data = {
    id,
    title,
    content,
  }

  res.render('blog-detail',{data})
}

function testimonial(req, res){
  res.render('testimonial')
}

app.listen(port, () => {
  console.log('Serverberjalan di port ${port}')
})