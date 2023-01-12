// add middlewares here related to actions
const Action = require('./actions-model');

async function validateId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      res.status(404).json({ message: 'No action found with the given id' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

function validateBody(req, res, next) {
  const { description, project_id, notes, completed } = req.body;
  if (!description || !project_id || !notes) {
    res.status(400).json({ message: 'a description, project_id and notes fields are required' });
  } else if (description && description.length > 128) {
    res.status(400).json({ message: 'a description lenght should be up to 128 characters long' });
  } else {
    req.body = { description: description, project_id: project_id, notes: notes, completed: completed || false };
    next();
  }
};

module.exports = {
  validateId,
  validateBody
};
