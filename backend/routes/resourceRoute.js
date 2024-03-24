const express = require("express");
const authorizeRole = require("../middleware/authorization");
const validateToken = require("../middleware/validateToken");
const { postResources } = require("../controllers/resourceController");

const router = express.Router();

router.use(validateToken);
router.use(authorizeRole("admin"));

router.post("/", postResources);

module.exports = router;
