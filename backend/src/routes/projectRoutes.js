const express = require('express');
const ProjectController = require('../controllers/projectController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// TODO: add midlware for auth

router.post('/create', verifyToken, ProjectController.createProject);

module.exports = router;
