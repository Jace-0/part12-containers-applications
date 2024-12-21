const express = require('express');
const { getAsync } = require('../redis/index')
const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const addedTodos = await getAsync('added_todos')
    console.log('added todos count', addedTodos)
    res.json({ added_todos: parseInt(addedTodos || '0') })
  } catch (err) {
    console.error('Error fetching statistics:', err)
    res.json({ added_todos: 0 })
  }
});

module.exports = router;