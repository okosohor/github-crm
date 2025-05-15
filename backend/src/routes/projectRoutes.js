const express = require('express');
const ProjectController = require('../controllers/projectController');

const router = express.Router();

// TODO: add midlware for auth

router.post('/create', ProjectController.createProject);

module.exports = router;
