// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model')
const { validateId, validateBody } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get().then(response => res.status(200).json(response)).catch(next);
});

router.get('/:id', validateId, async (req, res, next) => {
    Action.get(req.params.id).then(response => res.status(200).json(response)).catch(next);
});

router.post('/', validateBody, (req, res, next) => {
    Action.insert(req.body).then(response => res.status(201).json(response)).catch(next);
});

router.put('/:id', validateId, validateBody, (req, res, next) => {
    Action.update(req.params.id, req.body).then(response => res.status(201).json(response)).catch(next);
});

router.delete('/:id', validateId, async (req, res, next) => {
    Action.remove(req.params.id).then(() => res.status(200).json( {"message": "Deleted succesfully"} )).catch(next);
});

router.use((err, req, res, next) => res.status(500).json({ message: 'Error in the actions-router.'}));

module.exports = router;