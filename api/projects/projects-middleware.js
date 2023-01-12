// add middlewares here related to projects
const Project = require('./projects-model');

async function validateId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'No project found with the given id' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateBody(req, res, next) {
  const { description, name, completed } = req.body;
  if (!description || !name) {
    res.status(400).json({ message: 'a description and a name fields required, also whil eupdating completed filed also required' });
  } else {
    req.body = { description: description, name: name, completed: completed || false };
    next();
  }
}
function validateUpdateBody(req, res, next) {
    const { description, name, completed } = req.body;
    if (!description || !name || !( completed === true || completed === false )) {
      res.status(400).json({ message: 'description, name and completed fields are required' });
    } else {
      req.body = { description: description, name: name, completed: completed };
      next();
    }
  }

module.exports = {
  validateId,
  validateBody,
  validateUpdateBody,
};
