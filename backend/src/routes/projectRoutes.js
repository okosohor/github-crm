const express = require('express');
const ProjectController = require('../controllers/projectController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/createOrUpdate', verifyToken, ProjectController.createOrUpdateProject);
router.get('/all', verifyToken, ProjectController.getAllProjects);

module.exports = router;
