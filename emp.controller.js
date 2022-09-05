const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const empModel = require("../model/emp.model");

exports.register = asyncHandler(async (req, res) => {
  const { empRollno, emailId, password } = req.body;

  const storeData = new empModel({
    empRollno: empRollno,
    emailId: emailId,
  });

  const pass = await bcrypt.hash(password, 12);

  storeData.password = pass;
  storeData.save();

  res.json({
    success: true,
    result: storeData,
    message: "Successfully added",
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await empModel.findOne({ emailId: emailId }).countDocuments();
    if (user === 0) {
      return res.json({ success: false, message: "User not found" });
    } else {
      const getUser = await empModel.findOne({ emailId: emailId });

      const isEqualPassword = await bcrypt.compare(password, getUser.password);
      if (!isEqualPassword) {
        return res.json({ success: false, message: "Invalid Password" });
      } else {
        sendToken(getUser, getUser._id, res);
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});

const sendToken = (user, userId, res) => {
  const token = user.getSignedJWTToken();

  return res.cookie("token", token, "1hr").json({
    success: true,
    userId: userId,
    userEmail: user.emailId,
    token: token,
  });
};
