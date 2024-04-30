const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/1', (req, res) => {
  res.send('Problem 1 Page.');
});

module.exports = router;