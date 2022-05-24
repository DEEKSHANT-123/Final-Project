const User = require("../model/User")

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email && !password){
        return res.status(400).json({
            message : "Email or Password not present",
        })  
    }
}


exports.login = async (req, res, next) => {
    try {
      const user = await User.findOne({ email, password })
      if (!user) {
        res.status(401).json({
          message: "Login not successful",
          error: "User not found",
        })
      } else {
        res.status(200).json({
          message: "Login successful",
          user,
        })
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
  }