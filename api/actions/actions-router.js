const express = require('express');
const Action = require('./actions-model');
const { validateId } = require('./actions-middlware');
const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions);
        })
        .catch(next);
});
router.get('/:id', validateId, (req, res) => {
    res.json(req.action);
});

//***********************500 error middleware***********//
//eslint-disable-next-line
router.use((err, req, res, next) => {
    console.log(err.message); // delete after
    res.status(err.status || 500).json({
        message: err.message,
        devMessage: 'Something bad inside the projects router!'
    });
});

module.exports = router;
