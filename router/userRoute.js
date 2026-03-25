const express = require('express');
const router = express.Router();
const {user, getUsers, updateUser, deleteUser} = require("../controllers/userController");

router.post("/", user);
router.get("/", getUsers);
router.put("/", updateUser);
router.delete("/", deleteUser);
// router.get("/test", (req, res) => {
//   res.send("User route is working!");
// });

module.exports = router;