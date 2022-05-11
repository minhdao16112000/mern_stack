const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');

const port = process.env.PORT || 5000;
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

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'uploads')));

// HTTP logger

// Route
router(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname, 'frontend/build'));
    // });
}

app.listen(port, () => {
    console.log(`App listening at https://localhost:${port}`);
});
