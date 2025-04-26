import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

import TodoItem from "./TodoItem";
import PaginationButton from "../UI/PaginationButton";

function UncompletedTodos({ todos, loggedInUser, onComplete, sortOrder, isDragDisabled }) {
    const [itemsToShow, setItemsToShow] = useState(10);

    const allUncompleted = todos.filter(todo => !todo.completed);

    const sorted = allUncompleted.sort((a, b) => {
        if (sortOrder === 'asc') return a.title.localeCompare(b.title);
        if (sortOrder === 'desc') return b.title.localeCompare(a.title);
        return 0;
    });

    const todosToShow = sorted.slice(0, itemsToShow);

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
                                loggedInUser={loggedInUser}
                                onAction={() => onComplete(todo.id)}
                                buttonClassName="btn btn-success"
                                actionText="Complete"
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

export default UncompletedTodos;