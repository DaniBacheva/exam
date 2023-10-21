const router = require("express").Router();
const userManager = require('../manager/userManager');
const { getErrorMessage } = require('../util/errorHandler'); 

router.get('/register', (req, res) => {
    res.render('users/register')
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {

    const token = await userManager.register({username, email, password, repeatPassword });
    
    res.cookie('token', token, {httpOnly:true})
    res.redirect('/');
    }
    catch (error) {
        res.status(400).render('users/register', { error: getErrorMessage(error) });
    }
});

router.get('/login', (req, res) => {
    res.render('users/login')
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try{
    const token = await userManager.login(email, password);
    console.log(token)
     res.cookie('token', token, {httpOnly:true})
        res.redirect('/');
    }
    catch (error) {
        return res.status(404).render("users/login", { error:getErrorMessage(error)});
    }

});

router.get('/logout', (req,res)=> {

    res.clearCookie('token');
    res.redirect('/');

});

module.exports = router;