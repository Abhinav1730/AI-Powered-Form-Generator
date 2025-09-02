import { Router } from 'express';
import { generateForm, getFormById, getUserForms } from '../controllers/form.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { testGeminiConnection } from '../utils/gemini.js';

const router = Router();

// Test Gemini connection
router.get('/test-gemini', testGeminiConnection);

// Generate a new form using AI
router.post('/generate', authenticateToken, generateForm);

// Get a specific form by ID
 router.get('/:id', getFormById);

// Get all forms for the logged-in user
router.get('/', authenticateToken, getUserForms);

export default router;