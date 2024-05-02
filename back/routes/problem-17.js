const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/17', async (req, res) => {
  const customer = await prisma.customer.findMany({
    include: {
      Owns: {
        include: {
          Account: true
        }
      }
    },
    where: {
      lastName: {
        startsWith: 'S',
        contains: 'e'
      }
    }
  });
  const filter = customer.filter(e => {
    const accNum = new Set(e.Owns.flatMap(o => o.accNumber));
    return accNum.size >= 3;
  });

  const result = filter.map(e => {
      const total = e.Owns.reduce((sum, acc) => {
        return sum + parseFloat(acc.Account.balance);
      }, 0);
  
      const average = total / e.Owns.length;
      return {
        customerID: e.customerID,
        firstName: e.firstName,
        lastName: e.lastName,
        'average account balance': average 
      };
    });

  res.send(result.sort((a, b) => a.customerID - b.customerID));
});
module.exports = router;