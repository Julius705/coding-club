const ClubMember = require("../Models/Registration");


const registerClubMember = async (req, res) => {
  try {
  const {name, school, admno, gender, age } = req.body;
  if (!name || !school || !admno || !gender || !age) {
    return res.status(400).json({message: "All fields must be provided"});
  };
  const existingMember = await ClubMember.findOne({school, admno});
  if (existingMember) {
    return res.status(409).json({message: "There is a student with that admno in this school"});
  }
  const clubMember = new ClubMember({
    name,
    school,
    admno,
    gender,
    age
  })
  await clubMember.save();
  res.status(201).json({message: "YOU HAVE SUCCESSFULLY BEEN REGISTERED! WELCOME TO THE CODING CLUB",
    member:{
      name: clubMember.name,
      school: clubMember.school,
      admno: clubMember.admno,
      gender: clubMember.gender,
      age: clubMember.age
    }
  });

  } catch (err) {
    res.status(500).json({
      message: "Server error", details: err.message
    });
  }
}

const getClubMember = async (req, res) => {
  try {
    const clubMembers = await ClubMember.find();
    if (clubMembers.length === 0){
      return res.status(404).json({message: "no members yet"});
    }
    res.status(200).json(clubMembers);
    
  } catch (error) {
    res.status(500).json({
      message: "Server error", details: err.message
    });
  }

}
const updateMember = async (req, res) => {
 try {
  const {id} = req.params;
  const {name, school, admno, gender, age } = req.body;
  const upDatedMember = await ClubMember.findByIdAndUpdate(
    id, 
    {name,school, admno, gender, age },
    {new: true}
  );
  if (!upDatedMember) {
    return res.status(404).json({message: "Club Member not found"});
  }
  res.status(200).json({message: "Club Member updated successfully!"});
 } catch (error) {
  res.status(500).json({
    message: "Server error", details: err.message
  });
 }
}

const deleteMember = async (req, res) => {
  try {
 const {id} = req.params;
  const deletedMember = await ClubMember.findByIdAndDelete(id);
  if (!deletedMember){
    return res.status(404).json({message: "Club Member Not Found"});
  }
  res.status(204).json({message: "Club Member Deleted Successfully"});
  } catch (error) {
    res.status(500).json({
      
    });
  }
}
module.exports = {registerClubMember, getClubMember, updateMember, deleteMember};