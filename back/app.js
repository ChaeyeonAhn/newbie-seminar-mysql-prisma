const express = require('express');
const app = express();
const port = 3000;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const problem1Router = require('./routes/problem-1');
const problem2Router = require('./routes/problem-2');
const problem3Router = require('./routes/problem-3');
const problem4Router = require('./routes/problem-4');
const problem5Router = require('./routes/problem-5');
const problem6Router = require('./routes/problem-6');
const problem7Router = require('./routes/problem-7');
const problem8_9Router = require('./routes/problem-8-9');

const employee1Router = require('./routes/employee-join');

app.use('/problem', problem1Router);
app.use('/problem', problem2Router);
app.use('/problem', problem3Router);
app.use('/problem', problem4Router);
app.use('/problem', problem5Router);
app.use('/problem', problem6Router);
app.use('/problem', problem7Router);
app.use('/problem', problem8_9Router);

app.use('/employee', employee1Router);

app.get('/', (req, res) => {
  res.send('chacha Assignment');
});

app.listen(port, () => {
  console.log(`서버 실행 : http://localhost:${port}`);
});