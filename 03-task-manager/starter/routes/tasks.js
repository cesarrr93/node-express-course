const express = require("express");
const router = express.Router();

const {
  getAllTaks,
  getTaks,
  updateTaks,
  deleteTaks,
  createTaks,
} = require("../controllers/tasks");

router.route("/").get(getAllTaks).post(createTaks);
router.route("/:id").get(getTaks).patch(updateTaks).delete(deleteTaks);

module.exports = router;
