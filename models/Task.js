const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength:[1000, 'Name cannot be more than 1000 characters']
    },
    completed:{
        type:Boolean,
        default: false
    },
    deadline: {
        type: Date,
        required: [true, 'Must provide project deadline'],
    },
    task: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength:[20, 'Name cannot be more than 20 characters']
    },
});

module.exports = mongoose.model('Tasks', TaskSchema);
