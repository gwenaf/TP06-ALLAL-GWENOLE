import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

exports.getUser = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { password, ...rest } = user;
        res.json(rest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { email, address, phone } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const updated = await prisma.user.update({
            where: { id: userId },
            data: {
                email: email,
                address: address || null,
                phone: phone || null
            }
        });

        const { password, ...rest } = updated;
        res.json(rest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
