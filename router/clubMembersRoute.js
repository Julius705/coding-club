const express = require('express');
const router = express.Router();

const {
       registerClubMember,
       getClubMember,
       updateMember,
       deleteMember
    } = require("../controllers/clubRegistrationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", registerClubMember);
router.get("/",  getClubMember);
router.put("/:id", authMiddleware, updateMember);
router.delete("/:id", authMiddleware, deleteMember);
module.exports = router;