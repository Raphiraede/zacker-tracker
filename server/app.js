var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const passport = require('passport')  
const GoogleStrategy = require('passport-google-oauth20').Strategy 
const session = require('express-session')

const bodyParser = require('body-parser')


var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

const { Pool } = require('pg')

var app = express()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

 // view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(session({  
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: false,
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())



passport.serializeUser((user, done) => {  
  done(null, user)
})

passport.deserializeUser((userDataFromCookie, done) => {  
  done(null, userDataFromCookie)
})

// Checks if a user is logged in
const accessProtectionMiddleware = (req, res, next) => {  
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(403).json({
      message: 'must be logged in to continue',
    })
  }
}

// Set up passport strategy
passport.use(new GoogleStrategy(  
  {
    clientID: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_SECRET,
    callbackURL: 'https://zacker-tracker.herokuapp.com/auth/google/callback',
    scope: ['email'],
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile)
    return cb(null, profile)
  },
))

// Create API endpoints

// This is where users point their browsers in order to get logged in
// This is also where Google sends back information to our app once a user authenticates with Google
app.get('/auth/google/callback',  
  passport.authenticate('google', { failureRedirect: '/', session: true }),
  (req, res) => {
    console.log('wooo we authenticated, here is our user object:', req.user)
    pool.query(`SELECT * FROM users WHERE google_id = '${req.user.id}'`,
      (error, response) => {
        if(error) throw error
        else if (response.rows.length===0){
          res.redirect('/create-user')
        }
        else{
          res.redirect('/home/dashboard')
        }
      }
    )
  }
)

app.post('/auth/signup', accessProtectionMiddleware, (req, res) => {
  console.log('/auth/signup endpoint hit')

  //Name is coming from req.body, not req.user. This is because req.body.name is from when the user had an oppurtunity to change his name
  pool.query(`INSERT INTO users VALUES
  (DEFAULT, ${req.user.id}, '${req.body.name}', '${req.user.email}', NOW(), NOW());`, (err, response) => {
    if (err){
      console.log('there was an error')
      console.log(err)
      throw err
    }
    else{
      console.log('there was no error, insert was successful')
    }
  })
  res.redirect('/home/dashboard')
})

app.get('/user-info', accessProtectionMiddleware, (req, res) => {  
  pool.query(`SELECT * FROM users WHERE google_id = '${req.user.id}'`,
    (error, queryResponse) => {
      if(error) {
        console.log(error)
        throw error
      }
      else if (queryResponse.rows.length===0){
        res.status(404).send('User does not exist')
      }
      else{
        res.json(queryResponse.rows[0])
      }
    }
  )
})


app.get('/get-projects', accessProtectionMiddleware, (req, res) => {  
  pool.query(`SELECT * FROM projects WHERE owner= '${req.user.id}'`,
    (error, queryResponse) => {
      if(error) {
        console.log(error)
        throw error
      }
      else if (queryResponse.rows.length===0){
        res.status(404).send('No Projects')
      }
      else{
        console.log('project query response:', queryResponse)
        const responseBody = {
          queryResponse
        }
        res.json(queryResponse)
      }
    }
  )
})

app.post('/create-project', accessProtectionMiddleware, (req, res) => { 
  console.log('req.body:', req.body)
  pool.query(`INSERT INTO projects VALUES
    (DEFAULT, '${req.body.name}', '${req.body.description}', ${req.user.id}, NOW(), NOW());`,
    (error, queryResponse) => {
      if(error) {
        console.log('There was an error')
        throw error
      }
      else{
        console.log('project successfully created')
        res.status(200).send('project successfully inserted into database')
      }
    }
  )
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use('/', indexRouter)
app.use('/users', usersRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app



