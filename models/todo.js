// requiring mongoose
const mongoose = require('mongoose');

// Creating Schema
const toDoSchema = new mongoose.Schema({
    id : {
        type: 'number',
        required : true
    },
    description : {
        type : 'string',
        required : true
    },
    category : { 
        type: 'string',
        required : true
    },
    date : { 
        type: 'string', 
        required: true
    },
    is_marked_done: {
        type: 'string',
        required: true
    }
})

// Creating a Schema Model and storing in a sonst
const ToDo = mongoose.model('ToDo', toDoSchema);

// Exporting the Schema Const to use it in main server file
module.exports = ToDo;