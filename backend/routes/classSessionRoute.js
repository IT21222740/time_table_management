const express = require("express");
const authorizeRole = require("../middleware/authorization");
const validateToken = require("../middleware/validateToken");
const { postClassSession } = require("../controllers/classSessionController");
const { bookResource } = require("../controllers/resourceAllocationController");

const router = express.Router();

router.use(validateToken);
router.use(authorizeRole("admin"));

router.post("/", postClassSession);
router.post("/slot", bookResource);

module.exports = router;
