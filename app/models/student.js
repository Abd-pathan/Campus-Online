const mongoose = require('mongoose')
const Schema = mongoose.Schema


const studentSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    
    program: {
        type: String,
        required: true
    },
    
    department: {
        type: String,
        required: true
    },
    
    studentMobileNumber: {
        type: Number,
        required: true
    },
    fatherMobileNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'subject'
        }
    ],
    otp: {
       type:String
    },
    semester: {
        type: Number,
        default: 1
    },
    placementReg: [{
        type: Schema.Types.ObjectId,
        ref: 'placement'
    }],
    role: {
        type: String,
        default: 'student'
    }



}, { timestamps: true })


module.exports = mongoose.model('student',studentSchema)