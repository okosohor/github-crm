const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const userProjectController = require('../controllers/userProjectController');

const router = express.Router();

router.delete('/delete/:id', verifyToken, userProjectController.deleteProject);
router.delete('/delete', verifyToken, userProjectController.deleteAllProjects);

module.exports = router;
