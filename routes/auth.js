const router = require('express').Router();
const { signin, signup} = require('../controllers/auth');
const { verifyToken } = require('../middlewares/token');

router.post('/signin', signin)
router.post('/signup', signup)

module.exports = router;