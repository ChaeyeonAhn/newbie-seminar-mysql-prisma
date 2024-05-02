const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/10', async (req, res) => {
  const helen = await prisma.customer.findMany({
    where: {
      firstName: 'Helen',
      lastName: 'Morgan'
    },
    select: {
      Owns: {
        select: {
          Account: {
            select: {
              branchNumber: true
            }
          }
        }
      }
    }
  });

  // Helen이 소유한 모든 지점 번호 추출
  const branchNumbers = helen.flatMap(e => e.Owns.map(owns => owns.Account.branchNumber));

  // 해당 지점들을 모두 소유하고 있는 고객 찾기
  const customers = await prisma.customer.findMany({
    where: {
      income: { 
        gt: 5000 
      } 
    }, 

    select: {
      Owns: {
        select: {
          Account: {
            select: {
              branchNumber: true
            }
          }
        }
      },
      customerID: true
    }
  });

  const customers_c = customers.map(e => ({
    customerID: e.customerID,
    owns: e.Owns
  }));

  res.send(customers_c);
});

module.exports = router;