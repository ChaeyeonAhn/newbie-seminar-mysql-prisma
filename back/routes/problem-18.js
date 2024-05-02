const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/18', async (req, res) => {
  
});

module.exports = router;