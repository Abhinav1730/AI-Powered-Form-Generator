import type { Request, Response } from 'express';
import { Submission } from '../models/submission.model.js';
import { Form } from '../models/form.model.js';
import { uploadFile } from '../utils/cloudinary.js';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
  files?: Array<{
    buffer: Buffer;
    fieldname: string;
    originalname: string;
    mimetype: string;
  }>;
}

export const submitForm = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { formId } = req.params;
    const { responses } = req.body;
    const files = req.files;
    
    if (!responses) {
      return res.status(400).json({ message: 'Form responses are required' });
    }

    // Check if form exists
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Upload files to Cloudinary if any
    const uploadedFileUrls: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const result = await uploadFile(file.buffer, 'form-submissions');
        uploadedFileUrls.push(result.secure_url);
      }
    }

    // Create submission
    const submission = await Submission.create({
      formId,
      data: responses,
      files: uploadedFileUrls,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: 'Form submitted successfully',
      submission: {
        id: submission._id,
        formId: submission.formId,
        createdAt: submission.createdAt,
      },
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Failed to submit form' });
  }
};

export const getFormSubmissions = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { formId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if form exists and belongs to user
    const form = await Form.findOne({ _id: formId, userId });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Get all submissions for this form
    const submissions = await Submission.find({ formId }).sort({ createdAt: -1 });

    res.json({
      submissions: submissions.map(submission => ({
        id: submission._id,
        data: submission.data,
        files: submission.files,
        createdAt: submission.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    res.status(500).json({ message: 'Failed to retrieve submissions' });
  }
};
