import { useState } from "react";
import TodoItem from "./TodoItem";
import PaginationButton from "./PaginationButton";
import { Draggable } from "@hello-pangea/dnd";

function CompletedTodos({ todos, onUndo, sortOrder, isDragDisabled }) {
    const [itemsToShow, setItemsToShow] = useState(10);

    const allCompleted = todos.filter(todo => todo.completed);

    const sorted = allCompleted.sort((a, b) => {
        const dateA = new Date(a.completedDate);
        const dateB = new Date(b.completedDate);

        if (sortOrder === 'asc') return dateA - dateB;
        if (sortOrder === 'desc') return dateB - dateA;
        return 0;
    });

    const todosToShow = sorted.slice(0, itemsToShow);

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
            {todosToShow.map((todo, index) => (
                <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                    isDragDisabled={isDragDisabled}
                >
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onAction={() => onUndo(todo.id)}
                                buttonClassName="btn btn-warning"
                                actionText="Undo"
                            />
                        </div>
                    )}
                </Draggable>
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