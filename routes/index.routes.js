const router = require("express").Router();

// ℹ️ Organize and connect all your route files here.

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./users.routes")
router.use("/users", userRouter)

module.exports = router;
