function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

function checkAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next()
    }
    res.status(403).send("Access Denied: You do not have permission to access this page.")
}

module.exports = { checkAuthenticated, checkAdmin }
