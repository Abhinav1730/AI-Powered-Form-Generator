import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Test function to check available models
export const testGeminiConnection = async () => {
  try {
    // Try the newer model names first
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Hello, test message');
    const response = await result.response;
    console.log('Gemini connection successful with gemini-1.5-flash');
    return true;
  } catch (error) {
    console.error('Error with gemini-1.5-flash:', error);
    
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent('Hello, test message');
      const response = await result.response;
      console.log('Gemini connection successful with gemini-pro');
      return true;
    } catch (error2) {
      console.error('Error with gemini-pro:', error2);
      return false;
    }
  }
};

export const generateFormSchema = async (prompt: string): Promise<Record<string, any>> => {
  try {
    // Use the newer model name
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
    
    // Check if it's an API model error
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message.includes('models/')) {
      throw new Error('Gemini API model not available. Please check your API key and model configuration.');
    }
    
    throw new Error('Failed to generate form schema');
  }
};