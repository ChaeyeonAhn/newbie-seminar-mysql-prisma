const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/1', async (req, res) => {
  const answer = await prisma.customer.findMany({
    where: {
      income: {
        gte: 50000,
        lte: 60000
      }
    },
    select: {
      firstName: true,
      lastName: true,
      income: true
    },
    orderBy: [
      {
        income: 'desc'
      },
      {
        lastName: 'asc'
      },
      {
        firstName: 'asc'
      }
    ],
    take: 10
  });
  res.send(answer);
});

module.exports = router;