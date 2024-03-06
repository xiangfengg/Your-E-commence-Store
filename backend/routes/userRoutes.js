import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect,admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.post for post request , router.route for multiple route for single path 
router.route('/')
.post(registerUser)
.get(protect ,admin ,getUsers);

router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.route('/profile')
  //the next() in the protect middleware allow it to proceed to the controller
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);


router.route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);



export default router;