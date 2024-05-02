const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/15', async (req, res) => {
  const all = await prisma.customer.findMany({
    include: {
      Owns: {
        include: {
          Account: {
            include: {
              Branch: true
            }
          }
        }
      }
    }
  });

  const filter = all.filter(e => {
    const only4 = new Set( // 중복을 없애 준다.
      e.Owns.flatMap(owns => owns.Account.Branch.branchName)
    );
    return only4.size === 4;
  });

  const filter1 = filter.map(e => ({
    customerID: e.customerID,
    firstName: e.firstName,
    lastName: e.lastName
  }));

  const filter2 = filter1.sort((a, b) => {
    if (a.firstName < b.firstName) return -1;
    else if (a.firstName > b.firstName) return 1;
    else  return 0;
  });

  const filter3 = filter2.sort((a, b) => {
    if (a.lastName < b.lastName) return -1;
    else if (a.lastName > b.lastName) return 1;
    else  return 0;
  });

  res.send(filter3.slice(0, 10));
});
module.exports = router;