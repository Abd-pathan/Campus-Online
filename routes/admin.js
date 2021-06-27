const adderController = require('../app/http/controllers/adderController')
const viewController = require('../app/http/controllers/viewController')
const adminMiddleware = require('../app/http/middlewares/admin')
const facultyMiddleware = require('../app/http/middlewares/faculty')
const studentMiddleware = require('../app/http/middlewares/student')

const multer = require("multer") 



function adminRoutes(app) {



    const fileStorageEngine = multer.diskStorage({

        destination:(req,file,cb)=> {
            cb(null, './public/img')
        },
        filename:(req,file,cb)=> {
            cb(null, Date.now() + '--' + file.originalname)
        },
    })
    
    const upload= multer({storage: fileStorageEngine})

 
    //Add Student
    app.get("/addUsersStudent", adminMiddleware ,function(req,res){
        res.render("./admin/addUsersStudent");
    });
    app.post("/addUsersStudent", upload.single('avatar') , adderController().addStudent);

    
    //Add Faculty
    app.get("/addUsersFaculty", adminMiddleware ,function(req,res){
        res.render("./admin/addUsersFaculty");
    });
    app.post("/addUsersFaculty", upload.single('avatar') , adderController().addFaculty);


    //Add Admin
    app.get("/addUsersAdmin", adminMiddleware ,function(req,res){
        res.render("./admin/addUsersAdmin");
    });
    app.post("/addUsersAdmin", upload.single('avatar') , adderController().addAdmin);


    //Add Subject
    app.get("/addSubject", adminMiddleware ,function(req,res){
        res.render("./admin/addSubject");
    });
    app.post("/addSubject", adminMiddleware , adderController().addSubject);


    //Add Notification
    app.get("/updateNotification", adminMiddleware ,function(req,res){
        res.render("./admin/updateNotification");
    });
    app.post("/updateNotification", upload.single('avatar') , adderController().addNotification);


    //Add Placement
    app.get("/updatePlacement", adminMiddleware ,function(req,res){
        res.render("./admin/updatePlacement");
    });
    app.post("/updatePlacement", upload.single('companyAvatar') , adderController().addPlacement);


    //View Student
    app.get("/viewUsersStudent",adminMiddleware,viewController().viewStudent);
    app.post("/viewUsersStudent", adminMiddleware,viewController().postViewStudent);
         

    //View Faculty
    app.get("/viewUsersFaculty",adminMiddleware,viewController().viewFaculty);
    app.post("/viewUsersFaculty", adminMiddleware,viewController().postViewFaculty);


    //View Admin
    app.get("/viewUsersAdmin", adminMiddleware ,viewController().viewAdmin)


    //Update Semester
    app.post("/updateSemester", adminMiddleware ,adderController().updateSemester);


}

module.exports = adminRoutes