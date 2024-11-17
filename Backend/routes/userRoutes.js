const express = require('express');
const app = express();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signUP);
router.route('/login').post(authController.logIN);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').post(authController.resetPass);

router.use(authController.protect);

router.route('/updatePassword').post(authController.updatePassword);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
