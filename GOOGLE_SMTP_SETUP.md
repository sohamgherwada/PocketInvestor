# Google SMTP Setup Guide

This guide will help you set up Google SMTP to receive form submissions with file attachments from the register page.

## Step 1: Enable 2-Factor Authentication

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the steps to enable 2FA if not already enabled

## Step 2: Generate App Password

1. In your Google Account settings, go to "Security"
2. Under "Signing in to Google", click "App passwords"
3. You might need to sign in again
4. Select "Mail" as the app
5. Select "Other (Custom name)" as the device
6. Enter "PocketInvestor" as the name
7. Click "Generate"
8. **Copy the 16-character password** (you'll need this for the .env file)

## Step 3: Create Environment File

1. Copy the `env.example` file to `.env`:
   ```bash
   cp env.example .env
   ```

2. Edit the `.env` file with your credentials:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   TO_EMAIL=your-email@gmail.com
   PORT=3001
   ```

## Step 4: Start the Application

### Option 1: Run Both Frontend and Backend Together
```bash
npm run dev:full
```

### Option 2: Run Separately

Terminal 1 (Backend):
```bash
npm run server:dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

## Step 5: Test the Setup

1. Open your browser and go to `http://localhost:5173`
2. Navigate to the register page
3. Fill out the form and upload some files
4. Submit the form
5. Check your email for the notification with attachments

## Features

### ✅ What's Included:
- **File Attachments**: All uploaded files (logo, demo video, team video, founder photos/videos) are attached to the email
- **Rich HTML Email**: Beautifully formatted email with all form data
- **File Cleanup**: Uploaded files are automatically deleted after sending
- **Error Handling**: Proper error messages for debugging
- **File Validation**: Only image and video files are allowed
- **Size Limits**: 50MB file size limit per file

### 📧 Email Content:
- Startup details and introduction
- Problem and solution descriptions
- Team information and founder details
- Short, medium, and long-term goals
- All uploaded files as attachments
- Submission timestamp

## Troubleshooting

### Common Issues:

1. **"Authentication failed" error**
   - Make sure you're using an App Password, not your regular Gmail password
   - Verify 2FA is enabled on your Google account
   - Check that the App Password is correct (16 characters, no spaces)

2. **"Connection refused" error**
   - Make sure the backend server is running on port 3001
   - Check that the .env file exists and has correct values
   - Verify no other application is using port 3001

3. **Files not attaching**
   - Check the uploads folder permissions
   - Verify file size is under 50MB
   - Ensure files are valid image or video formats

4. **CORS errors**
   - Make sure the backend server is running
   - Check that the frontend is making requests to the correct port (3001)

### File Upload Limits:
- **Maximum file size**: 50MB per file
- **Allowed formats**: Images (jpg, png, gif, etc.) and Videos (mp4, mov, avi, etc.)
- **Total files**: Up to 10 founder photos and 10 founder videos

## Security Notes

- Never commit the `.env` file to version control
- The App Password is specific to this application
- Files are temporarily stored and automatically deleted
- All file uploads are validated before processing

## Production Deployment

For production deployment, you'll need to:
1. Set up environment variables on your hosting platform
2. Configure proper file storage (AWS S3, Google Cloud Storage, etc.)
3. Set up proper CORS policies
4. Use HTTPS for secure file uploads
5. Implement rate limiting and file size restrictions

## Support

If you encounter any issues:
1. Check the server console for error messages
2. Verify all environment variables are set correctly
3. Test with smaller files first
4. Check your Gmail account for any security alerts
