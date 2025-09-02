import { Router } from 'express';
import { signup, login, getProfile } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
const router = Router();
// POST /api/auth/signup
router.post('/signup', signup);
// POST /api/auth/login
router.post('/login', login);
// GET /api/auth/profile
router.get('/profile', authenticateToken, getProfile);
export default router;