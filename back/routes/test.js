const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/account', async (req, res) => {
  const accounts = await prisma.owns.findMany({
    include: {
      Customer: true
    }
  })
  res.send(accounts);

  
});

module.exports = router;