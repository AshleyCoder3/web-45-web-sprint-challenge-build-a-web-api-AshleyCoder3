const Action = require('./actions-model');

async function validateId(req, res, next) {
    try {
        const { id } = req.params;
        const actionId = await Action.get(id);
        if (actionId) {
            req.action = actionId;
            next();
        } else {
            next({
                message: 'action is not found',
                status: 404
            });
        }
    } catch (err) {
        next(err);
    }
}
function validateAction(req, res, next) {
    if (!req.body.notes ||
        !req.body.description ||
        !req.body.project_id) {
        next({
            message: 'Missing required fields name and description',
            status: 400
        });
    } else {
        next();
    }
}

module.exports = { validateId, validateAction };
