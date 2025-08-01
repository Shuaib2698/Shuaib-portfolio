const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Test route
router.get('/test', (req, res) => res.send('Auth route working'));

// Verification route
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ message: 'Authenticated', user: req.user });
});

module.exports = router;