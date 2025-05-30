function TodoItem({ todo, loggedInUser, onAction, buttonClassName, actionText }) {
    return (
        <div className="todo-item card p-3 mb-3 shadow-sm rounded d-flex flex-row justify-content-between align-items-center">
            <div>
                <p className="mb-1 fw-bold">{todo.title}</p>
                {todo.completed && (
                    <p className="mb-0 text-muted">
                        <strong>Completed at: </strong>
                        {todo.completedDate
                            ? new Date(todo.completedDate).toLocaleString()
                            : "No completion date available"
                        }
                    </p>
                )}
            </div>

            {todo.userId === loggedInUser?.id && (
                <button
                    className={`${buttonClassName} ms-3`}
                    onClick={() => onAction(todo.id)}
                >
                    {actionText}
                </button>
            )}
        </div>
    );
}


export default TodoItem;