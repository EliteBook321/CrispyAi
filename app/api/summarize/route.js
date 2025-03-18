import axios from 'axios';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error processing file' });
      }

      const file = files.document[0]; // Extract the uploaded file
      if (!file || !file.filepath) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      try {
        const filePath = path.join(process.cwd(), file.filepath);
        const fileContent = fs.readFileSync(filePath, 'utf-8'); // Read file content

        // Send the content to Hugging Face for summarization
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
          { inputs: fileContent },
          {
            headers: {
              Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
            },
          }
        );

        // Explicitly typing the response data
        const data = response.data; // Here you can add checks or types if needed

        // Send the summarized text back to the frontend
        res.status(200).json({ summary: data[0].summary_text });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to summarize document' });
      }
    });
  }
}

