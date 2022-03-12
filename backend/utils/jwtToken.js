// Create and send token and save in cookie.

const sendToken = (user, userType, statusCode, res) => {
    let currentUser = user
    
    if(userType === "viewer") {
        currentUser = user.user
    }

    // Create Jwt Token 
    const token = currentUser.getJwtToken()

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie(userType, token, options).json({
        success: true,
        token,
        user
    })

}
module.exports = sendToken