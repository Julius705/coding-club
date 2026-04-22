const express = require("express");
require("dotenv").config({quiet: true});
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./router/userRoute");
const clubMembersRoute = require("./router/clubMembersRoute");
const authRoute = require("./router/authRoute");
const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
const corsOptions = {
  origin: allowedOrigins,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization"
};
app.use(cors(corsOptions));


app.use(express.json());
app.use("/user", userRoute);
app.use("/clubMembers", clubMembersRoute);
app.use("/auth", authRoute);
const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})