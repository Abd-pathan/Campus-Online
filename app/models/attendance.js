const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendenceSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },

    lectures: [{
        date: {
            type: String,
            require: true
        },
        status: {
            type: String,
            default: 'absent'
        }

    }],

    totalLecturesByFaculty: {
        type: Number,
        default:0
    },
    lectureAttended: {
        type: Number,
        default:0
    },
    semester: {
        type: Number,
        default:1
    }
}, { timestamps: true })


module.exports = mongoose.model('attendance', attendenceSchema)