const express = require('express');
const app = express();
const port = 3000;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const problem1Router = require('./routes/problem-1');
const problem2Router = require('./routes/problem-2');
const problem3Router = require('./routes/problem-3');

app.use('/problem', problem1Router);
app.use('/problem', problem2Router);
app.use('/problem', problem3Router);

app.get('/', (req, res) => {
  res.send('Home');
});

app.listen(port, () => {
  console.log(`서버 실행 : http://localhost:${port}`);
});