import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Test email configuration
const testEmail = async () => {
  try {
    console.log('Testing Google SMTP configuration...');
    
    // Check if environment variables are set
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Environment variables not set. Please check your .env file.');
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    // Send test email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.TO_EMAIL || process.env.GMAIL_USER,
      subject: 'PocketInvestor SMTP Test',
      html: `
        <h2>SMTP Test Successful!</h2>
        <p>Your Google SMTP configuration is working correctly.</p>
        <p>You can now receive form submissions with file attachments.</p>
        <hr>
        <p><em>This is a test email from PocketInvestor.</em></p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Check your email inbox for the test message.');

  } catch (error) {
    console.error('❌ SMTP test failed:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure 2FA is enabled on your Google account');
    console.log('2. Verify you\'re using an App Password (not your regular password)');
    console.log('3. Check that your .env file has the correct values');
    console.log('4. Ensure GMAIL_USER and GMAIL_APP_PASSWORD are set');
  }
};

// Run the test
testEmail();
