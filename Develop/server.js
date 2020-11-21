
// Requiring dependencies : Express package and path
const express=require('express');
const path=require('path');

const app=express();
const PORT=process.env.PORT|| 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(_dirname,'public')));

require ('./routes/api-routes')(app)
require ('./routes/html-routes')(app)

app.listen(PORT, function(){
    console.log('The Surver is now running at http://localhost:'+PORT)
})
