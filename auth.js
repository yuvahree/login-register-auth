const authPage = (permissions) => {
  return (req, res, next) => {
    const userRole = req.body.userRole;
    if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};
module.exports = { authPage };
