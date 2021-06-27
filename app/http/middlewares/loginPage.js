function faculty (req, res, next) {
    if(!req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/home')
}

module.exports = faculty