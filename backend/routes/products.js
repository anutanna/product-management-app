const express = require('express');
const router = express.Router();
const { Product } = require('../models'); // adjust path as needed
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, keyword } = req.query;
    const offset = (page - 1) * limit;

    const where = keyword
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${keyword}%` } },
            { description: { [Op.iLike]: `%${keyword}%` } },
          ],
        }
      : {};

    const order = sort
      ? [[sort.replace('-', ''), sort.startsWith('-') ? 'DESC' : 'ASC']]
      : [];

    const products = await Product.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
