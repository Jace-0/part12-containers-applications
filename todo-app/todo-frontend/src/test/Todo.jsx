const Todo = ({ todo, onDelete, onComplete }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
        <div>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
          <button onClick={() => onComplete(todo.id)}>
            {todo.done ? 'Undo' : 'Complete'}
          </button>
        </div>
      </div>
    );
  };
  
  export default Todo;