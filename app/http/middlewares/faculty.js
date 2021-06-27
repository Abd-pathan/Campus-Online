function faculty (req, res, next) {
    if(req.isAuthenticated() && req.user.role === 'faculty') {
        return next()
    }
    return res.redirect('/home')
}

module.exports = faculty