const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configure Multer for file uploads
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
        if (!fs.existsSync(DATA_FILE)) return [];
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    };

    // Helper to write data
    const writeData = (data) => {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    };

    // GET all writeups
    app.get('/api/writeups', (req, res) => {
        const writeups = readData();
        res.json(writeups);
    });

    // GET single writeup content
    app.get('/api/writeups/:id', (req, res) => {
        const { id } = req.params;
        const filePath = path.join(WRITEUPS_DIR, `${id}.md`);

        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            res.json({ content });
        } else {
            res.status(404).json({ error: 'Writeup not found' });
        }
    });

    // POST create/update writeup
    app.post('/api/writeups', (req, res) => {
        const { id, title, category, date, description, tags, featured, content } = req.body;
        let writeups = readData();

        // Update metadata
        const existingIndex = writeups.findIndex(w => w.id === id);
        const newEntry = { id, title, category, date, description, tags, featured };

        if (existingIndex >= 0) {
            writeups[existingIndex] = newEntry;
        } else {
            writeups.push(newEntry);
        }
        writeData(writeups);

        // Write content file
        const filePath = path.join(WRITEUPS_DIR, `${id}.md`);
        fs.writeFileSync(filePath, content);

        res.json({ success: true, writeup: newEntry });
    });

    // DELETE writeup
    app.delete('/api/writeups/:id', (req, res) => {
        const { id } = req.params;
        let writeups = readData();

        writeups = writeups.filter(w => w.id !== id);
        writeData(writeups);

        const filePath = path.join(WRITEUPS_DIR, `${id}.md`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({ success: true });
    });

    // Simple Login
    app.post('/api/login', (req, res) => {
        const { password } = req.body;
        if (password === 'admin123') { // Simple hardcoded password for now
            res.json({ success: true, token: 'admin-token' });
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    });

    // Upload Image
    app.post('/api/upload', upload.single('image'), (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Return the public URL
        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({ url: fileUrl });
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
