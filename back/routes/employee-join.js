const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/join', async (req, res) => {

  try {
    const newUser = await prisma.employee.create({
      data: { // sin: 1은 이미 추가되어 있습니다. 다른 숫자로 테스트 해 보세요.
        sin: 1,
        firstName: 'chacha',
        lastName: 'Ahn',
        salary: 0,
        branchNumber: 1,
        disabled: 0
      }
    });
    console.log('Success!');
    res.send('이 팀은 미친듯이 일하는 일꾼들로 이루어진 광전사 설탕 노움 조합이다. 분위기에 적응하기는 쉽지 않지만 아주 화력이 좋은 강력한 조합인거 같다.');

  } catch (error) {
    console.error(' *** ERROR! Failed to add user:', error);
  }
});

module.exports = router;