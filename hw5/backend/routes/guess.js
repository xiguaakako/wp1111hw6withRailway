import express from 'express';
import {getNumber, genNumber} from '../core/getNumber';
const router = express.Router();

router.post('/start', (_, res) => {
    genNumber();
    res.json({msg: 'The game has started.'})
})

router.get('/guess', (req, res) => {
  const solution = getNumber();
  let numGuessed = req.query.number;
  if (1 <= numGuessed && numGuessed <= 100) {
    if (numGuessed < solution) res.json({msg: `Bigger`});
    else if (numGuessed > solution) res.json({msg: `Smaller`});
    else if (Math.abs(numGuessed - solution) < 0.01) res.json({msg: `Equal`});
  }
  else {
    res.status(406).send({msg: 'Not a legal number.'})  
  }
})

router.post('/restart', (_, res) => {
  genNumber();
  res.json({msg: 'The game has started.'})
});
export default router;