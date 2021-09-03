const Project = require('./projects-model')

async function validateId(req, res, next) {
    try {
        const { id } = req.params
        const projId = await Project.get(id)
        if (projId) {
            req.project = projId
            next()
        } else {
            next({
                message: 'project is not found',
                status: 404
            })
        }
    } catch (err) {
        next(err)
    }
}
function validatePost(req, res, next) {
    if (!req.body.name ||
        !req.body.description) {
        next({
            message: 'Missing required fields name and description',
            status: 400
        })
    } else {
        next()
    }
}
function validateCompleted(req, res, next) {
    if (req.body.completed == null) {
        next({
            message: 'Missing required field completed:false',
            status: 400
        })
    } else {
        next()
    }
}

module.exports = { validateId, validatePost, validateCompleted }
