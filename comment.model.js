const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    taskID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "please add a task_ID"],
    },
    comments: {
      type: String,
      required: [true, "please add a comments"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", commentSchema);
