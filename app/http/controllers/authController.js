const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {

    return {
        login(req, res) {
            res.render('login')
        },
        postLogin(req, res, next) {
            const { email, password }   = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    return res.redirect('/home')
                })
            })(req, res, next)
        },
        logout(req, res) {
          req.logout()
          return res.redirect('/')  
        }
    }
}

module.exports = authController