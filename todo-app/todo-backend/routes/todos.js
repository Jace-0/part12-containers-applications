const express = require('express');
const mongoose = require('mongoose');
const { Todo } = require('../mongo');
const { getAsync, setAsync } = require('../redis/index')
const router = express.Router();




/* GET todos listing. */
router.get('/', async (_, res) => {
  if (mongoose.connection.readyState !== 1) {
    console.error('MongoDB is not ready yet');
    return res.status(500).send('MongoDB is not connected');
  }

  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).send('Error fetching todos');
  }
});


router.get('/:id', async (req, res) => {
  const id = req.params.id
  const todo = await Todo.findById(id)
  res.status(200).send(todo)
})




/* POST todo to listing. */
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false
    })

    // Use the imported Redis functions
    const currentCount = await getAsync('added_todos')
    const newCount = currentCount ? parseInt(currentCount) + 1 : 1
    await setAsync('added_todos', newCount.toString())

    res.send(todo)
  } catch (err) {
    console.error('Error:', err)
    res.status(500).send(err.message)
  }
})

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
