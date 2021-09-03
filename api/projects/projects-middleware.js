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

module.exports = { validateId }
