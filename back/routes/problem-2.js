const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/2', async (req, res) => {
    const employees = await prisma.employee.findMany({
      where: {
        Branch_Employee_branchNumberToBranch: {
          branchName: {
            in: ['London', 'Berlin']
          }
        }
      },
      include: {
        Branch_Employee_branchNumberToBranch: {
          select: {
            branchName: true,
            Employee_Branch_managerSINToEmployee: {
              select: {
                salary: true
              }
            }
          }
        }
      }
    });
  
    const sort = employees.map(e => ({
      sin: e.sin,
      branchName: e.Branch_Employee_branchNumberToBranch.branchName,
      salary: e.salary,
      Salary_Diff: (e.Branch_Employee_branchNumberToBranch.Employee_Branch_managerSINToEmployee.salary - e.salary).toString()
    })).sort((a, b) => b.Salary_Diff - a.Salary_Diff);

    const answer = sort.slice(0, 10);

    res.send(answer);

});

module.exports = router;