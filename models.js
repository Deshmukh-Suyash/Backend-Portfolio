const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true }, // Store icon key/string
});

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    link: String,
    tags: [String],
    image: String,
});

const certificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuer: String,
    date: String,
});

const achievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    count: Number,
    suffix: String,
    icon: String // Store icon key
});

module.exports = {
    Skill: mongoose.model('Skill', skillSchema),
    Project: mongoose.model('Project', projectSchema),
    Certification: mongoose.model('Certification', certificationSchema),
    Achievement: mongoose.model('Achievement', achievementSchema),
};
