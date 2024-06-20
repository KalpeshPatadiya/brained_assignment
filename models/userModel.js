
const mongoose = require('mongoose');

/**
 * User schema
 */
const schema = mongoose.Schema;

const userSchema = new schema({
    firstname: String,
    lastname: String,
    email: String,
    avatar: String
})

const userModel = mongoose.model('users', userSchema);


module.exports = userModel;