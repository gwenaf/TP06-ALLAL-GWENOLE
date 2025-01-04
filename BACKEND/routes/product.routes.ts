import express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', getAllProducts);

router.post('/', authMiddleware, createProduct);

export default router
