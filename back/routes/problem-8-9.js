const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/8', async (req, res) => {
  const managersin = await prisma.branch.findMany({
    select: {
      managerSIN: true
    }
  });
  
  const earn5 = await prisma.employee.findMany({
    where: {
      salary: {
        gt: 50000
      }
    },

    select: {
      sin: true,
      firstName: true,
      lastName: true,
      salary: true,
      Branch_Employee_branchNumberToBranch: {
        select: {
          branchName: true
        }
      }
    }
  });

  const clean = earn5.map(e => ({
    sin: e.sin,
    firstName: e.firstName,
    lastName: e.lastName,
    salary: e.salary,
    branchName: e.Branch_Employee_branchNumberToBranch.branchName
  })); 

  const result = clean.filter(e => 
    managersin.some(e1 => 
      e1.managerSIN == e.sin));
  

  const resultNULL = clean.map(e => {
    if (!managersin.some(e1 => 
      e1.managerSIN == e.sin)) {
      return ({
        sin: e.sin,
        firstName: e.firstName,
        lastName: e.lastName,
        salary: e.salary,
        branchName: null
      })
    }
  });

  const result1 = result.sort((a, b) => {
    if (a.branchName > b.branchName) return -1;
    else if (a.branchName < b.branchName) return 1;
    else  return 0;
  });

  const result2 = resultNULL.sort((a, b) => {
    if (a.firstName < b.firstName) return -1;
    else if (a.firstName > b.firstName) return 1;
    else  return 0;
  });

  const final = result1.concat(result2);

  // res.send(managersin);
  res.send(final.slice(0, 10));
});

module.exports = router;