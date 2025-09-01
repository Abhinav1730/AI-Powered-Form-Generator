import { Router } from 'express';
import { submitForm, getFormSubmissions } from '../controllers/submission.controller.js';

const router = Router();

// Submit a form with responses and files
router.post('/:formId', submitForm);

// Get all submissions for a specific form
router.get('/:formId', getFormSubmissions);

export default router;
