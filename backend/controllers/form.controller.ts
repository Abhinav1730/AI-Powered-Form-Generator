import type { Request, Response } from 'express';
import { Form } from '../models/form.model.js';
import { generateFormSchema } from '../utils/gemini.js';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const generateForm = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { prompt } = req.body;
    const userId = req.user?.id;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const formSchema = await generateFormSchema(prompt);
    
    const form = await Form.create({
      userId,
      title: formSchema.title || 'Generated Form',
      formSchema,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: 'Form generated successfully',
      form: {
        id: form._id,
        title: form.title,
        formSchema: form.formSchema,
        createdAt: form.createdAt,
      },
    });
  } catch (error) {
    console.error('Error generating form:', error);
    res.status(500).json({ message: 'Failed to generate form' });
  }
};

export const getFormById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid form ID format' });
    }
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json({
      form: {
        id: form._id,
        title: form.title,
        formSchema: form.formSchema,
        createdAt: form.createdAt,
      },
    });
  } catch (error) {
    console.error('Error retrieving form:', error);
    res.status(500).json({ message: 'Failed to retrieve form' });
  }
};

export const getUserForms = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const forms = await Form.find({ userId }).sort({ createdAt: -1 });

    res.json({
      forms: forms.map(form => ({
        id: form._id,
        title: form.title,
        createdAt: form.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error retrieving user forms:', error);
    res.status(500).json({ message: 'Failed to retrieve forms' });
  }
};
