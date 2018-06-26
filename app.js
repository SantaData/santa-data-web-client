const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require("cors");
const morgan = require("morgan");
const nunjucks = require('nunjucks');
const session = require('express-session');

const router = require('./routes');

const env = process.env.NODE_ENV;
global.__basedir = __dirname;

app.set('view engine', 'html');
// Nunjucks
let njk_env = nunjucks.configure("views", {
    autoescape: true,
    cache: false,
    express: app,
    watch: true
});
// Set Nunjucks as rendering engine for pages with .html suffix
app.engine('html', nunjucks.render);


// ENABLE req.body
app.use(bodyParser.json({ limit: '2000mb' })); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '2000mb'
}));

// SECURITY
app.use(helmet());

// LOGS
app.use(morgan("common"));

// CROSS-DOMAIN
app.use(cors());

// SESSION STORE
app.use(session({
    store: new pgSession({
        pool: db.pool,
        tableName: 'user_session_data'
    }),
    name: 'Stonehenge',
    secret: 'South America - Um cavalo sem nome',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 12 * 60 * 60 * 1000 // 12 hours
    } 
}));

// Public files
app.use('/static', express.static('public'));

//Rotas
app.use('/', router);

// Listen server
app.listen(3000, function () {
    console.log('Listening at: 3000')
});