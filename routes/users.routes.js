const router = require("express").Router();

const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares")

//* EXAMPLE of a route only for logged in users
router.get("/example-user-route", verifyToken, (req, res) => {
  console.log(req.payload) //! THIS WILL BE HIGHLY IMPORTANT FOR FUNCTIONALITIES THAT DEPEND ON THE PERSON MAKING THE REQUEST

  //examples
  // - creating documents and assigning the creator
  // - user checking or changing their own profile
  // - updating or delete a document and needing to verify that the owned matched the person doing the request

  res.send("accesing route only for logged in users")
})

//* EXAMPLE of a route only for admin, logged in users
router.get("/example-admin-route", verifyToken, verifyAdmin, (req, res) => {
  res.send("accesing route only for admins")
})

module.exports = router;