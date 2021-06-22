import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ msg: 'hello world' });
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('bla');
});

export default router;