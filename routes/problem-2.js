const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/2', async (req, res) => {
  const prisma = new PrismaClient().$extends({
    result: {
      employee: {
        salary_diff: {
          needs: {
            Branch_Employee_branchNumberToBranch: {
              select: {
                Employee_Branch_managerSINToEmployee: {
                  select: {
                    salary: true
                  }
                }
              }
            },
            salary: true
          },
          compute(employee) {
            return { 
              select: {
                Branch_Employee_branchNumberToBranch: {
                  select: {
                    Employee_Branch_managerSINToEmployee: {
                      select: {
                        salary: true
                      }
                    }
                  }
                }
              } 
            }
          }
        }
      }
    }
  })

  const answer = await prisma.employee.findMany({
    // relationLoadStrategy: 'join',
    select: {
      sin: true,
      Branch_Employee_branchNumberToBranch: { // join 의 핵심!
        // alias 는 어떻게?
        select: {
          branchName: true
        },
      },
      salary: true,
      salary_diff: true
    },
    
    where: {
      OR: [ 
        {
          Branch_Employee_branchNumberToBranch: {
            branchName: 'London'
          }
        },
        {
          Branch_Employee_branchNumberToBranch: {
            branchName: 'Berlin'
          }
        }
      ]
    },
    take: 10
  });
    
  res.send(answer);
});

module.exports = router;