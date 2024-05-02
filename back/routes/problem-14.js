const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/14', async (req, res) => {
  const moscow = await prisma.employee.findMany({
    where: {
      Branch_Employee_branchNumberToBranch: {
        branchName: 'Moscow'
      }
    }
  });

  const sum = moscow.reduce((inter, current) => {
    const salary = current.salary;
    return inter + salary;
  }, 0);

  res.send([{ 'sum of employees salaries': sum }]);
});

module.exports = router;