const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const methodOverride = require('method-override');
const session = require('express-session');

const port = 5000;
const app = express();
require('dotenv').config();

const router = require('./routers');
const db = require('./config/db');

// Conect to db
db.connect();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        // method: 'GET, POST, PUT, PATCH, DELETE',
        credentials: true,
    })
);

app.use(
    session({
        secret: 'fashiSecret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Methods',
//         'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//     );
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     next();
// });

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'uploads')));

// HTTP logger
app.use(morgan('combined'));

// Route
router(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
