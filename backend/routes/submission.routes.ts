import { Router } from 'express';
import { submitForm, getFormSubmissions } from '../controllers/submission.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

// Submit a form with responses and files
router.post('/:formId', submitForm);

// Get all submissions for a specific form
router.get('/:formId', authenticateToken, getFormSubmissions);

export default router;
