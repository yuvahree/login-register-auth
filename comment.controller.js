const asyncHandler = require("express-async-handler");
const Comment = require("../model/comment.model");

// @desc Get comments
// @route GET /api/comments
// @access private
const getComment = asyncHandler(async (req, res) => {
  const comment = await Comment.find({}).sort({ createAt: -1 });
  res.status(200).json({
    success: true,
    result: commented,
    message: "Fetched all the comments",
  });
});

// @desc set comment
// @route POST /api/comments
// @access private
const setComment = asyncHandler(async (req, res) => {
  const { taskID, comments } = req.body;
  if (!taskID && !comments) {
    res.status(400);
    throw new Error("please add a text field");
  }
  const comment = await Comment.create({
    taskID: taskID,
    comments: comments,
  });

  res
    .status(200)
    .json({ sucess: true, result: commented, message: "sucessfully added" });
});

// @desc Update comment
// @route PUT /api/comments/:id
// @access private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByID(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }
  const updated = await Comment.findByIDAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updated);
});

// @desc Delete comment
// @route  DELETE /api/comments/:id
// @access private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByID(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }

  await comment.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getComment,
  setComment,
  updateComment,
  deleteComment,
};
