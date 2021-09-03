const express = require('express');
const Action = require('./actions-model');
const { validateId, validateAction } = require('./actions-middlware');
const { validateCompleted } = require('../projects/projects-middleware');
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
router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
            res.json(newAction);
        })
        .catch(next);
});
router.put('/:id', validateId, validateAction, validateCompleted, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(editAction => {
            res.json(editAction);
        })
        .catch(next);
});
router.delete('/:id', validateId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(() => {
            res.json({
                message: 'The Action has been deleted'
            });
        })
        .catch(next);
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
