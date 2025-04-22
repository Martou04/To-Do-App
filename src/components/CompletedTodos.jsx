import { useState } from "react";
import TodoItem from "./TodoItem";
import PaginationButton from "./PaginationButton";

function CompletedTodos({ todos, setTodos, sortOrder }) {
    const [itemsToShow, setItemsToShow] = useState(10);

    const todoUndoHandler = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, completed: false, completedDate: null }
                    : todo
            )
        );
    }

    const filteredTodos = todos
        .filter(todo => todo.completed)
        .sort((a, b) => {
            const dateA = new Date(a.completedDate);
            const dateB = new Date(b.completedDate);

            if (sortOrder === 'asc') return dateA - dateB;
            if (sortOrder === 'desc') return dateB - dateA;
            return 0;
        })
        .slice(0, itemsToShow);

    const handleLoadMore = () => {
        setItemsToShow(prev => prev + 10);
    };

    const handelLoadLess = () => {
        setItemsToShow(prev => Math.max(prev - 10, 10));
    };

    const canLoadMore = todos.filter(todo => todo.completed).length > itemsToShow;
    const canLoadLess = itemsToShow > 10;

    return (
        <div className="completed-todos">
            {filteredTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onAction={todoUndoHandler}
                    actionText="Undo"
                />
            ))}

            <div className="d-flex justify-content-center mt-3">
                {canLoadMore && (
                    <PaginationButton
                        onAction={handleLoadMore}
                        actionText="Load More"
                    />
                )}

                {canLoadLess && (
                    <PaginationButton
                        onAction={handelLoadLess}
                        actionText="Load Less"
                    />
                )}
            </div>

        </div>
    )
}

export default CompletedTodos;