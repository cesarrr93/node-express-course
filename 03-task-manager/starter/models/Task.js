const mongoose = require('mongoose');

const TaskScheman = new mongoose.Schema({
    name: String,
    completed: Boolean
})

module.exports = mongoose.model('Task', TaskScheman)