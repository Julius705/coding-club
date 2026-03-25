const ClubMembers = require("../Models/Registration");


const registerClubMembers = async (req, res) => {
  try {
  const {name, school, admno, gender, age } = req.body;
  if (!name || !school || !admno || !gender || !age) {
    return res.status(400).json({message: "All fields must be provided"});
  };
  const existingMember = await ClubMembers.findOne({school, admno});
  if (existingMember) {
    return res.status(409).json({message: "There is a student with that admno in this school"});
  }
  const clubMember = new ClubMembers({
    name,
    school,
    admno,
    gender,
    age
  })
  await clubMember.save();
  res.status(201).json({message: "NEW MEMBER REGISTERED SUCCESSFULLY!",
    member:{
      name: clubMember.name,
      school: clubMember.school,
      admno: clubMember.admno,
      gender: clubMember.gender,
      age: clubMember.age
    }
  });

  } catch (err) {
    res.status(500).json({error: "server error", error: err.message
    });
  }
}

const getClubMembers = async (req, res) => {
  try {
    const clubMembers = await ClubMembers.find();
    if (clubMembers.length === 0){
      return res.status(404).json({message: "no members yet"});
    }
    res.status(200).json(clubMembers);
    
  } catch (error) {
    res.status(500).json({error: "server error"});
  }

}
const updateMember = async (req, res) => {
 try {
  const {id} = req.params;
  const {name, school, admno, gender, age } = req.body;
  const upDatedMember = await ClubMembers.findByIdAndUpdate(
    id, 
    {name,school, admno, gender, age },
    {new: true}
  );
  if (!upDatedMember) {
    return res.status(404).json({message: "Club Member not found"});
  }
  res.status(200).json({message: "Club Member updated successfully!"});
 } catch (error) {
  res.status(500).json({error:"server error", error});
 }
}

const deleteMember = async (req, res) => {
  try {
 const {id} = req.params;
  const deletedMember = await ClubMembers.findByIdAndDelete(id);
  if (!deletedMember){
    return res.status(404).json({message: "Club Member Not Found"});
  }
  res.status(204).json({message: "Club Member Deleted Successfully"});
  } catch (error) {
    res.status(500).json({error: "server error"});
  }
}
module.exports = {registerClubMembers, getClubMembers, updateMember, deleteMember};