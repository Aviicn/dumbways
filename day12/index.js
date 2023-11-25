
const path = require('path');

const express = require('express');

const hbs = require('hbs');
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, 'src/views'))


app.set('view engine', 'hbs');
app.use(express.static('public'));

const bodyParser = require('body-parser');


app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use("/js", express.static(path.join(__dirname, 'src/js')))
app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/home', home)
app.get('/contact', contact)
app.get('/blog', blog)
app.post('/blog/:id', deleteBlog)

app.get('/add-blog', addBlogView)
app.post('/add-blog', addBlog)

app.get('/update-blog/:id', updateBlogView)
app.post('/update-blog/:id', updateBlog)

app.get('/blog-detail/:id', blogDetail)
app.get('/testimonial', testimonial)


const data = []


function home(req, res) {
  res.render('index')
}

function contact(req, res) {
  res.render('contact')
}

function blog(req, res) {
  res.render('blog', { data })
}

function addBlogView(req, res) {
  res.render('add-blog')
}

function addBlog(req, res) {

  const jarakWaktuMillis = Math.abs(new Date(req.body.endDate) - new Date(req.body.startDate));


  let hari = Math.floor(jarakWaktuMillis / (1000 * 60 * 60 * 24));
  let jam = Math.floor((jarakWaktuMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let menit = Math.floor((jarakWaktuMillis % (1000 * 60 * 60)) / (1000 * 60));
  let detik = Math.floor((jarakWaktuMillis % (1000 * 60)) / 1000);
  let bulan = Math.round(hari / 30);
  hari = hari%30;

  let durasi = ""
  if (bulan > 0 & hari > 0) {
    durasi = parseInt(bulan) + " Bulan " + parseInt(hari) + " Hari"
  }
  else if (bulan > 0 & hari === 0) {
    durasi = parseInt(bulan) + " Bulan "
  }
  else if (bulan === 0 & hari > 0) {
    durasi = parseInt(hari) + " Hari"
  }

  const dataBlog = {
    title: req.body.inputTitle,
    startDate: req.body.startDate,
    endDate: req.body.endDate,

    content: req.body.inputContent,
    image: req.body.inputImage,
    technologi: req.body.radio,

    bulan: bulan,
    hari: hari,
    jam: jam,
    menit: menit,
    detik: detik,
    durasi: durasi,
    author: "Avicienna"
  }



  data.unshift(dataBlog)

  //console.log("datanya :", data)

  res.redirect('/blog')
}



function updateBlogView(req, res) {
  const { id } = req.params
  let updatedata = {
    id:0,
    title: req.body.inputTitle,
    startDate: req.body.startDate,
    endDate: req.body.endDate,

    content: req.body.inputContent,
    image: req.body.inputImage,
    technologi: req.body.radio,

   
    author: "Avicienna"
  }
 //console.log("id :", id)
 updatedata = data[parseInt(id)]
 updatedata.id = id

  //console.log("data yg mau di update",updatedata)
  res.render('update-blog', { updatedata })
}

function updateBlog(req, res) {
  let id = parseInt(req.params.id)
 
  const jarakWaktuMillis = Math.abs(new Date(req.body.endDate) - new Date(req.body.startDate));


  let hari = Math.floor(jarakWaktuMillis / (1000 * 60 * 60 * 24));
  let jam = Math.floor((jarakWaktuMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let menit = Math.floor((jarakWaktuMillis % (1000 * 60 * 60)) / (1000 * 60));
  let detik = Math.floor((jarakWaktuMillis % (1000 * 60)) / 1000);
  let bulan = Math.round(hari / 30);
  hari = hari%30;

  let durasi = ""
  if (bulan > 0 & hari > 0) {
    durasi = parseInt(bulan) + " Bulan " + parseInt(hari) + " Hari"
  }
  else if (bulan > 0 & hari === 0) {
    durasi = parseInt(bulan) + " Bulan "
  }
  else if (bulan === 0 & hari > 0) {
    durasi = parseInt(hari) + " Hari"
  }

  const dataBlog = {


    title: req.body.inputTitle,
    startDate: req.body.startDate,
    endDate: req.body.endDate,

    content: req.body.inputContent,
    image: req.body.inputImage,
    technologi: req.body.radio,

    bulan: bulan,
    hari: hari,
    jam: jam,
    menit: menit,
    detik: detik,
    durasi: durasi,
    author: "Avicienna"
  }



  data[id]=dataBlog
  res.redirect('/blog')

}

function deleteBlog(req, res) {
  const { id } = req.params

  data.splice(id, 1)

  res.redirect('/blog')


}


function blogDetail(req, res) {
  const { id } = req.params

  const title = "Title1"
  const content = "Content1"

  const data = {
    id,
    title,
    content,
  }

  res.render('blog-detail', { data })
}

function testimonial(req, res) {
  res.render('testimonial')
}

app.listen(port, () => {
  console.log('Serverberjalan di port ', port)
})