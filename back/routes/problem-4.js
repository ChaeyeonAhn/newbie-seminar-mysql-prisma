const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.get('/4', async (req, res) => {
  const london = await prisma.owns.findMany(
    {
      where: {
        Account: {
          Branch: {
            branchName: 'London'
          }
        }
      }, 
      select: {
        customerID: true
      }
    }
  );

  const latveria = await prisma.owns.findMany(
    {
      where: {
        Account: {
          Branch: {
            branchName: 'Latveria'
          }
        }
      }, 
      select: {
        customerID: true
      }
    }
  );

  const both = london.filter(e => 
    latveria.some(e1 => e1.customerID == e.customerID)).map(e2 => e2.customerID);

  const answer = await prisma.customer.findMany({
    select: {
      customerID: true,
      income: true,
      Owns: {
        select: {
          accNumber: true,
          Account: {
            select: {
              branchNumber: true
            }
          }
        }
      }
    },
    where: {
      income: {
        gt: 80000
      },
      customerID: {
        in: both
      }
    }
  });

  const clean = answer.flatMap(e => e.Owns.map(
    o => ({
    customerID: e.customerID,
    income: e.income,
    accNumber: o.accNumber,
    branchNumber: o.Account.branchNumber,
  })));

  const inter = clean.sort((a, b) => a.accNumber - b.accNumber);

  const final = inter.sort((a, b) => a.customerID - b.customerID);

  res.send(final.slice(0, 10));
});

module.exports = router;