onst mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    room: String,
    username: String,
    message: String
});

module.exports = mongoose.model('Message', messageSchema);

