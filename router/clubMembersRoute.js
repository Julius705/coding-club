const express = require('express');
const router = express.Router();

const {registerClubMembers, getClubMembers, updateMember, deleteMember} = require("../controllers/clubRegistrationController");

router.post("/", registerClubMembers);
router.get("/", getClubMembers);
router.put("/", updateMember);
router.delete("/", deleteMember);
module.exports = router;