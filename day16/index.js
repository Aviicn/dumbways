
const path = require('path');

const express = require('express');

const hbs = require('hbs');
const app = express();
const port = 3000;

const config = require("./src/config/config.json")
const blogModel = require("./src/models").blog
const bodyParser = require('body-parser');
const { Sequelize, QueryTypes } = require('sequelize');

const { type } = require('os');
const { types } = require('util');
const sequelize = new Sequelize(config.development)
//const sequelize = new Sequelize('b51_personal_web', 'postgres', '1010', {
//  models: [blog],
//  host: 'localhost',
//  dialect: 'postgres'
//});

const bcrypt = require("bcrypt")
const saltRounds = 10
const password = "1010"
const session = require('express-session')
const flash = require('express-flash');
const { listenerCount } = require('events');

const multer = require("multer");
const upload = multer({ dest: "uploads/" })

app.set("views", path.join(__dirname, 'src/views'))


app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use("/js", express.static(path.join(__dirname, 'src/js')))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  name: 'data',
  secret: 'something',
  resave: false,
  saveuninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.get('/', home1)
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

app.get('/register', registerView)
app.post('/register', register)

app.get('/login', loginView)
app.post('/login', login)

app.post("/upload_files", upload.array("files"), uploadFiles);


const data = []
const userLogin = []

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Successfully uploaded files" });
}

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
  if(userLogin.length==0){
    //belum login
    return res.render('login')
  }
  data.length = 0;
  const isLogin = req.session.isLogin
  const user = req.session.user
  const query = "select blogs.id,blogs.title,blogs.startdate,blogs.enddate,"+
  "blogs.description, blogs.technologies, blogs.image, blogs.userid, users.email, users.name "+
  "FROM blogs INNER JOIN users ON blogs.userid = users.id WHERE blogs.userid = "+userLogin[0].id
  console.log("userdx : ", userLogin[0].name)
  console.log("islogin : ", isLogin)
  try {
    const data1 = await sequelize.query(query)
    const datanya = data1[0]
    console.log("hasil : ", datanya[0])
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

          title: element.title,
          startdate: element.startdate,
          enddate: element.enddate,

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
        dataBlog.startdate = dataBlog.startdate.toISOString().substring(0, 10)
        dataBlog.enddate = dataBlog.enddate.toISOString().substring(0, 10)
        data.push(dataBlog)
      })
      res.render('blog', { data: data, isLogin, user })
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  
}

function addBlogView(req, res) {
  res.render('add-blog')
}

async function addBlog(req, res) {

  const jarakWaktuMillis = Math.abs(new Date(req.body.enddate) - new Date(req.body.startdate));


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
    startdate: req.body.startdate,
    enddate: req.body.enddate,

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
      "INSERT INTO blogs (title, startdate, enddate, description, technologies, image,userid)"
      + " VALUES ('"
      + dataBlog.title + "','" + dataBlog.startdate + "','" + dataBlog.enddate + "','" + dataBlog.content + "','" + dataBlog.technologi + "','" + dataBlog.image+"',"+userLogin[0].id
      + ")")
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
  
  //updatedata[0].startdate = updatedata[0].startdate.toString()
  const hasil = updatedata[0]
  console.log("data yg mau di update",hasil,id)
 // hasil.startdate = hasil.startdate.toISOString().substring(0, 10)
 // hasil.enddate = hasil.enddate.toISOString().substring(0, 10)
  //console.log("data yg mau di update",hasil)
  res.render('update-blog', { hasil })
}

async function updateBlog(req, res) {
  const { id } = req.params
  //console.log("===================== : ",id)
  //console.log(">>>>>>>>>=============== : ",req.body)
  const jarakWaktuMillis = Math.abs(new Date(req.body.enddate) - new Date(req.body.startdate));


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
    startdate: req.body.startdate,
    enddate: req.body.enddate,

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
      "UPDATE blogs SET title='" + dataBlog.title + "', startdate='" + dataBlog.startdate + "', enddate='" + dataBlog.enddate
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
  const { id } = req.params
  console.log('id ', id)
  const query =  "select * from blogs INNER JOIN users ON blogs.userid = users.id  WHERE blogs.id=" + id
  const obj = await sequelize.query(query)
  const datanya = obj[0]
  console.log('datanya ', datanya)
  //console.log('datanya ', datanya[0].name)
  //res.render('blog-detail')
  res.render('blog-detail', { data: datanya[0] })
}

function registerView(req, res) {
  res.render('register')
}

async function register(req, res) {
  const { inputName, inputEmail, inputPassword } = req.body

  try {
    const hash = await hashPassword(inputPassword)
    if (hash != null) {
      const query =
        "INSERT INTO users (name, email, password)"
        + " VALUES ('"
        + inputName + "','" + inputEmail + "','" + hash + "')"
      //console.log("response : ", query)


      await sequelize.query(query, { type: QueryTypes.INSERT })
      req.flash('success', 'Register success!')
      res.redirect('/')
    }
  }
  catch (error) {
    console.error("Unable to connect to the database:", error);
    return res.redirect('/register')
  }
}

function loginView(req, res) {
  res.render('login')
}

async function login(req, res) {
  const { inputEmail, inputPassword } = req.body

  const query = "SELECT * FROM users WHERE email = '" + inputEmail + "'"
  console.log("req.body:", req.body)

  try {
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })


    if (obj.length > 0) {
      const hasil = obj[0]
      console.log("response 2: ", hasil.password)
      console.log("response 3: ", inputPassword)
      const isValidPass = await comparePassword(inputPassword, hasil.password)
      if (isValidPass) {
        userLogin.length=0 //clear data
        userLogin.push(hasil)
        res.render('home')
      }
      else {
        res.render('login')
      }
      // Print validation status
      console.log(`Password is ${!isValidPass ? 'not' : ''} valid!`)
      // => Password is valid!


    }
    else {
      res.render('login')
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.render('login')
  }



}

const hashPassword = async (password, saltRounds = 10) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds)

    // Hash password
    return await bcrypt.hash(password, salt)
  } catch (error) {
    console.log(error)
  }

  // Return null if error
  return null
}

const comparePassword = async (password, hash) => {
  try {
    // Compare password
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.log(error)
  }

  // Return false if error
  return false
}

function testimonial(req, res) {
  res.render('testimonial')
}

app.listen(port, () => {
  console.log('Serverberjalan di port ', port)
})