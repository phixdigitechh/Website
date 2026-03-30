const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();

// Pathing calibration for Vercel's ephemeral filesystem
const BLOGS_FILE = path.join('/tmp', 'blogs.json');
const PORTFOLIO_FILE = path.join('/tmp', 'portfolio.json');

app.use(express.json());

// Initialize store if missing in /tmp
if (!fs.existsSync(BLOGS_FILE)) fs.writeFileSync(BLOGS_FILE, JSON.stringify([]));
if (!fs.existsSync(PORTFOLIO_FILE)) fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify([]));

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

module.exports = app;
