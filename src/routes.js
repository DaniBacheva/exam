const router = require('express').Router();

const homeController = require('./controllers/homeComtroller');
const userContoller = require ('./controllers/userController');
const offerContoller = require('./controllers/offerController')

router.use(homeController);
router.use('/users', userContoller);
router.use('/offers', offerContoller);

router.get('*', (req,res)=> {
    res.redirect('/404');
});

module.exports = router;