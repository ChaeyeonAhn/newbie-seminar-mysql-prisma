const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/6', async (req, res) => {
  const answer = await prisma.account.findMany({
    select: {
      Branch: {
        select: {
          branchName: true
        }
      },
      accNumber: true,
      balance: true
    },
    where: {
      balance: {
        gt: '100000', // 여기에 문제가 있어서 대소비교가 맞게 되지 않음
      },
      Branch: {
        Employee_Branch_managerSINToEmployee: {
          firstName: 'Phillip',
          lastName: 'Edwards'
        }
      }        
    },
    orderBy: {
      accNumber: 'asc'
    },
    take: 10
  });
  res.send(answer);
});

module.exports = router;