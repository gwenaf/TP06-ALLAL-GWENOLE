import express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../controllers/user.controller');

router.post('/get', getUser);

router.post('/update', updateUser);

export default router