const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({

    title: {
        type: String,
        required:true
    },
    details: {
        type: String,
        required:true
    },
    link: {
        type: String,
        required:true
    },
    avatar: {
        type: String,
        
    }
    
}, { timestamps: true })


module.exports = mongoose.model('notification', notificationSchema)