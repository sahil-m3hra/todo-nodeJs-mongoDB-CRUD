// express, path and body-parser module
const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),

// defining port for listening the server.
port = 3000,

// requiring the DB config file to establish a connecting between server and DB,
db = require('./config/mongoose'),

// requiring Schema Model for for defining the schema Structure
ToDo = require('./models/todo'),

// Creating express instance to use express
app = express(); 

var toDoListLength;

// setting up view engine
app.set("view engine", "ejs");

// setting path to render ejs files
app.set("views", path.join(__dirname, 'views'));

// setting path to use static files such as css, js, images etc
app.use(express.static(path.join(__dirname, 'assets')));

// using body parser to parse the data fetched from requests
app.use(bodyParser.urlencoded({ extended: true }));


var categories = ['Personal', 'Work', 'School', 'Cleaning', 'Other']

// To fetch the data from DB
app.get("/", (req, res) => {
    ToDo.find({}, (err, todoList) => {
        if (err) {
            console.log("Error! in fetching the todo list from DB...");
            return;
        }
        this.toDoListLength = todoList.length;
        return res.render('index', { 
            categories: categories,
            todo : todoList,
            
        });
    })
});

// To create a new TODO in a DB
app.post('/create-todo', (req, res) => {

    ToDo.find({}, (err, todoList) => {
        if (err) {
            console.log("Error! in fetching the todo list from DB...");
            return;
        }
        this.toDoListLength = todoList.length;
        return;
    })
    ToDo.create({
        id : this.toDoListLength + 1,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        is_marked_done: 'false'
    }, (err) =>{
        if (err) {
            console.log("Oops! Error creating a new todo...");
            return
        }else{
            console.log(" *********Successfully created a new todo ***********");
            return res.redirect('back');
        }
    }) 
});

// To delete a TODO in DB
app.get('/delete-todo', (req, res) => {
    let id = req.query.id;
    ToDo.findByIdAndDelete(id , (err) => {
        if (err) {
            console.log("Error! in deleting the todo");
            return;
        }
        console.log("Successfully deleted a todo")
        return res.redirect("back")
    })
})

// To update a TODO in DB
app.put("/update-todo/:id", (req,res) => {
    const id = req.params.id;
    ToDo.updateOne(
        {id: id}, 
        {$set: {id: id, is_marked_done: 'true'}
        }, (err) => {
        if (err) {
            console.log("Error! in updating the todo");
            return;
        }
        console.log("********* Successfully updated a todo **********");
        return res.redirect("back")
    }) 
})

// TO listen the server on provided port
app.listen(port, (err) => {
    if (err) {
        console.log('Something went wrong during firing up the server...');
    }
    console.log(`Server is up! and running on a port: ${port}...`)
  
});


