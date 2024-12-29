const isAdmin = (req, res, next) => {
  const role = req.user.role
  if (role !==  "admin") {
    return res.status(401).json({ messsage: "Admin access required to perform this action" });
  }
  next();
};

module.exports = isAdmin;
