async function login(req,res,next) {

}

async function logout(req,res,next) {

}

async function register(req,res,next) {
    res.send("Not accepting registrations").status(403)
}

module.exports = {
    login,
    logout,
    register
}