const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.get('/3', async (req, res) => {
  const max = await prisma.customer.aggregate({ // aggregate 를 꼭 써야
      _max: {
        income: true
      }
    
  })


  const answer = await prisma.customer.findMany({
    select: {
      firstName: true,
      lastName: true,
      income: true
    },
    where: {
      income: {
        gte: max * 2
        }    
    },
    orderBy: [
      {
        lastName: 'asc',
      },
      {
        firstName: 'asc',
      }
    ],
    take: 10
  })

  res.send(answer);
});

module.exports = router;