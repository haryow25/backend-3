const router = require('express').Router();
const game = require('../controllers/gameController');

router.get('/', game.findAll);
router.get('/recomendation', game.getRecomendation);
router.post('/', game.newGame);
router.get('/:id', game.findOne);
router.get('/:id/leaderboard', game.getLeaderboard);

module.exports = router;
