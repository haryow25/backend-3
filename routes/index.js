const router = require('express').Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const game = require('./gameRouter');
const userController = require('../controllers/userController');
const restrict = require('../middlewares/restrict');

router.use('/', authRouter);
router.use('/game', game);
router.use('/user', userRouter);
router.put('/score', restrict, userController.updateScore);

module.exports = router;
