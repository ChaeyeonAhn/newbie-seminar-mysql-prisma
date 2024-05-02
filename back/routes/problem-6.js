const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/6', async (req, res) => {
  const phillip_branch = await prisma.account.findMany({
    where: {
      Branch: {
        Employee_Branch_managerSINToEmployee: {
          firstName: 'Phillip',
          lastName: 'Edwards'
        }
      }        
    },

    include: { // 필요한 애를 꼭 가져와 줘야 해
      Branch: {
        select: {
          branchName: true
        }
      }
    }
  });
  
  const filter_balance = phillip_branch.filter(a => parseFloat(a.balance) > 100000);
  const answer0 = filter_balance.map(e => ({
    branchName: e.Branch.branchName,
    accNumber: e.accNumber,
    balance: e.balance
  })).sort((a, b) => a.accNumber - b.accNumber);
  const answer = answer0.slice(0, 10);
  res.send(answer);
});

module.exports = router;