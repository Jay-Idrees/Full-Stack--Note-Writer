// Importing data from db.json
const db = require("../db/db.json");

        // Note that for API routes there will be some kind of database connection- db.json or Mongo or MYSQL
        // Note that the data routes are distiguished from html routes as they contain api in the route
        // Path and FS are also required because we are dealing with specifying paths, reading and writing files

const fs = require("fs");
const path = require("path");

// Exporting a function that creates api routes
module.exports = function(app) {
    // Get all the existing notes from the database
    // Note that the ajax function getNotes in grabbing it for HTML using the get method to display it on HTML

    app.get("/api/notes", function(req, res) {
        res.json(db);
    });// br close get api/notes

        // Get the id of the latest note
        // Generate a new note id based on the id of the last note
        // Create a new note
        // push it to the db as a data object
        // Update the database

    app.post("/api/notes", function(req, res) {
        // Set id to 1 incase there is no notes in the db
        let id = 1;
        // If there are notes, get the id of the last note and add 1 to it
        if (db.length > 0) {

               // Go to db.json find the last object from the array of objects called db and get its id and save itinto a variable last_note_id. It can find the last object by subtracting 1 from the total number of objects in the array

            const last_note_id = db[db.length - 1].id;
                //bump the id by 1 before starting the new note- so we can assign this to the new note
            id = last_note_id + 1;
        }//br close if statement

        // Get the note from HTML driven ajax function saveNote (in index.js) via the post request
        const new_note_object = req.body;

    // Place the "new" id captured in the id variable after bumping+1 into the new note's object as id property
        new_note_object.id = id;

     // pushing the new note into db.json - which is basically an array of objects
        db.push(new_note_object);
      
           // write the db.json with new file containing new note
        fs.writeFile(path.resolve(__dirname, "../db/db.json"), JSON.stringify(db), function(err) {
            if (err) throw err;
            // Return the new note
            res.json(new_note_object);
        });
    }); // br close post request api/notes
    // DELETE request
    app.delete("/api/notes/:id", function(req, res) {
     
    //Locate the note in the database with id
   // Go to the db, and get the id of the note
        const id_list = db.map(function(note) {
            return note.id;
        });
        const index_id = id_list.indexOf(parseInt(req.params.id));
   // As db is an arry of notes, we can use splice 
// At position id_index remove.  1 refers to the number of items to remove at this position in the array
        db.splice(index_id, 1);
      
        fs.writeFile(path.resolve(__dirname, "../db/db.json"), JSON.stringify(db), function(err) {
            if (err) throw err;
            // Return OK status
            res.json({ ok: true });
        });
    }); // cl br for the app.delete api route
};// closing br for module.exports







