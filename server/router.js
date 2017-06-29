const AuthenticationController = require('./controllers/authentication'),
  express = require('express'),
  passportService = require('./config/passport'),
  passport = require('passport');

// Middleware to require auth
const requireAuth = passport.authenticate('jwt', { session: false });
// const requireLogin = passport.authenticate('local', { session: false, failWithError: true });

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
        authRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set url for API group routes
  app.use('/api', apiRoutes);

  // Test protected route
  apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({
      content: 'The protected test route is functional!',
    });
  });

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin);

  // User info route given valid JWT
  authRoutes.get('/user', requireAuth, (req, res) => {
    res.send({
      user: req.user
    });
  });
}