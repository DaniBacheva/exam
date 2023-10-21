const router = require("express").Router();

router.get("/", (req,res)=> {
    //res.send("hi")
   res.render("home")
});


module.exports = router;