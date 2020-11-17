// const express = require('express');
// const { readFileSync, writeFileSync } = require('fs');

// const path = process.env.TEST_JSON || './data/israel-cities.json';

// const app = express();
// module.exports = app;

// // Add ticket
// app.get('/api/v1/cities', async (req, res) => {
//   try {
//     const data = readFileSync(path);
//     const dataJson = JSON.parse(data);
//     // writeFileSync(path, `${JSON.stringify(newJson)}`);
//     res.send(dataJson);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

///

const express = require('express');

const app = express();
let requestID = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('../client/build/'));

// Logger that describes activity on the server
function logger(req, res, next) {
  console.log(
    `Request #${requestID}\nRequest fired: ${req.url}\nMethod: ${req.method}`
  );
  requestID += 1;
  next();
}

app.use(logger);
app.use('/api', require('./api'));

app.use('*', function (req, res) {
  res.sendStatus(404);
});

module.exports = app;
