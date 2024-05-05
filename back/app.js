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
const problem10Router = require('./routes/problem-10');
const problem11Router = require('./routes/problem-11');
const problem14Router = require('./routes/problem-14');
const problem15Router = require('./routes/problem-15');
const problem17Router = require('./routes/problem-17');
const problem18Router = require('./routes/problem-18');
const testRouter = require('./routes/test');

const employee1Router = require('./routes/employee-join');
const employee2Router = require('./routes/employee-leave');

const depositRouter = require('./routes/account-deposit');

app.use('/problem', problem1Router);
app.use('/problem', problem2Router);
app.use('/problem', problem3Router);
app.use('/problem', problem4Router);
app.use('/problem', problem5Router);
app.use('/problem', problem6Router);
app.use('/problem', problem7Router);
app.use('/problem', problem8_9Router);
app.use('/problem', problem10Router);
app.use('/problem', problem11Router);
app.use('/problem', problem14Router);
app.use('/problem', problem15Router);
app.use('/problem', problem17Router);
app.use('/problem', problem18Router);

app.use('/employee', employee1Router);
app.use('/employee', employee2Router);

app.use('/account', depositRouter);
app.use('/test', testRouter);




app.get('/', (req, res) => {
  res.send('chacha Assignment');
});

app.listen(port, () => {
  console.log(`서버 실행 : http://localhost:${port}`);
});