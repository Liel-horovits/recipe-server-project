const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = Schema({
    username: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
  }, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);