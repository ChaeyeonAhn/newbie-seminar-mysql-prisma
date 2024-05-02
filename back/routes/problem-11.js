const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/11', async (req, res) => {
  const berlin = await prisma.employee.findMany({
    where: {
      Branch_Employee_branchNumberToBranch: {
        branchName: 'Berlin'
      }
    },
    select: {
      salary: true
    }
  });

  const min = berlin.reduce((min, current) => {
    const salary = current.salary;
    return salary < min ? salary : min;
  }, 10000000);

  const result = await prisma.employee.findMany({
    where: {
      AND: [
        {
          Branch_Employee_branchNumberToBranch: {
            branchName: 'Berlin'
          }
        },
        {
          salary: min
        }
      ]
    },
    select: {
      sin: true,
      firstName: true,
      lastName: true,
      salary: true
    }
  });

  res.send(result);

});

module.exports = router;