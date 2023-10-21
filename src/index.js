const express = require ('express');
const path = require  ('path');
const handlebars = require("express-handlebars")
const routes = require('./routes');
const mongoose = require ('mongoose')

const PORT = 3000;


const app = express();

//express config
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({ extended: false}));

//handlebars congig
app.engine("hbs", handlebars.engine({ extname : "hbs"}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

async function dbConnect (){
    const URL ="mongodb://127.0.0.1:27017/second-hand-electronics" //localhost = 127.0.0.1
    await mongoose.connect(URL);
}
dbConnect()
.then (()=> {
    console.log("Successfully connected to DB")
})
.catch((err)=> console.log(`Error while connecting to DB. Error: ${err}`)
);


//routes
app.use(routes);

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}...`));