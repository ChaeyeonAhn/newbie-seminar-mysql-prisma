const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/7', async (req, res) => {
  const Lon = await prisma.customer.findMany({
    where: {
      Owns: {
        some: {
          Account:{
            Branch: {
              branchName: 'London'
            }
          }
        }
      }
    },

    select: {
      Owns: true
    }
  });

  const lon = Lon.flatMap(e => e.Owns.map(o => ({customerID: o.customerID, accNumber: o.accNumber})));
  
  const nyNotLon = await prisma.customer.findMany({
    where: {
      AND: [
        {
        Owns: {
          some: {
            Account:{
              Branch: {
                branchName: 'New York'
              }
            }
          }
        }
        },
        {
          NOT: {
          Owns: {
            some: {
              Account:{
                Branch: {
                  branchName: 'London'
                }
              }
            }
          },
        }
      }
      ]
    },

    select: {
      Owns: true
    }
  });

  const nynotlon = nyNotLon.flatMap(e => e.Owns.map(o => ({customerID: o.customerID, accNumber: o.accNumber})));

  const filter = nynotlon.filter(e => 
    lon.some(l => (l.customerID != e.customerID) && (l.accNumber == e.accNumber)));

  const avoidID = filter.map(e => e.customerID);

  const finalIDs = await prisma.customer.findMany({
    where: {
      AND: [
        {
        Owns: {
          some: {
            Account:{
              Branch: {
                branchName: 'New York'
              }
            }
          }
        }
        },
        {
          NOT: {
          Owns: {
            some: {
              Account:{
                Branch: {
                  branchName: 'London'
                }
              }
            }
          },
        }
      },
      {
        NOT: {
          customerID: { 
            in: avoidID
          }
        }
      }
      ]
    },
    select: {
      customerID: true
    },
    orderBy: {
      customerID: 'asc'
    },
    take: 10
  });
  
  res.send(finalIDs);
});

module.exports = router;