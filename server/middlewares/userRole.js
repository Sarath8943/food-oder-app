


const isUser = (req, res, next) => {
    if (!req.user || req.user.role !== "user") {
      return res.status(401).json({ messsage: "unauthorized user " });
  
    }

    next();
  };
  
  module.exports = isUser;