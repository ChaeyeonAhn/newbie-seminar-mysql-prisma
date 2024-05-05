const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get(`/1/deposit`, async (req, res) => {
  try {
    const { firstName, lastName, accNumber, deposit } = req.body;
    const nameMatch = await prisma.owns.findMany({
      select: {
        Customer: {
          select: {
            customerID: true
          }
        }
      },
      where: {
        accNumber: accNumber,
        Customer: {
          firstName: firstName,
          lastName: lastName
        }
      }
    });
    const previous = await prisma.account.findOne({
      where: {
        accNumber: accNumber
      },
      select: {
        balance: true
      }
    });
    const new1 = previous + deposit;

    if (nameMatch) {
      const depositMoney = await prisma.account.update({
        where: {
          accNumber: accNumber
        },
        data: {
          balance: new1
        }
      });
      return res.send(depositMoney);
    }
  } catch (e) {
    return res.send(e);
  }
});

module.exports = router;