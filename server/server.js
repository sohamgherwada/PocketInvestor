import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
  }
});

// Configure nodemailer with Google SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD // Use App Password, not regular password
    }
  });
};

// Email template
const createEmailTemplate = (formData, fileInfo) => {
  return `
    <h2>New Startup Registration - PocketInvestor</h2>
    
    <h3>Startup Details:</h3>
    <ul>
      <li><strong>Name:</strong> ${formData.name || 'Not provided'}</li>
      <li><strong>Number of Cofounders:</strong> ${formData.cofounders}</li>
      <li><strong>Submission Date:</strong> ${new Date().toLocaleString()}</li>
    </ul>

    <h3>Startup Introduction:</h3>
    <p>${formData.intro || 'Not provided'}</p>

    <h3>Problem Statement:</h3>
    <p>${formData.problem || 'Not provided'}</p>

    <h3>Solution:</h3>
    <p>${formData.solution || 'Not provided'}</p>

    <h3>Team Introduction:</h3>
    <p>${formData.team_intro || 'Not provided'}</p>

    <h3>Goals:</h3>
    <ul>
      <li><strong>Short-term (1-2 years):</strong> ${formData.goals?.short || 'Not provided'}</li>
      <li><strong>Medium-term (3-5 years):</strong> ${formData.goals?.medium || 'Not provided'}</li>
      <li><strong>Long-term (6-10 years):</strong> ${formData.goals?.long || 'Not provided'}</li>
    </ul>

    <h3>Founders Information:</h3>
    ${formData.founders?.map((founder, idx) => `
      <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc;">
        <h4>Founder ${idx + 1}</h4>
        <p><strong>What gets you out of bed:</strong> ${founder.why || 'Not provided'}</p>
        <p><strong>How did you meet cofounders:</strong> ${founder.meet || 'Not provided'}</p>
      </div>
    `).join('') || 'No founder information provided'}

    <h3>File Attachments:</h3>
    <ul>
      <li><strong>Logo:</strong> ${fileInfo.logo ? '✅ Uploaded' : '❌ Not provided'}</li>
      <li><strong>Demo Video:</strong> ${fileInfo.demo ? '✅ Uploaded' : '❌ Not provided'}</li>
      <li><strong>Team Video:</strong> ${fileInfo.team_video ? '✅ Uploaded' : '❌ Not provided'}</li>
    </ul>

    ${fileInfo.founders?.length > 0 ? `
    <h3>Founder Files:</h3>
    <ul>
      ${fileInfo.founders.map((founder, idx) => `
        <li>Founder ${idx + 1}: 
          ${founder.photo ? '✅ Photo uploaded' : '❌ No photo'} | 
          ${founder.video ? '✅ Video uploaded' : '❌ No video'}
        </li>
      `).join('')}
    </ul>
    ` : ''}

    <hr>
    <p><em>This email was sent from the PocketInvestor registration form.</em></p>
  `;
};

// API endpoint for sending emails
app.post('/api/send-email', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'demo', maxCount: 1 },
  { name: 'team_video', maxCount: 1 },
  { name: 'founder_photos', maxCount: 10 },
  { name: 'founder_videos', maxCount: 10 }
]), async (req, res) => {
  try {
    const formData = JSON.parse(req.body.formData);
    const files = req.files;

    // Prepare file information
    const fileInfo = {
      logo: files.logo ? files.logo[0] : null,
      demo: files.demo ? files.demo[0] : null,
      team_video: files.team_video ? files.team_video[0] : null,
      founders: []
    };

    // Process founder files
    if (files.founder_photos || files.founder_videos) {
      const founderCount = formData.founders?.length || 0;
      for (let i = 0; i < founderCount; i++) {
        fileInfo.founders.push({
          photo: files.founder_photos?.find(f => f.fieldname === `founder_${i}_photo`),
          video: files.founder_videos?.find(f => f.fieldname === `founder_${i}_video`)
        });
      }
    }

    // Create email content
    const htmlContent = createEmailTemplate(formData, fileInfo);

    // Prepare attachments
    const attachments = [];
    if (fileInfo.logo) {
      attachments.push({
        filename: fileInfo.logo.originalname,
        path: fileInfo.logo.path
      });
    }
    if (fileInfo.demo) {
      attachments.push({
        filename: fileInfo.demo.originalname,
        path: fileInfo.demo.path
      });
    }
    if (fileInfo.team_video) {
      attachments.push({
        filename: fileInfo.team_video.originalname,
        path: fileInfo.team_video.path
      });
    }

    // Add founder files
    fileInfo.founders.forEach((founder, idx) => {
      if (founder.photo) {
        attachments.push({
          filename: `founder_${idx + 1}_photo_${founder.photo.originalname}`,
          path: founder.photo.path
        });
      }
      if (founder.video) {
        attachments.push({
          filename: `founder_${idx + 1}_video_${founder.video.originalname}`,
          path: founder.video.path
        });
      }
    });

    // Send email
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.TO_EMAIL || process.env.GMAIL_USER,
      subject: `New Startup Registration: ${formData.name || 'Unnamed Startup'}`,
      html: htmlContent,
      attachments: attachments
    };

    await transporter.sendMail(mailOptions);

    // Clean up uploaded files after sending email
    const allFiles = Object.values(files).flat();
    allFiles.forEach(file => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    res.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email: ' + error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
