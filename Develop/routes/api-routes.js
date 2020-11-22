const db=require('../db/db.json');

// Note that for API routes there will be some kind of database connection- db.json or Mongo or MYSQL
// Note that these are distiguished from html routes as they contain api in the route
// Path and FS are also required because we are dealing with specifying paths, reading and writing files
const fs=require('fs');
const path=require('path');
const db=require('../db/db.json');
const { notEqual } = require('assert');

module.exports=function(app){

    // Get all the existing notes from the database
app.get ('/api/notes', function (req, res){
res.json(db)

});// br close get api/notes



// Get the id of the latest note
// Generate a new note id based on the id of the last note
// Create a new note
// push it to the db as a data object
// Update the database
app.post('api/notes', function (res, req){

    let id=1;
    if (db.length>0){
        // Go to db.json find the last object from the array of objects and get its id. It can find the last object by subtracting 1 from the total number of objects in the array

const last_note_id=db[db.length-1].id
//bump the id by 1 before starting the new note
id=last_note_id +1;

    }; //br close if statement

// Then create a new note object
const new_note_object=req.body
// adding the id properted to the new note object
new_note_object.id=id
// pushing the new note into the body
db.push(new_note_object)

// write the db.json with new file

fs.writeFile(path.resolve(__dirname, "../db/db.json"), JSON.stringify(db), function(err) {
    if (err) throw err;
    // Return the new note
    res.json(new_note_object);
}); // br close write file

});// br close post request api/notes

} // closing br for module.exports



//Note that when we are trying to do something to a very specific object inside the database the route contains :id or whatever you name it
app.delete('api/notes/:id', function(req, res){

    //Locate the note in the database with id
// Go to the db, and get the id of the note
const id_list=db.map(function(note){
    return note.id
});

const id_index=id_list.indexOf(parseInt(req.params.id))
// As db is an arry of notes, we can use splice 
// At position id_index remove 
db.splice(id_index, 1)

});