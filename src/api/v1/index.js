import express from 'express';

var router = express.Router();

router.get('/', (req, res) => {
  res.json({foo:'bar'});
});

export default router;
