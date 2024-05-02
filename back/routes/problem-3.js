const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.get('/3', async (req, res) => {
  const butler = await prisma.customer.findMany({ // aggregate 를 꼭 써야
      where: {
        lastName: 'Butler'
      }
  });

  const max2 = butler.reduce((max, current) => {
    const income2 = current.income * 2;
    return income2 > max ? income2 : max;
  }, 0);

  const select = await prisma.customer.findMany({
    select: {
      firstName: true,
      lastName: true,
      income: true
    },
    orderBy: [
      {
        lastName: 'asc',
      },
      {
        firstName: 'asc',
      }
    ]
  })

  const gte = select.filter(e => (e.income > max2));
  const answer = gte.slice(0, 10);
  res.send(answer);
});

module.exports = router;