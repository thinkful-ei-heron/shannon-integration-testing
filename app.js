const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

app.get('/', (req,res) => {
  res.send('hi express');
});


app.listen(8000, () => {
  console.log('Server started on port 8000');
});