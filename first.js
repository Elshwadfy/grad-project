/*
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const adminData = require('./routs/admin');
const index = require('./routes 2/index');
const app = express();

app.use(bodyparser.urlencoded({extended:false}));
app.use('/admin',adminData.routes);
app.use(index);

app.use('/indexof',(req,res,next) =>  {
    res.send('<h1>page of index</h1>');
    console.log('hello............');
});



app.listen(3000);
*/
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const res = require('express/lib/response');

//const http = require("http");
//const routes = require('./routse');
const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const morgan = require('morgan');
const expressHbs = require('express-handlebars');
const error = require('./controller/error');
//const mongoConnect = require('./Util/database').mongoConnect;







//const adminData = require('./routes2/adminData');
//const index = require('./routes2/index');
app.set('view engine','pug');

//app.engine('hbs',expressHbs());
app.set('view engine', 'ejs');
app.set('views', 'views');



const adminData = require('./routs/admin'); 
const shopRouter = require('./routs/shop');

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',adminData.routes);
app.use(shopRouter);
app.use('/indexof',(req,res,next) =>  {
    console.log('hello............');
    res.send('<h1>page of index</h1>');
    
});
app.use(express.static(path.join(__dirname,'public')));


//app.use(error.geterror);


  
//console.log(routes.sometext);
//const server  = http.createServer(app);

// mongoConnect(() => {
//     app.listen(5000);
// });
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false
    })
  );
const MONGODB_URI =
('mongodb+srv://Graduatenum1:'+ process.env.MONGO_ATLAS_PW +'@cluster0.bwlfg.mongodb.net/SHOP?retryWrites=true&w=majority'
);


const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'users'
});
///////////////
////////////////api
///////////////
//routes
//handling error
const userRoutes = require("./routs/user");


app.use((req, res, next) =>{
  res.header('Acsess-Control-Alaw-Origin','*');
  res.header('Acsess-Control-Alaw-Headers',
  'Origin,X-Requested-With, Content-Tybe,Accept,Authorization');

if (req.method=== 'OPTHIONS'){
  res.header('Access-Control-Allaw-Methods','PUT',
  'POST','PATCH','DELETE','GET');
  return res.status(200).json({})
}
next();
});

///////////////////////////////////////////

app.use("/user",userRoutes);


app.use((req, res, next) => {
  const error = new Error('not found');
  error.status (404);
  next(error);
});

app.use((req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error:{
      messege: error.messege
    }
  });
});













mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
 //module.exports = app;

//   echo "# Graduation-Project" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/AhmedElbaz123/Graduation-Project.git
// git push -u origin main