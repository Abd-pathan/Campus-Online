const LocalStrategy = require('passport-local').Strategy
const Admin = require('../models/admin')
const Faculty = require('../models/faculty')
const Student = require('../models/student')
const bcrypt = require('bcrypt')
var checker = {}

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // Login

        // Check if email exist
        const admin = await Admin.findOne({ email: email })
        const student = await Student.findOne({ email: email })
        const faculty = await Faculty.findOne({ email: email })
        const user = admin || faculty || student
        checker = user

        if(!user) {
            return done(null, false, { message: 'No user with this email' })
        }

        bcrypt.compare(password, user.password).then(match => {
            if(match) {
                return done(null, user, { message: 'Logged in succesfully' })
            }
            return done(null, false, { message: 'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        
        if(checker.role === 'admin'){
            Admin.findById(id, (err, user) => {
                done(err, user)
            })
        } else if(checker.role === 'faculty'){
            Faculty.findById(id, (err, user) => {
                done(err, user)
            })
        } else{
            Student.findById(id, (err, user) => {
                done(err, user)
            })
        }
    

    })


}

module.exports = init