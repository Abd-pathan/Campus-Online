const facultyMiddleware = require('../app/http/middlewares/faculty')
const facultyController = require('../app/http/controllers/facultyController')


function facultyRoutes(app) {
    
    app.get("/markAttendance", facultyMiddleware,facultyController().markAttendance);
    app.post("/markAttendance", facultyMiddleware,facultyController().postmarkAttendance);
    app.post("/markAttendanceData", facultyMiddleware,facultyController().markAttendanceData);
    
    app.get("/updateMark", facultyMiddleware,facultyController().updateMark);
    app.post("/updateMark", facultyMiddleware,facultyController().postupdateMark);
    app.post("/updateMarkData", facultyMiddleware,facultyController().markAttendanceData);
    
    
}

module.exports = facultyRoutes