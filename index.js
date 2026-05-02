require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const mongoose = require('mongoose');
const { Skill, Project, Certification, Achievement } = require('./models');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Portfolio Server is Running');
});

const verifyAdmin = (req, res, next) => {
    const adminPassword = process.env.ADMIN_PASSWORD || 'suyash123'; // Default password if not set in .env
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === `Bearer ${adminPassword}`) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized: Invalid admin password" });
    }
};

app.get('/api/skills', async (req, res) => {
    const skills = await Skill.find();
    res.json(skills);
});
app.post('/api/skills', verifyAdmin, async (req, res) => {
    const skill = new Skill(req.body);
    await skill.save();
    res.json(skill);
});
app.delete('/api/skills/:id', verifyAdmin, async (req, res) => {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});
app.post('/api/projects', verifyAdmin, async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
});
app.delete('/api/projects/:id', verifyAdmin, async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.get('/api/certifications', async (req, res) => {
    const certs = await Certification.find();
    res.json(certs);
});
app.post('/api/certifications', verifyAdmin, async (req, res) => {
    const cert = new Certification(req.body);
    await cert.save();
    res.json(cert);
});
app.delete('/api/certifications/:id', verifyAdmin, async (req, res) => {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.get('/api/achievements', async (req, res) => {
    const achievements = await Achievement.find();
    res.json(achievements);
});
app.post('/api/achievements', verifyAdmin, async (req, res) => {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.json(achievement);
});
app.delete('/api/achievements/:id', verifyAdmin, async (req, res) => {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.post('/api/contact', async (req, res) => {
    // ... (rest of contact logic if you want to keep it)
    res.status(200).json({ message: "Use EmailJS on frontend for better reliability without backend config." });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
