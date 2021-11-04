let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let waiters = require("./waiters");
const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const app = express();
// const routes = require("./routes/regRoutes");

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/waiters';

const { Pool } = require('pg');

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

let waiter = waiters(pool);
// const route = routes(reg);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable the static folder...
app.use(express.static('public'));

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'));

// initialise the flash middleware
app.use(flash());

app.get('/', function (req, res) {
  res.render('login');
});

app.post('/', async function (req, res) {
  try {
  
    console.log('sdfghjkl    ' + req.body.username)
    console.log('zxcvbnmxcvb   ' + req.body.login)
    const submit = req.body.login
    const user = req.body.username

    await waiter.storeNames(req.body.username);

    if (!user) {
      req.flash('info', 'Please enter username');
    }

    else if(user == 'owner'){
      res.redirect('/owner')
    }

    else{
      res.redirect('/waiter/' + user)
    }


    res.render('login', {
      name: user
    })

  } catch (error) {
    console.log(error);
  } 

});

app.get('/waiter/:username',  function (req, res) {

    res.render('selectdays',{
      user: req.params.username
    })
 
});

app.post('/waiter/:username', async function (req, res) {
  console.log('sdfghjkl    ' + req.params.username)
  console.log('sdfghjkl    ' + req.body.day)
  console.log('sdfghjkl    ' + req.body.addDays)
  const name = req.params.username
  const day = req.body.day

  if(day == undefined){
    req.flash('info','Please select the days you are available to work')
  }

  else{
    req.flash('good','You have successfully added your days')
  }

  res.render('selectdays',{
    user: name
  })

  await waiter.storeNameAndDays(name,day);
  await waiter.bookings();

  // console.log('llldfghjk,l. ' + JSON.stringify(await waiter.underBooked()))

  })

  app.get('/owner',async function(req, res){
    res.render('owner')
  })

let PORT = process.env.PORT || 3019;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});  