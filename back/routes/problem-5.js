const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.get('/5', async (req, res) => {
  const busNsav = await prisma.account.findMany({
    where: {
      type: {
        in: ['SAV', 'BUS']
      }
    },

    select: {
      Owns: {
        select: {
          customerID: true
        }
      }, 
      type: true,
      accNumber: true,
      balance: true
    }
  });

  const clean = busNsav.flatMap(e => e.Owns.map(e1 => ({
    customerID: e1.customerID,
    type: e.type,
    accNumber: e.accNumber,
    balance: e.balance
  })));

  const one = clean.sort((a, b) => a.accNumber - b.accNumber);
  const two = one.sort((a, b) => {
    if (a.type < b.type) return -1;
    else if (a.type > b.type) return 1;
    else return 0;
});
  const answer = two.sort((a, b) => a.customerID - b.customerID);
  // res.send(busNsav);
  res.send(answer.slice(0, 10));
});

module.exports = router;