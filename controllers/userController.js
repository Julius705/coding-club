const User = require("../Models/Users");
const bcrypt = require("bcryptjs");



const user = async (req, res) => {
  try {
    const {name, role, email, password}= req.body;
  if (!name || !role || !email || !password) {
    return res.status(400).json({
      message: "All fields must be provided"
    })
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    role,
    email,
    passwordHash
  })
  res.json(user)
  } catch (err) {
    res.status(500).json({
      message: "Server error", details: err.message
    })
  }
}



const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({
        message: "No users yet"
      })
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server error", details: err.message
    })
  }
}
const updateUser = async (req, res)  => {
 try {
 const {id} = req.params;
 const {name, role} = req.body;
 const upDatedUser = await User.findByIdAndUpdate(
  id,
  req.body,
  {new: true}
 );
 if (!upDatedUser) {
  return res.status(404).json({
    message: "User not found"
  });
 }
 res.status(200).json({
  message: "User updated successfully"
 });
 } catch (error) {
  res.status(500).json({
    message: "Server error", details: err.message
  });
 }
}

const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({
          message: "User not found"
        });
    }
    res.status(200).json({message: "User deleted successfully"});
  } catch (error) {
    res.status(500).json({
      message: "Server error", details: err.message
    })
  }
}
module.exports = {user, getUsers, updateUser, deleteUser};