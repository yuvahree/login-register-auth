const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getComment,
  setComment,
  updateComment,
  deleteComment,
} = require("../controller/comment.controller");

router.route("/").get(protect, getComment);
router.route("/").post(protect, setComment);

router.route("/:id").delete(deleteComment).put(updateComment);

/*router.get("/", getComment);
router.post("/", setComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);*/

module.exports = router;
