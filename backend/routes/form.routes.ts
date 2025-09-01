import { Router } from 'express';
import { generateForm, getFormById, getUserForms } from '../controllers/form.controller.js';

const router = Router();

// Generate a new form using AI
router.post('/generate', generateForm);

// Get a specific form by ID
router.get('/:id', getFormById);

// Get all forms for the logged-in user
router.get('/', getUserForms);

export default router;
