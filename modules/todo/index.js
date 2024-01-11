const { Router } = require('express');
const router = Router();
const todoValidators = require('./validators/todoValidators');
const todoController = require('./controllers/todoController');
const authUser = require('../../validators/authValidators').authenticateUser;

router.post('/create', todoValidators.createItem,authUser, todoController.createItem);
router.get('/',todoValidators.getList,authUser,todoController.getList);
router.put('/:id',todoValidators.updateItem,authUser,todoController.updateItem);
router.delete('/:id',todoValidators.deleteItem,authUser,todoController.deleteItem);

module.exports = router;