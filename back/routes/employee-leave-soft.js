const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/leave/soft', async (req, res) => {
  try {
    const leave = await prisma.employee.update({
      where: {
        sin: 1 
        // employee/join 을 한 번 호출해야 db에 sin = 1이 생깁니다.
        // 만약 오류가 난다면 db에 sin = 1이 있는지 확인해주세요.
      },
      data: {
        disabled: 1
      }
    });
    console.log('Success!');

    res.send('안녕히 계세요 여러분! 전 이 세상의 모든 굴레와 속박을 벗어 던지고 제 행복을 찾아 떠납니다! 여러분도 행복하세요~~!');

  } catch (error) {
    console.error(' *** ERROR!:', error);
  }
});

module.exports = router;