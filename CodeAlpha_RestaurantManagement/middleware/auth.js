exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.status(401).json({message: 'Please log in first'})
}

exports.authoriseRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return res.status(403).json({message: 'You don\'t have permission to access this resource'})
        }
        next()
    }
}