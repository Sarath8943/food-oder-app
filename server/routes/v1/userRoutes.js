const e = require('express');
const { userSignup, login, userProfile,checkUser, profileUpdate, userAccountDelete, userlogout, changePassword } = require('../../controllers/userControllers');
const { userAuth } = require('../../middlewares/userAuth');
const userRouter = require('express').Router()

const router = e.Router();

router.post('/signup', userSignup)
router.post('/login', login)
router.put('/change-password',userAuth,changePassword)
router.get('/profile',userAuth, userProfile);
router.get('/logout', userAuth,userlogout)
router.put('/profile-update',userAuth, profileUpdate)
router.delete('/delete-account',userAuth,userAccountDelete)

router.get('/check-user', userAuth,checkUser);

module.exports = router;
