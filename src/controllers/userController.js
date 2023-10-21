const router = require("express").Router();
const userManager = require('../manager/userManager')

router.get('/register', (req, res) => {
    res.render('users/register')
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    await userManager.register({username, email, password, repeatPassword });
    res.redirect('/users/login');
});

router.get('/login', (req, res) => {
    res.render('users/login')
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await userManager.login(email, password);
    console.log(token)
     res.cookie('token', token, {httpOnly:true})
        res.redirect('/')

});

router.get('/logout', (req,res)=> {

    res.clearCookie('token');
    res.redirect('/');

});

module.exports = router;