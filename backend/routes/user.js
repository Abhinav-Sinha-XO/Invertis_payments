const express = require('express');
const { signupBody, signinBody, updateBody } = require('../zod');
const { User, Account } = require('../db');
require('dotenv/config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');

const router = express.Router();



//  *****SIGN UP***** //

router.post('/signup', async (req,res)=>{
  const {success} = signupBody.safeParse(req.body)
  if(!success){
    return res.status(400).json({
      message: "Email already taken / Incorrect inputs"

    })}
  const existingUser = await User.findOne({
    username:req.body.username}
  )  
  if(existingUser){
    return res.status(400).json({
      message: "Email already taken / Incorrect inputs" 
    })
  }
  const user = await User.create({
    username:req.body.username,
    password:req.body.password,
    firstname:req.body.firstname,
    lastname:req.body.lastname
  })

   
  const userId = user._id;
  if (!userId) {
  return res.status(400).json({
    message: "User ID is required for account creation"
  });
}
  await Account.create({userId:userId, balance:
    Math.random() *10000 +1
  })

  const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);
  return res.status(200).json({
    message:"User created successfully",
    token:token
  })


})
// *****SIGN IN ***** //
router.post('/signin', async (req,res)=>{
  const {success} = signinBody.safeParse(req.body)
  if(!success){
    return res.status(400).json({
      message: "Incorrect inputs"})
  }
  const user = await User.findOne({
    username:req.body.username,
    password:req.body.password
  })
  

  if(user){
    const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);
     
    res.json({
      token:token
    })
    return;
  }
  res.status(400).json({
      message: "Error while logging in"})    
})


// ****UPDATE INFO **** //
router.put('/', authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Error while updating information"
    });
  }
  const updatedUser = await User.updateOne({ _id: req.userId }, req.body);
  if (updatedUser.nModified === 0) {
    return res.status(400).json({
      message: "No changes made"
    });
  }
  res.json({
    message: "Updated successfully"
  });
});

// +++Get data+++
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    
    const users = await User.find({
      $or:[
        {firstname:{ "$regex": filter}},
        {lastname:{"$regex": filter}}
      ]
    })
    res.json({
      user: users.map(user=>({
        username:user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        _id:user._id
      }))
    })
})

module.exports = router;