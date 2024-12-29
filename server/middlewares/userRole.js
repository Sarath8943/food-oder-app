const isUser = (req, res, next) => {
  const role = req.user.role
  if (role !==  "user") {
    return res.status(401).json({ messsage: "User access required to perform this action" });
  }

  next();
};

module.exports = isUser;
