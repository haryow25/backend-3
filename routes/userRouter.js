const router = require('express').Router();
const restrict = require('../middlewares/restrict');
const authorization = require('../middlewares/authorization');
const userController = require('../controllers/userController');

router.get('/', userController.getAllUser);
router.get('/playedGame', restrict, userController.getPlayedGame);
router.get('/:username', userController.findOne);
router.use(restrict);
router.put('/me/update', authorization, userController.updateUser);

module.exports = router;
