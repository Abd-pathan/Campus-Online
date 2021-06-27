const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema({
    
    subjectName: {
        type: String,
        required: true,
        trim: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    
    semester: {
        type: Number,
        required: true 
    },
    type: {
        type: String,
        required: true
    },
    courseOutcome: {
        type: String,
        required: true
    },
    totalCradits: {
        type: Number,
        default:4
    },
    attendence: {
        type: Schema.Types.ObjectId,
        ref: 'attendence'
    }

}, { timestamps: true })


module.exports = mongoose.model('subject', subjectSchema)