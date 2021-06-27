const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placementSchema = new Schema({

    companyName: {
        type: String,
        required:true
    },
    companyId: {
        type: String,
        required:true
    },
    
    jobTitle: {
        type: String,
        required:true
    },
    jobDescription: {
        type: String,
        required:true
    },
    link: {
        type: String,
        required:true
    },
    salary: {
        type: String,
        required:true
    },
    companyAvatar: {
        type: String,
    },
    appliedProfile: [{
        sutdent: {
            type: Schema.Types.ObjectId,
            ref: 'placement'
        },
        resume: {
            type: String,
            
        }
    }]

    
}, { timestamps: true })


module.exports = mongoose.model('placement', placementSchema)