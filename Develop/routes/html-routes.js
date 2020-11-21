

const path=require('path');

module.exports=function(app){

    //Here get is used from the server's perspective. This is telling the server to get the notes.html file from HTML and then send it to the browser


    app.get('/notes', function (req, res){
        console.log('Notes html route is working')
        res.sendFile(path.join(__dirname,'../public/notes.html'));
    });

    
    app.get('*', function (res,req){
    console.log ('* htmlroute is working')
    res.sendFile(path.join(__dirname,'../public/index.html'));
    });

}// br close module.exports