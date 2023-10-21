const router = require('express').Router();

const homeController = require('./controllers/homeComtroller');
const userContoller = require ('./controllers/userController');

router.use(homeController);
router.use('/users', userContoller)

module.exports = router;