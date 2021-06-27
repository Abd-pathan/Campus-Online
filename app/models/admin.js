const mongoose = require('mongoose')
const Schema = mongoose.Schema


const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique:true
    },
    department: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    joiningYear: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: 'admin'
    }

}, { timestamps: true })


module.exports = mongoose.model('admin', adminSchema)