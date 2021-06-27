const Student = require('../../models/student')
const Subject = require('../../models/subject')
const Attendance = require('../../models/attendance');
const Mark = require('../../models/mark');




function facultyController() {
    return {
        markAttendance(req,res){

            //const student = Student.find({department: req.department, semester: req.semester})
            res.render("./faculty/markAttendance");
            
        },
        markAttendanceData(req,res) {
            
            Student.find({department: req.body.department, semester: req.body.semester}, null, (err, student) => {
                Subject.find({semester: req.body.semester}, null, (err, subject) => {
                    return res.json({
                        student,
                        subject
                    })
                })
            })  
        },
        async postmarkAttendance(req,res){
            
            const presentStudent = req.body.studentStatusPresent ? req.body.studentStatusPresent : []
            const allStudent = JSON.parse(req.body.allStudents)
            const totalStudent = allStudent.totalStudent

            
            for (var i = 0; i < totalStudent.length; i++) {
                const pre = await Attendance.findOne({ student: totalStudent[i], subject: req.body.subjectOption })
                if (!pre) {
                    const attendance = new Attendance({
                      student: totalStudent[i],
                      subject: req.body.subjectOption,
                      lectures: [{
                      date: req.body.date,
                      status: (presentStudent.includes(totalStudent[i])? 'present': 'absent')
                      }],
                      semester: allStudent.semester,
                    })
                    if(presentStudent.includes(totalStudent[i])){
                        attendance.lectureAttended += 1
                    }
                    attendance.totalLecturesByFaculty += 1
                    await attendance.save()
                  }
                  else {
                    pre.totalLecturesByFaculty += 1
                    const attendanceByDate = {
                      date: req.body.date,
                      status: (presentStudent.includes(totalStudent[i])? 'present': 'absent')
                    }
                    if(presentStudent.includes(totalStudent[i])){
                        pre.lectureAttended += 1
                    }
                    pre.lectures.push(attendanceByDate)
                    await pre.save()
                  }

            }
            req.flash('success', 'Attendance marked successfully')
            res.redirect('/markAttendance')
        },
        updateMark(req, res){

            res.render("./faculty/updateMark");
        },
        async postupdateMark(req, res){

            try{
            
            data = JSON.parse(req.body.allStudents)
            studentId = data.totalStudent
            marks =  req.body.marks
            maximumMarks = req.body.maximumMarks
            const isAlready = await Mark.find({ examCategory: req.body.examCategory, department: data.department, semester: data.semester, subject: req.body.subjectOption })
            if(isAlready.length !== 0){
                req.flash('error', "You have already uploaded marks of given exam")
                res.redirect('/updateMark')
            }
            for(var i=0; i < marks.length; i++) {
                const newMark = await new Mark({
                    student: studentId[i],
                    subject: req.body.subjectOption,
                    examCategory: req.body.examCategory,
                    marks: marks[i],
                    maximumMarks: maximumMarks[i],
                    department: data.department,
                    semester: data.semester
                })
                await newMark.save()
            }

            req.flash('success', 'Marks uploaded successfully')
            res.redirect('/updateMark')

        }
        catch(err) {
            req.flash('error', "Error in uploading marks of given exam")

        }
        
        }
    }
}


module.exports = facultyController