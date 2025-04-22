import { useState } from "react";
import TodoItem from "./TodoItem";
import PaginationButton from "./PaginationButton";

function UncompletedTodos({ todos, onComplete, sortOrder }) {
    const [itemsToShow, setItemsToShow] = useState(10);

    const filteredTodos = todos
        .filter(todo => !todo.completed)
        .sort((a, b) => {
            if (sortOrder === 'asc')
                return a.title.localeCompare(b.title)
            if (sortOrder === 'desc')
                return b.title.localeCompare(a.title);
            return 0;
        })
        .slice(0, itemsToShow);

    const handleLoadMore = () => {
        setItemsToShow(prev => prev + 10);
    };

    const handelLoadLess = () => {
        setItemsToShow(prev => Math.max(prev - 10, 10));
    };

    const canLoadMore = todos.filter(todo => !todo.completed).length > itemsToShow;
    const canLoadLess = itemsToShow > 10;

    return (
        <div className="uncompleted-todos">
            {filteredTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onAction={() => onComplete(todo.id)}
                    buttonClassName="btn btn-success"
                    actionText="Complete"
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

export default UncompletedTodos;