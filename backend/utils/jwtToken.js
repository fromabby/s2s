// Create and send token and save in cookie.

const sendToken = (user, userType, statusCode, res) => {
  let currentUser = user;
  let expiry = 24 * 60 * 60 * 1000;
  if (userType === "viewer") {
    currentUser = user.user;
    expiry = 60 * 1000 * 15;
  }

  console.log(userType)

  // Create Jwt Token
  const token = currentUser.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(Date.now() +  expiry),
    httpOnly: true,
  };

  res.status(statusCode).cookie(userType, token, options).json({
    success: true,
    token,
    user,
  });
};
module.exports = sendToken;
