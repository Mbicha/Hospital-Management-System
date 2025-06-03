import auth from '../controllers/auth.js';
import express from 'express';

const router = express.Router();
const { signup, login, protect, logout } = auth;

router.route('/signup').post(signup);
router.route('/login').post(login);

router.use(protect);
router.route('/logout').get(logout);

export default router;