const Student = require('../../models/student')
const Subject = require('../../models/subject')
const Admin = require('../../models/admin')
const Faculty = require('../../models/faculty')

//const Admin = require('../../models/admin')

function viewController() {
    return {
        viewFaculty(req,res){

            //const student = Student.find({department: req.department, semester: req.semester})
            res.render("./admin/viewUsersFaculty");
            
        },
        postViewFaculty(req,res) {
            
            Faculty.find({department: req.body.department}, null, (err, faculty) => {
                
                    return res.json({
                        faculty
                    })
                })
             
        },
        viewStudent(req,res){

            //const student = Student.find({department: req.department, semester: req.semester})
            res.render("./admin/viewUsersStudent");
            
        },
        postViewStudent(req,res) {
            
            Student.find({department: req.body.department, semester: req.body.semester}, null, (err, student) => {
                Subject.find({semester: req.body.semester}, null, (err, subject) => {
                    return res.json({
                        student,
                        subject
                    })
                })
            })  
        },
        async viewAdmin(req,res){
        
            const adminData =await Admin.find({})
            res.render("./admin/viewUsersAdmin",{keyVUA:adminData });
        }





    }
}
    


module.exports = viewController