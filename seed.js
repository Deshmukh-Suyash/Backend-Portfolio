const mongoose = require('mongoose');
const { Skill, Project, Certification, Achievement } = require('./models');
require('dotenv').config();

const skillsData = [
    { name: "Java", icon: "FaJava" },
    { name: "C++", icon: "SiCplusplus" },
    { name: "DSA", icon: "FaCode" },
    { name: "Web Dev", icon: "FaLaptopCode" },
    { name: "React", icon: "FaCogs" },
    { name: "Node.js", icon: "FaServer" },
    { name: "Database", icon: "FaDatabase" },
    { name: "GitHub", icon: "FaGithub" },
    { name: "VS Code", icon: "VscVscode" }
];

const projectsData = [
    {
        title: "Codolio Portfolio",
        description: "My developer profile showcasing coding achievements and statistics across platforms.",
        link: "https://codolio.com/profile/suyash_545412",
        tags: ["React", "API Integration", "Profile"],
        image: ""
    },
    {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio built with React and Tailwind CSS featuring glassmorphism design.",
        link: "#",
        tags: ["React", "Tailwind CSS", "Framer Motion"],
        image: ""
    },
    {
        title: "Algorithm Visualizer",
        description: "Interactive visualization of sorting and pathfinding algorithms to understand DSA concepts.",
        link: "#",
        tags: ["Java", "Swing", "Algorithms"],
        image: ""
    }
];

const certificationsData = [
    {
        title: "Data Structure and Backend with Java",
        issuer: "TechnoHacks",
        date: "2024"
    },
    {
        title: "Introduction to Cloud Security",
        issuer: "CyberSecurity Org",
        date: "2024"
    }
];

const achievementsData = [
    { title: "DSA Solved", count: 150, suffix: "+", icon: "SiLeetcode" },
    { title: "LeetCode", count: 1400, suffix: "+", icon: "SiLeetcode" },
    { title: "CodeChef", count: 1200, suffix: "+", icon: "SiCodechef" }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
    .then(async () => {
        console.log('MongoDB Connected for Seeding');

        await Skill.deleteMany({});
        await Project.deleteMany({});
        await Certification.deleteMany({});
        await Achievement.deleteMany({});

        await Skill.insertMany(skillsData);
        await Project.insertMany(projectsData);
        await Certification.insertMany(certificationsData);
        await Achievement.insertMany(achievementsData);

        console.log('Database seeded successfully!');
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
