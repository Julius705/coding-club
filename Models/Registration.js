const mongoose = require("mongoose");
const clubMembersShema = new mongoose.Schema({
  name: {type : String, required : true},
  school: {type: String, required: true},
  admno: {type: Number, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true}
})
module.exports = mongoose.model("ClubMembers", clubMembersShema);