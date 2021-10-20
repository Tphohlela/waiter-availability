let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
// let regFunction = require("./reg");
const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const app = express();
// const routes = require("./routes/regRoutes");

// const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registration';

// const { Pool } = require('pg');

// const pool = new Pool({
//   connectionString,
//   ssl: {
//     rejectUnauthorized: false
//   }
//});

// let reg = regFunction(pool);
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

app.get('/', function(req, res) {
	res.render('index', {
		// total: pizza.getTotal(),
	});
});

 
let PORT = process.env.PORT || 3019;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});