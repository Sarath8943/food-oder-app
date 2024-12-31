
const e = require('express');
const { userSignup, login, userProfile,checkUser, profileUpdate, userAccountDelete, userlogout, changePassword } = require('../../controllers/userControllers');
const { userAuth } = require('../../middlewares/userAuth');
const upload = require('../../middlewares/multer');


const router = e.Router();

router.post('/signup',  upload.single("profilePic"), userSignup)
router.post('/login', login)
router.put('/change-password',userAuth,changePassword)
router.get('/profile',userAuth, userProfile);
router.get('/logout', userAuth,userlogout)
router.put('/profile-update',userAuth,upload.single("profilePic"),profileUpdate)
router.delete('/delete-account',userAuth,userAccountDelete)

router.get('/check-user', userAuth,checkUser);

  const userRouter = router;

module.exports = userRouter;
