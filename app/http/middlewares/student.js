function student (req, res, next) {
    if(req.isAuthenticated() && req.user.role === 'student') {
        return next()
    }
    return res.redirect('/home')
}

module.exports = student