var jwt = require("jsonwebtoken");


  const generateToken = (user) => {
    try {
      
  const token = jwt.sign({ id: user._id,  role: user.role }, process.env.JWT_SECRET);
  return token;
    } catch (error) {

      res.status(error.status || 500).json({ error: error.message || "Internal server Error"});

    }
  }
  
  module.exports = { generateToken };