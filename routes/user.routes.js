const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");


// REGISTER USER
router.post("/register", userController.registerUser);
// LOGIN USER
router.post("/login", userController.loginUser);
// Delete Users
router.post("/deleteUser", userController.deleteUser);
//  verify user
router.get('/verify/:id', userController.verifyUser);
// request Forget password
router.post('/forgetpassword', userController.forgetPassword)
// change password
router.post('/changepassword/:userId', userController.changePassword)
// GET USER DATA
router.get('/:userId', userController.getUserDetail)
// UPDATE USER 
router.post('/update/:userId', userController.updateUserDetail)

module.exports = router;
