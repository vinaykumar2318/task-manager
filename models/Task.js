const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    dueDate : {type: Date, required: true},
    isCompleted: {type: Boolean, default: false},
},{timestamps:true});

mongoose.models = {};
export default mongoose.model("Task", taskSchema);