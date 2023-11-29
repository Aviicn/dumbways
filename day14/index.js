
const path = require('path');

const express = require('express');

const hbs = require('hbs');
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, 'src/views'))


app.set('view engine', 'hbs');
app.use(express.static('public'));

const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { type } = require('os');
const { types } = require('util');
const sequelize = new Sequelize('b51_personal_web', 'postgres', '1010', {
  models: [blog],
  host: 'localhost',
  dialect: 'postgres'
});


app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use("/js", express.static(path.join(__dirname, 'src/js')))
app.use(express.urlencoded({ extended: false }))

app.get('/', home1)
app.get('/home', home)
app.get('/contact', contact)
app.get('/blog', blog)
app.post('/blog/:id', deleteBlog)

app.get('/add-blog', addBlogView)
app.post('/add-blog', addBlog)

app.get('/update-blog/:id', updateBlogView)
app.post('/update-blog/:id', updateBlog)

app.get('/blog-detail', blogDetail)
app.get('/testimonial', testimonial)


const data = []


function home1(req, res) {
  res.render('index')
}
function home(req, res) {
  res.render('home')
}

function contact(req, res) {
  res.render('contact')
}

async function blog(req, res) {
  // akan menampilkan semua data blog yg ada di database
  data.length = 0;

  try {
    const data1 = await sequelize.query("select * from blogs")
    const datanya = data1[0]
    //console.log("hasil : ", datanya[0])
    if (datanya != null) {
      datanya.forEach(element => {


        const jarakWaktuMillis = Math.abs(new Date(element.enddate) - new Date(element.startdate));


        let hari = Math.floor(jarakWaktuMillis / (1000 * 60 * 60 * 24));
        let jam = Math.floor((jarakWaktuMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let menit = Math.floor((jarakWaktuMillis % (1000 * 60 * 60)) / (1000 * 60));
        let detik = Math.floor((jarakWaktuMillis % (1000 * 60)) / 1000);
        let bulan = Math.round(hari / 30);
        hari = hari % 30;

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
          id: element.id,

          title: element.name,
          startDate: element.startdate,
          endDate: element.enddate,

          content: element.description,
          image: datanya.image,
          technologi: element.technologies,

          bulan: bulan,
          hari: hari,
          jam: jam,
          menit: menit,
          detik: detik,
          durasi: durasi,
          author: "Avicienna"
        }

        data.push(dataBlog)
      })
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  res.render('blog', { data })
}

function addBlogView(req, res) {
  res.render('add-blog')
}

async function addBlog(req, res) {

  const jarakWaktuMillis = Math.abs(new Date(req.body.endDate) - new Date(req.body.startDate));


  let hari = Math.floor(jarakWaktuMillis / (1000 * 60 * 60 * 24));
  let jam = Math.floor((jarakWaktuMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let menit = Math.floor((jarakWaktuMillis % (1000 * 60 * 60)) / (1000 * 60));
  let detik = Math.floor((jarakWaktuMillis % (1000 * 60)) / 1000);
  let bulan = Math.round(hari / 30);
  hari = hari % 30;

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
    id: req.body.id,
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

  //insert ke database 
  try {
    const responsenya = await sequelize.query(
      "INSERT INTO blogs (name, startdate, enddate, description, technologies, image)"
      + " VALUES ('"
      + dataBlog.title + "','" + dataBlog.startDate + "','" + dataBlog.endDate + "','" + dataBlog.content + "','" + dataBlog.technologi + "','" + dataBlog.image
      + "')")
    //console.log("response : ",responsenya)
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }


  //console.log("datanya :", data)

  res.redirect('/blog')
}



function updateBlogView(req, res) {
  const { id } = req.params

  let updatedata = data.filter((item) => (item.id === parseInt(id)))
  //updatedata[0].startDate = updatedata[0].startDate.toString()
  const hasil = updatedata[0]
  hasil.startDate = hasil.startDate.toISOString().substring(0, 10)
  hasil.endDate = hasil.endDate.toISOString().substring(0, 10)
  //console.log("data yg mau di update",hasil)
  res.render('update-blog', { hasil })
}

async function updateBlog(req, res) {
  const { id } = req.params
  //console.log("===================== : ",id)
  //console.log(">>>>>>>>>=============== : ",req.body)
  const jarakWaktuMillis = Math.abs(new Date(req.body.endDate) - new Date(req.body.startDate));


  let hari = Math.floor(jarakWaktuMillis / (1000 * 60 * 60 * 24));
  let jam = Math.floor((jarakWaktuMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let menit = Math.floor((jarakWaktuMillis % (1000 * 60 * 60)) / (1000 * 60));
  let detik = Math.floor((jarakWaktuMillis % (1000 * 60)) / 1000);
  let bulan = Math.round(hari / 30);
  hari = hari % 30;

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

    id: id,

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
  //console.log("response : ",dataBlog)
  //update to db here
  try {
    const responsenya = await sequelize.query(
      "UPDATE blogs SET name='" + dataBlog.title + "', startdate='" + dataBlog.startDate + "', enddate='" + dataBlog.endDate
      + "', description='" + dataBlog.content + "',technologies='" + dataBlog.technologi + "',image='" + dataBlog.image
      + "' WHERE id=" + dataBlog.id)
    //console.log("response : ",responsenya)
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  //data[id] = dataBlog

  res.redirect('/blog')

}

async function deleteBlog(req, res) {
  const { id } = req.params
  try {
    const datanya = await sequelize.query("DELETE from blogs WHERE id=" + id)
    //console.log("Data delete",datanya)
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }


  //data.splice(id, 1)

  res.redirect('/blog')


}


async function blogDetail(req, res) {
  //const { id } = req.params
  //console.log('id ', id)
  //const query = 'SELECT * FROM blogs WHERE id=' + id
 // const obj = await sequelize.query(query)
 // const datanya = obj[0]
  //console.log('datanya ', datanya)
  //console.log('datanya ', datanya[0].name)
  res.render('blog-detail')
  //res.render('blog-detail', { data: datanya[0] })
}


function testimonial(req, res) {
  res.render('testimonial')
}

app.listen(port, () => {
  console.log('Serverberjalan di port ', port)
})