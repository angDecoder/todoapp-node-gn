const { Router } = require('express');
const router = Router();
const todoValidators = require('./validators/todoValidators');
const todoController = require('./controllers/todoController');

router.post('/create', todoValidators.createItem, todoController.createItem);
router.get('/',todoValidators.getList,todoController.getList);
router.put('/:id',todoValidators.updateItem,todoController.updateItem);
router.delete('/:id',todoValidators.deleteItem,todoController.deleteItem);

module.exports = router;