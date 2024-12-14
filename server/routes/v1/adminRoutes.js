const e = require('express');
const { adminSignup, adminlogin } = require('../../controllers/adminControllers');
const adminRouter = require('express').Router()


const router= e.Router();

router.post('/signup', adminSignup)
router.post('/login', adminlogin )
router.put('/reset-password')
router.put('/logout')
router.get('/profile')
router.put('/profile-update')
router.delete('/delete-account')

router.get('./check-admin')

module.exports = adminRouter;