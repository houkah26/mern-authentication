// Set user info to be sent back to client
exports.setUserInfo = (user) => {  
  return {
    _id: user._id,
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    email: user.email,
    role: user.role,
    joined: user.createdAt,
    cash: user.cash
  }
}