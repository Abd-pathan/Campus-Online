const Mark =require('../../models/mark')
const Subject =require('../../models/subject')
const Student =require('../../models/student')






function resultController() {
    return {
        result(req,res){
               res.render("result");            
        },
        postResult(req,res) {
            
            if(req.body.examCategory === 'final-result'){
                Mark.find({ student: req.user._id, department: req.user.department, semester: req.body.semester  }).populate('subject').exec((err,result)=>{ 
                
                    return res.json(result)
            
                })
            }
            else {
                Mark.find({ student: req.user._id, department: req.user.department, semester: req.body.semester, examCategory: req.body.examCategory }).populate('subject').exec((err,result)=>{ 
                
                    return res.json(result)
            
                })
            }
            
        }
            

}
}

    module.exports = resultController
    