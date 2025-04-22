function TodoItem({ todo, onAction, actionText }) {
    return (
        <div className="todo-item">
            <p>{todo.title}</p>
            {todo.completed && (
                <p><strong>Completed at:</strong> {new Date(todo.completedDate).toLocaleString()}</p>
            )}
            <button onClick={() => onAction(todo.id)}>{actionText}</button>
        </div>
    );
}

export default TodoItem;