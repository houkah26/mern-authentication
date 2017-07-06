const AuthenticationController = require('./controllers/authentication'),
      UserController = require('./controllers/user'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');

// Middleware to require auth
const requireAuth = passport.authenticate('jwt', { session: false });

// Middleware to require login and handle login errors
const requireLogin = function (req, res, next) {
  passport.authenticate('local', { session: false },
    function (err, user, info) {
      if (err) { return next(err) }
      if (!user) { return res.status(401).json(info) }
      AuthenticationController.login(res, user)
    }
  )(req, res, next)
}

module.exports = (app) => {
  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        userRoutes = express.Router();

  //=========================
  // API Routes (/api)
  //=========================
  
  // Set url for API group routes
  app.use('/api', apiRoutes);


  // Test protected route
  apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({
      content: 'The protected test route is functional!',
    });
  });

  //=========================
  // Auth Routes (/api/auth)
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin);

  //=========================
  // User Routes (/api/user)
  //=========================

  // Set user routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/user', userRoutes);

  // User info route given valid JWT
  userRoutes.get('/info', requireAuth, UserController.getInfo);
  
}