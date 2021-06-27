const mongoose = require('mongoose')
const Schema = mongoose.Schema


const facultySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
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
        type: Number,
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
        type: Number,
        required: true
    },
    
    
    
    avatar: {
        type: String
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'subject'
    }],
    otp: {
        type: String
    },
    role: {
        type: String,
        default: 'faculty'
    }
}, { timestamps: true })


module.exports = mongoose.model('faculty', facultySchema)