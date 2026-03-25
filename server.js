const express = require("express");
require("dotenv").config({quiet: true});
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./router/userRoute");
const clubMembersRoute = require("./router/clubMembersRoute");

const app = express();
app.use(express.json());
app.use("/user", userRoute);
app.use("/clubMembers", clubMembersRoute);
const PORT = process.env.PORT || 6000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})