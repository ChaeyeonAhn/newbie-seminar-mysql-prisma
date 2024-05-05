const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/withdraw', async (req, res) => {
  res.send('Success!');
});


router.post('/1/withdraw', async (req, res) => {
  try {
    const { firstName, lastName, accNumber, deposit } = req.body;
    
    const previous = await prisma.account.findOne({
      where: {
        Account: {
          Owns: {
            Customer: {
              firstName: 'Benjamin',
              lastName: 'Green'
            }
          }
        }
      },
      select: {
        balance: true
      }
    });
    if (previous < withdraw) return res.json({data: 'failed'});
    
    const new1 = previous - withdraw;
    console.log(new1);

    if ((firstName == 'Benjamin') && (lastName == 'Green')){
      const withdrawMoney = await prisma.account.update({
        where: {
          accNumber: accNumber
        },
        data: {
          balance: new1
        }
      });
      return res.json({data: new1});
    }
  } catch (e) {
    return res.send(e);
  }
});

module.exports = router;