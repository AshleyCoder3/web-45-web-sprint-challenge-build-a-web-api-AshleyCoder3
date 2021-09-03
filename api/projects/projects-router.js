const express = require('express')
const Project = require('./projects-model')
const { validateId, validatePost, validateCompleted } = require('./projects-middleware')
const router = express.Router()

router.get('/projects', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})
router.get('/projects/:id', validateId, (req, res,) => {
    res.json(req.project)
})
router.post('/projects', validatePost, (req, res, next) => {
    Project.insert(req.body)
        .then(newProj => {
            res.json(newProj)
        })
        .catch(next)
})
router.put('/projects/:id', validateId, validatePost, validateCompleted, (req, res, next) => [
    Project.update(req.params.id, req.body)
        .then(editProj => {
            res.json(editProj)
        })
        .catch(next)
])
router.delete('/projects/:id', validateId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(() => {
            res.json({
                message: 'The project has been deleted'
            })
        })
        .catch(next)
})
router.get('/projects/:id/actions', validateId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(action => {
            res.json(action)
        })
        .catch(next)
})



//***********************500 error middleware***********//
//eslint-disable-next-line
router.use((err, req, res, next) => {
    console.log(err.message); // delete after
    res.status(err.status || 500).json({
        message: err.message,
        devMessage: 'Something bad inside the projects router!'
    });
});

module.exports = router
