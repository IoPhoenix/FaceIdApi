/* Express is a light-weight web application framework
  to help organize web app on the server side */
const express = require('express');
const app = express();

/* Parse incoming request bodies in a middleware before 
the handlers, available under the req.body property */
const bodyParser = require('body-parser');

// to enable CORS:
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

// Knex is an SQL query builder
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const avatar = require('./controllers/avatar');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', // localhost
      user : 'olga',
      password : '',
      database : 'faceid' // < createdb 'faceid'
    }
});

app.use(bodyParser.json());
app.use(cors());

/* database structure example 
{
    users: [
        {
            id: '1',
            name: 'John',
            email: "john@gmail.com",
            entries: 0,
            joined: new Date(),
            avatarUrl: ''
        }
    ], 
    login: [
        {
            email: "john@gmail.com",
            password: 'cookies'
        }
    ]
} */

// root route
app.get('/', (req, res) => { res.send(database.users)});

//  signin: check existing user info
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});

// register: post new user info
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});

// profile: get user info from database
app.get('/profile/:id', (req, res) => { profile.getProfile(req, res, db)})

// image: inscrese # of checked images from a certain user
app.put('/image', (req, res) => { image.increaseNumberOfEntries(req, res, db)})

// detect face with Clarifai API
app.post('/imageurl', (req, res) => image.handleAPICall(req, res));

// update user avatar url
app.put('/avatar', (req, res) => { avatar.updateAvatar(req, res, db)});


app.listen(3000, () => {
    console.log('App is running');
})