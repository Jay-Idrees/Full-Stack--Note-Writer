
// Requiring dependencies : Express package and path
const express=require('express');
const path=require('path');

const app=express();
const PORT=process.env.PORT|| 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(express.static(path.join(__dirname,'public')));

//Routes

// require ('./routes/api-routes')(app)
require ('./routes/html-routes')(app)

// Loging link to the server on logging. 
app.listen(PORT, function(){
    console.log('The Server is now running at http://localhost:'+PORT)
})
