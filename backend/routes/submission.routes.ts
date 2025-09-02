import { Router } from 'express';
import multer from 'multer';
import { submitForm, getFormSubmissions } from '../controllers/submission.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/:formId', upload.any(), submitForm as any);
router.get('/:formId', authenticateToken, getFormSubmissions as any);

export default router;

