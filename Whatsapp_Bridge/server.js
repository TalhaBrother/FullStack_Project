import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const groupId = String(process.env.WHATSAPP_GROUP_ID).split(',').map(id => id.trim());

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

// Get all WhatsApp groups
app.get('/get-groups', async (req, res) => {
    try {
        const chats = await client.getChats();
        const groups = chats
            .filter(chat => chat.isGroup)
            .map(group => ({
                id: group.id._serialized,   // ← this is your group ID
                name: group.name,
                participants: group.participants.length
            }));

        res.status(200).json({ success: true, groups });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// Endpoint to send message
// Endpoint to send message
app.post('/send-message', async (req, res) => {
    const { title, subject, location, salary, contact, description } = req.body;

    if (!groupId || groupId.length === 0) {
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

    // ✅ Loop through each group ID
    for (const id of groupId) {
        try {
            const chat = await client.getChatById(id);  // ✅ getChatById not sendMessage
            await chat.sendMessage(message);
            console.log(`✅ Message sent to group: ${id}`);
        } catch (error) {
            console.error(`❌ Failed for group ${id}:`, error.message);
        }
    }

    res.status(200).json({ success: true, message: 'WhatsApp alerts sent!' });
});

client.initialize();

app.listen(port, () => {
    console.log(`WhatsApp Bridge Server running on http://localhost:${port}`);
});
