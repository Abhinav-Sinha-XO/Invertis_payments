const zod = require('zod')

const signupBody = zod.object({
  username:zod.string().email(),
  password:zod.string(),
  firstname:zod.string(),
  lastname:zod.string()

})

const signinBody = zod.object({
  username:zod.string().email(),
  password:zod.string()
})


const updateBody = zod.object({
  
  password:zod.string().optional(),
  firstname:zod.string().optional(),
  lastname:zod.string().optional()

})



module.exports = { signupBody, signinBody, updateBody }