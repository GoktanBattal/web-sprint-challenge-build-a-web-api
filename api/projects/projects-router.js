// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model')
const { validateId, validateBody, validateUpdateBody } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get().then(response => res.status(200).json(response)).catch(next);
});

router.get('/:id', validateId, async (req, res, next) => {
    Project.get(req.params.id).then(response => res.status(200).json(response)).catch(next);
});

router.post('/', validateBody, (req, res, next) => {
    Project.insert(req.body).then(response => res.status(201).json(response)).catch(next);
});

router.put('/:id', validateId, validateUpdateBody, (req, res, next) => {
    Project.update(req.params.id, req.body).then(response => res.status(201).json(response)).catch(next);
});

router.delete('/:id', validateId, async (req, res, next) => {
    Project.remove(req.params.id).then(() => res.status(200).json( {"message": "Deleted succesfully"} )).catch(next);
});

router.get('/:id/actions', validateId, (req, res, next) => {
    Project.getProjectActions(req.params.id).then(response => res.status(200).json(response)).catch(next);
});

router.use((err, req, res, next) => res.status(500).json({ message: 'Error in the projects-router.'}));

module.exports = router;