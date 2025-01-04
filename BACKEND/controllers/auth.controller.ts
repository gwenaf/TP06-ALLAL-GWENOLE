import e = require("express");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verification de l'utilisatteur
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        };

        // Verification du mot de passe
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid password' });
        };

        // Génération du token
        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({ token, message: 'Logged in sucessfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Verification de l'utilisateur
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        };

        // Cryptage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email,
                address: req.body.address || null,
                phone: req.body.phone || null
            }
        });

        res.status(201).json({ message: 'User created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};