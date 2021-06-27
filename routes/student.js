

//controllers
const authController = require('../app/http/controllers/authController')
const studentController = require('../app/http/controllers/studentController')

//middlewares
const studentMiddleware = require('../app/http/middlewares/student')
//const studentFacultyMiddleware = require('../app/http/middlewares/studentFaculty')
const allLogIn = require('../app/http/middlewares/all')
const loginPage = require('../app/http/middlewares/loginPage')
const resultController = require('../app/http/controllers/resultController')


function studentRoutes(app) {

    let lecture = []
    let subject = ""
    let arrayDate = []
    let arrayMonth = []


    app.get("/home", allLogIn,function(req,res){
        res.render("home");
    });

    app.get("/", loginPage ,authController().login);
    app.post("/", authController().postLogin);
    app.post('/logout', authController().logout)
    
    app.get("/attendance", studentMiddleware,studentController().attendance);
    app.post("/attendance", studentMiddleware,(req, res) => {
        var constMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
           let arrMonth = [], arrDate = [];
           let a = 0;
            
           const lectures = JSON.parse(req.body.lectures)
           const subjectName = req.body.subjectName
           subject = subjectName
            for(var i=0; i<lectures.length; i++ ){
                if(lectures[i].status === 'present'){
                    
                    let presentDate = new Date(lectures[i].date)
                    if(!arrMonth.includes(presentDate.getMonth())) {
                        arrMonth[a] = presentDate.getMonth()
                        arrDate[a] = 1
                        a++
                    }
                    else{
                        arrDate[arrMonth.indexOf(presentDate.getMonth())] += 1
                    }
                }
            }
            for(var i=0; i<arrMonth.length; i++){
                arrMonth[i] = constMonth[arrMonth[i]]
            }
            
            lecture = lectures
            arrayDate = arrDate
            arrayMonth = arrMonth
            

            res.redirect("/chart");
            
    });

    app.get("/chart", studentMiddleware,(req,res) => {
        res.render("chart", {lectures: lecture, subject: subject, arrayMonth, arrayDate});
        });
    
    app.get("/course", studentMiddleware,studentController().courses);
    app.get("/placement", allLogIn,studentController().placement);
    app.get("/notification", allLogIn,studentController().notification);
    
    
    app.get("/result", studentMiddleware,resultController().result);
    app.post("/result", studentMiddleware,resultController().postResult);

    
    
    
    // FOR MAJOR
    // app.get("/chat", studentMiddleware,function(req,res){
    //     res.render("chat");
    // });
    
    // app.get("/cooperative", allLogIn,function(req,res){
    //     res.render("cooperative");
    // });
    
    
}

module.exports = studentRoutes