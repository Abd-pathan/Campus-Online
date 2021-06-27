const mongoose = require('mongoose')
const Schema = mongoose.Schema

const markSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    examCategory: {
        type: String,
        required:true
    },
    marks: {
        type: Number,
        default: 0
    },
    maximumMarks: {
        type: Number,
        default: 100
    },
    department: {
        type:String
    },
    semester: {
        type:Number
    }
}, { timestamps: true })


module.exports = mongoose.model('mark', markSchema)