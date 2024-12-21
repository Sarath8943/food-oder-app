

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(401).json({ messsage: "unauthorized user " });

  }
  next();
};

module.exports = isAdmin;