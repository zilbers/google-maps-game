const { Router } = require('express');
const { readFileSync } = require('fs');

const path =
  'C:/Users/omri_/Documents/GitHub/google-maps-game/server/data/backup.json';

const router = Router();

//get all cities
router.get('/', async (req, res) => {
  try {
    const data = readFileSync(path);
    const dataJson = JSON.parse(data);
    res.send(dataJson.Sheet1);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
