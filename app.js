const express = require('express');
const app = express();
const port = 3000;

const problem1Router = require('./routes/problem-1');

app.use('/problem', problem1Router);

app.get('/', (req, res) => {
  res.send('Home');
});

app.listen(port, () => {
  console.log(`서버 실행 : http://localhost:${port}`);
});