const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3000;
const BLOGS_FILE = path.join(__dirname, 'blogs.json');
const PORTFOLIO_FILE = path.join(__dirname, 'portfolio.json');

app.use(express.json());
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure directories and files exist
if (!fs.existsSync(BLOGS_FILE)) fs.writeFileSync(BLOGS_FILE, JSON.stringify([]));
if (!fs.existsSync(PORTFOLIO_FILE)) fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify([]));
if (!fs.existsSync(path.join(__dirname, 'uploads'))) fs.mkdirSync(path.join(__dirname, 'uploads'));

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// API: Handle Image Upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No media detected." });
    res.json({ url: `/uploads/${req.file.filename}` });
});

// API: Blogs
app.get('/api/blogs', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(BLOGS_FILE, 'utf8')));
});
app.post('/api/blogs', (req, res) => {
    const newPost = req.body;
    let data = JSON.parse(fs.readFileSync(BLOGS_FILE, 'utf8'));
    const idx = data.findIndex(p => p.id === newPost.id);
    if (idx > -1) data[idx] = newPost; else data.push(newPost);
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});
app.delete('/api/blogs/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(BLOGS_FILE, 'utf8'));
    data = data.filter(p => p.id !== req.params.id);
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});

// API: Portfolio
app.get('/api/portfolio', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(PORTFOLIO_FILE, 'utf8')));
});
app.post('/api/portfolio', (req, res) => {
    const newProject = req.body;
    let data = JSON.parse(fs.readFileSync(PORTFOLIO_FILE, 'utf8'));
    const idx = data.findIndex(p => p.id === newProject.id);
    if (idx > -1) data[idx] = newProject; else data.push(newProject);
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});
app.delete('/api/portfolio/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(PORTFOLIO_FILE, 'utf8'));
    data = data.filter(p => p.id !== req.params.id);
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`\n👑 SOVEREIGN ENGINE ACTIVE 👑`);
    console.log(`Access Zenith: http://localhost:${PORT}`);
    console.log(`CMS Dashboard: http://localhost:${PORT}/cms.html\n`);
});
