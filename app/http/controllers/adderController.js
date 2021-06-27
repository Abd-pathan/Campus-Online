const Student = require('../../models/student')
const Faculty = require('../../models/faculty')
const Admin = require('../../models/admin')
const Subject = require('../../models/subject')
const Placement = require('../../models/placement')
const Notification = require('../../models/notification')
const bcrypt = require('bcrypt')



function adderController() {

    return {
        async addStudent(req, res){
            const formDetails = req.body
            
            
            // Validate request 
            if(!formDetails.name || !formDetails.email || !formDetails.password) {
                req.flash('error', 'Main fields are required')
                return res.redirect('/addUsersStudent')
            }

            // Check if email exists 
            Student.exists({ email: formDetails.email }, (err, result) => {
                if(result) {
                    req.flash('error', 'Email already taken') 
                    return res.redirect('/register')
                }
            })

            // Multer Image Saving
            const filename = "./img/" + req.file.filename
            formDetails.avatar = filename

            //Hashed Password
            formDetails.password = await bcrypt.hash(formDetails.password, 10)
            // formDetails.avatar = path by multer
            

            //Create a User
            const student = new Student(formDetails)

            //console.log(student);
            student.save().then((student) => {
                req.flash('success', 'Registered Successfully')
                return res.redirect('/addUsersStudent')
             }).catch(err => {
                req.flash('error', "Something went wrong")
                    return res.redirect('/addUsersStudent')
             })

        },
        async addFaculty(req, res){
            const formDetails = req.body
            
            
            
            // Validate request 
            if(!formDetails.name || !formDetails.email || !formDetails.password) {
                req.flash('error', 'Main fields are required')
                return res.redirect('/addUsersStudent')
            }

            // Check if email exists 
            Faculty.exists({ email: formDetails.email }, (err, result) => {
                if(result) {
                    req.flash('error', 'Email already taken') 
                    return res.redirect('/register')
                }
            })


            // Multer Image Saving
            const filename = "./img/" + req.file.filename
            formDetails.avatar = filename

            

            //Hashed Password
            formDetails.password = await bcrypt.hash(formDetails.password, 10)
            
            

            //Create a User
            const faculty = new Faculty(formDetails)

            //console.log(student);
            faculty.save().then((faculty) => {
                req.flash('success', 'Registered Successfully')
                return res.redirect('/addUsersFaculty')
             }).catch(err => {
                req.flash('error', "Something went wrong")
                    return res.redirect('/addUsersFaculty')
             })

        },
        async addAdmin(req, res){
            const formDetails = req.body
            
            
            // Validate request 
            if(!formDetails.name || !formDetails.email || !formDetails.password) {
                req.flash('error', 'Main fields are required')
                return res.redirect('/addUsersAdmin')
            }

            // Check if email exists 
            Admin.exists({ email: formDetails.email }, (err, result) => {
                if(result) {
                    req.flash('error', 'Email already taken') 
                    return res.redirect('/addUsersAdmin')
                }
            })

            //Hashed Password
            formDetails.password = await bcrypt.hash(formDetails.password, 10)
            

            // Multer Image Saving
            const filename = "./img/" + req.file.filename
            formDetails.avatar = filename

            //Create a User
            const admin = new Admin(formDetails)

            //console.log(student);
            admin.save().then((admin) => {
                req.flash('success', 'Registered Successfully')
                return res.redirect('/addUsersAdmin')
             }).catch(err => {
                req.flash('error', "Something went wrong")
                    return res.redirect('/addUsersAdmin')
             })

        },
        async addSubject(req, res){
            const formDetails = req.body
            
            // Validate request 
            if(!formDetails.subjectName || !formDetails.subjectCode || !formDetails.department || !formDetails.semester || !formDetails.type ) {
                req.flash('error', 'Main fields are required')
                return res.redirect('/addSubject')
            }

            // Check if email exists 
            Subject.exists({ subjectCode: formDetails.subjectCode }, (err, result) => {
                if(result) {
                    req.flash('error', 'Email already taken') 
                    return res.redirect('/addSubject')
                }
            })

            // Multer Image Saving
            // const filename = "./img/" + req.file.filename
            // formDetails.avatar = filename

            //Create a User
            const subject = new Subject(formDetails)

            //console.log(student);
            subject.save().then((subject) => {
                req.flash('success', 'Registered Successfully')
                return res.redirect('/addSubject')
             }).catch(err => {
                req.flash('error', "Something went wrong")
                    return res.redirect('/addSubject')
             })

        },
        async addPlacement(req, res){
            const formDetails = req.body
            
            // Validate request 
            if(!formDetails.companyName || !formDetails.companyId || !formDetails.jobTitle || !formDetails.jobDescription || !formDetails.link || !formDetails.salary ) {
                req.flash('error', 'Main fields are required')
                return res.redirect('/updatePlacement')
            }


            // Multer Image Saving
            const filename = "./img/" + req.file.filename
            formDetails.companyAvatar = filename


            //Create a User
            const placement = new Placement(formDetails)

            //console.log(student);
            placement.save().then((placement) => {
                req.flash('success', 'Registered Successfully')
                return res.redirect('/updatePlacement')
             }).catch(err => {
                req.flash('error', "Something went wrong")
                    return res.redirect('/updatePlacement')
             })

        },
        async addNotification(req, res){
            const formDetails = req.body
            
            // Validate request 
            if(!formDetails.title || !formDetails.link || !formDetails.details ) {
                req.flash('error', 'Main fields are required')
                return res.redirect('/updateNotification')
            }


            // Multer Image Saving
            const filename = "./img/" + req.file.filename
            formDetails.avatar = filename


            //Create a User
            const notification = new Notification(formDetails)

            //console.log(student);
            notification.save().then((notification) => {
                req.flash('success', 'Registered Successfully')
                return res.redirect('/updateNotification')
             }).catch(err => {
                req.flash('error', "Something went wrong")
                    return res.redirect('/updateNotification')
             })

        },
        async updateSemester(req, res){

            try{

            const pre = await Student.find({semester: {$ne: 8}}, null, { sort: { 'createdAt': -1 }})
            // pre.forEach((student => {
            //     student.semester += 1
            //     await student.save()
            // }))
            for(var i=0; i<pre.length; i++){
                student = pre[i];
                student.semester += 1
                await student.save()
            }
            req.flash('success', 'Semester Updated Successfully')
            res.redirect('/home')
            }
            catch(err){
                req.flash('error', "Something went wrong")
            }
        }

    }
}

module.exports = adderController