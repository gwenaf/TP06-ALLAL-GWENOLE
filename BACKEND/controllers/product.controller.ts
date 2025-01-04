const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting products' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = await prisma.product.create({
            data: { name, price: parseFloat(price) }
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product' });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
};
