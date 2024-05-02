const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/leave', async (req, res) => {
  try {
    const newUser = await prisma.employee.delete({
      where: {
        sin: 1 
        // 아직 엔드포인트 호출을 하지 않으셨다면, db에 sin = 1이 있습니다. 
        // 만약 오류가 난다면 db에 sin = 1이 있는지 확인해주세요.
      }
    });
    console.log('Success!');

    res.send('안녕히 계세요 여러분! 전 이 세상의 모든 굴레와 속박을 벗어 던지고 제 행복을 찾아 떠납니다! 여러분도 행복하세요~~!');

  } catch (error) {
    console.error(' *** ERROR! Failed to add user:', error);
  }
});

module.exports = router;