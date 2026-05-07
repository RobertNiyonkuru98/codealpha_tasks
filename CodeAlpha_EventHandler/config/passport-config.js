const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)   // await — Mongoose returns a Promise
        if(user == null){
            return done(null, false, {message: 'No user found'})
        }

        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        }catch (error){
            return done(error)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.userId))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))

}

module.exports = initialize