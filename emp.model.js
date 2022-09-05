const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const empSchema = new mongoose.Schema(
  {
    empRollno: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

empSchema.methods.getSignedJWTToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    "yuvi123",
    { expiresIn: "1h" }
  );
};

module.exports = mongoose.model("employees", empSchema);
