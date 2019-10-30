const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('hi express');
});

app.get('/sum', (req, res) => {
  const { a, b } = req.query;

  if(!a || !b){
    return res.status(400).send('value is needed for both a and b');
  }
  const numA= parseFloat(a);
  const numB=parseFloat(b);
  if (Number.isNaN(numA) || Number.isNaN(numB)){
    return res.status(400).send('values for a and b must b numbers');
  }

  if(numB === 0) {
    return res.status(400).send('b cannot be 0');
  }

  const answer = numA / numB;
  console.log(answer);
  return res.send(`${numA} divided by ${numB} is equal to: ${answer}`);
});



module.exports = app;