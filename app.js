const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('hi express');
});

app.get('/sum', (req, res) => {
  const { a, b } = req.query;

  if (!a || !b) {
    return res.status(400).send('value is needed for both a and b');
  }
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    return res.status(400).send('values for a and b must b numbers');
  }

  if (numB === 0) {
    return res.status(400).send('b cannot be 0');
  }

  const answer = numA / numB;
  console.log(answer);
  return res.send(`${numA} divided by ${numB} is equal to: ${answer}`);
});

app.get('/generate', (req, res) => {
  const { n } = req.query;

  if (!n) {
    return res.status(400).send('n is required');
  }
  const num = parseInt(n);

  if (Number.isNaN(num)) {
    return res.status(400).send('n must be a number');
  }
  const initial = Array(num)
    .fill(1)
    .map((_, i) => {
      return i + 1;
    });

  initial.forEach((item, i) => {
    let ran = Math.floor(Math.random() * num);
    let temp = initial[i];
    initial[i] = initial[ran];
    initial[ran] = temp;
  });

  res.json(initial);

});

function toRadians(deg) {
  return deg * (Math.PI / 180);
}

function toDegrees(rad) {
  return rad * (180 / Math.PI);
}

app.get('/midpoint', (req, res) => {
  const { lat1, lon1, lat2, lon2 } = req.query;

  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return res.status(400).send('Must have both latitude and longitude for two locations');
  }

  // for brevity the validation is skipped

  // convert to radians
  const rlat1 = toRadians(lat1);
  const rlon1 = toRadians(lon1);
  const rlat2 = toRadians(lat2);
  const rlon2 = toRadians(lon2);

  const bx = Math.cos(rlat2) * Math.cos(rlon2 - rlon1);
  const by = Math.cos(rlat2) * Math.sin(rlon2 - rlon1);

  const midLat = Math.atan2(
    Math.sin(rlat1) + Math.sin(rlat2),
    Math.sqrt(
      (Math.cos(rlat1) + bx)
      * (Math.cos(rlat1) + bx)
      + by * by
    )
  );
  const midLon = rlon1 + Math.atan2(by, Math.cos(rlat1) + bx);

  res.json({
    lat: toDegrees(midLat),
    lon: toDegrees(midLon)
  });

});


module.exports = app;