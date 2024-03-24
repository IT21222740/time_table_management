const express = require("express");
const authorizeRole = require("../middleware/authorization");
const validateToken = require("../middleware/validateToken");
const {
  postClassSession,
  checkAvailabilty,
  getTimeTable,
  updateClassSession,
  deleteClassSession,
} = require("../controllers/classSessionController");
const { bookResource } = require("../controllers/resourceAllocationController");

const router = express.Router();

router.use(validateToken);
router.use(authorizeRole("admin"));

router.post("/", postClassSession);
router.post("/slot", bookResource);
router.post("/check-availablitly", checkAvailabilty);
router.put("/:id", updateClassSession);
router.get("/:id", getTimeTable);
router.delete("/:id", deleteClassSession);

module.exports = router;
