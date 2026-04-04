import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const groupId = process.env.WHATSAPP_GROUP_ID;

app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './.wwebjs_auth'
    }),
    puppeteer: {
        headless: true,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above to log in to WhatsApp.');
});

client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
});

client.on('authenticated', () => {
    console.log('WhatsApp Authenticated!');
});

client.on('auth_failure', (msg) => {
    console.error('WhatsApp Authentication failure:', msg);
});

// Endpoint to send message
app.post('/send-message', async (req, res) => {
    const { title, subject, location, salary, contact, description } = req.body;

    if (!groupId) {
        return res.status(500).json({ error: 'WhatsApp Group ID not configured in .env' });
    }

    const message = `
📢 *New Tuition Posted!*

📌 *Title:* ${title}
📚 *Subject:* ${subject}
📍 *Location:* ${location}
💰 *Salary:* ${salary}
📞 *Contact:* ${contact}

📝 *Description:* 
${description}

---
_Sent via Tuition Portal Bridge_
    `.trim();

    try {
        await client.sendMessage(groupId, message);
        console.log('Message sent to WhatsApp Group');
        res.status(200).json({ success: true, message: 'WhatsApp alert sent successfully!' });
    } catch (error) {
        console.error('Failed to send WhatsApp message:', error);
        res.status(500).json({ success: false, error: 'Failed to send WhatsApp message' });
    }
});

client.initialize();

app.listen(port, () => {
    console.log(`WhatsApp Bridge Server running on http://localhost:${port}`);
});
