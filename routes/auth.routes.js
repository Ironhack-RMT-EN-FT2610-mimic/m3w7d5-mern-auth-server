const bcrypt = require("bcryptjs")

const router = require("express").Router();

const User = require("../models/User.model")

// POST "/api/auth/signup" => receive the user credentials and create the user document.
router.post("/signup", async(req, res) => {
  console.log(req.body)
  const { email, password, username } = req.body
  //* Backend validations

  // the email and password should be provided
  if (!email || !password) {
    res.status(400).json({message: "Email and Password are required"})
    return // stop the route
  }

  // the password needs to be strong enough
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{6,20}$/
  if (passwordRegex.test(password) === false) {
    res.status(400).json({message: "Password not strong enough. Needs min 6 characters, max 20 characters, at least one uppercase, one lowercase and one number"})
    return
  }

  //* do on your own for the project
  // the email should have the correct format


  // the email should not exist in the database
  const foundUser = await User.findOne({email: email})
  if (foundUser) {
    res.status(400).json({message: "User already registered with that email"})
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const newUser = {
    email: email,
    password: passwordHash,
    username: username
  }

  await User.create(newUser)
  res.status(201).json({message: "User created"})

})

// POST "/api/auth/login" => receive the user credentials to authenticate the user. Also create and send the Auth Token.
router.post("/login", async(req, res) => {
  console.log(req.body)
  const { email, password } = req.body

  // the email and password should be provided
  if (!email || !password) {
    res.status(400).json({message: "Email and Password are required"})
    return // stop the route
  }

  // the user document should exist with that email
  const foundUser = await User.findOne({email: email})
  console.log(foundUser)
  if (!foundUser) {
    res.status(400).json({message: "User not found with that email"})
    return
  }

  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
  if (!isPasswordCorrect) {
    res.status(400).json({message: "Password not correct"})
    return
  }

  // We have finished the authentication of the user. The user IS who they claim to be.
  

  res.send("all good in login")
})

// GET "/api/auth/verify" => receiving and validating the Auth Token and sending the user info to the frontend.


module.exports = router;