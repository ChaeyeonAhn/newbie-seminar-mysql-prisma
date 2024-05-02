const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/18', async (req, res) => {
  const account = await prisma.account.findMany({
    include: {
      Transactions: true
    },
    where: {
      Branch: {
        branchName: 'Berlin'
      }
    }
  });

  const filter = account.filter(e => {
    const count = e.Transactions.length;
    return count >= 10;
  });

  const result = filter.map(e => {
    const sum = e.Transactions.reduce((inter, acc) => {
      return inter + parseFloat(acc.amount);
    }, 0);

    return {
      accNumber: e.accNumber,
      balance: e.balance,
      sum: sum
    }
  });

  const sort = result.sort((a, b) => a.sum - b.sum);
  const final = sort.map(e => ({
    accNumber: e.accNumber,
    balance: e.balance,
    'sum of transaction amounts': e.sum
  }));

  // res.send(filter);
  res.send(final.slice(0, 10));

  
});

module.exports = router;