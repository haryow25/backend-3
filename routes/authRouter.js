const router = require('express').Router();
const authController = require('../controllers/authController');
const restrict = require('../middlewares/restrict');

router.get('/', authController.index);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', restrict, authController.currentUserProfile);
router.post('/loginGoogle', authController.loginGoogle);
router.put('/forgotPassword', authController.forgotPassword);
router.put('/resetPassword', authController.resetPassword);

module.exports = router;
