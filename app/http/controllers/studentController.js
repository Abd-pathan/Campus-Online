const Attendance = require('../../models/attendance');
const Placement = require('../../models/placement');
const Notification = require('../../models/notification');
const Subject = require('../../models/subject');


function studentController() {

    var lecture =[]

    return {
        async courses(req,res){

            const pre = await Subject.find({semester: req.user.semester, department: req.user.department})
            
            res.render("course", { subjects: pre });            
        },
        async attendance(req,res){

            const pre = await Attendance.find({ student: req.user._id, semester: req.user.semester}).populate('subject')
            
            res.render("attendance", {attendanceArray: pre});            
        },
        async placement(req,res){

            const pre = await Placement.find({}, null, { sort: { 'createdAt': -1 }})
            
            res.render("placement", {placements: pre});            
        },
        async notification(req,res){

            const pre = await Notification.find({}, null, { sort: { 'createdAt': -1 }})
            
            res.render("notification", {notifications: pre});            
        }
    }
}

module.exports = studentController