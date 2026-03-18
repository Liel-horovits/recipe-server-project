const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address: String,
    role: {
        type: String,
        enum: ['admin', 'user']
    }
});

module.exports = mongoose.model('User', UserSchema);