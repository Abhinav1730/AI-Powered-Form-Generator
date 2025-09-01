import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateFormSchema = async (prompt: string): Promise<Record<string, any>> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const systemPrompt = `You are a form generation expert. Given a user's description, create a JSON schema for a form with appropriate fields, validation rules, and labels. Always return valid JSON only, no additional text.

The schema should include:
- fields: array of form fields with type, label, required, validation, etc.
- title: form title
- description: form description

Example schema structure:
{
  "title": "Contact Form",
  "description": "A simple contact form",
  "fields": [
    {
      "name": "firstName",
      "type": "text",
      "label": "First Name",
      "required": true,
      "validation": {
        "minLength": 2,
        "maxLength": 50
      }
    }
  ]
}`;

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: prompt }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }

    const schema = JSON.parse(jsonMatch[0]);
    return schema;
  } catch (error) {
    console.error('Error generating form schema:', error);
    throw new Error('Failed to generate form schema');
  }
};