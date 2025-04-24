import { useState, useMemo } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

import UncompletedTodos from './UncompletedTodos';
import CompletedTodos from './CompletedTodos';
import FilterByUsername from './FilterByUsername';

function TodoContainer({ todos, setTodos, users, loggedInUser }) {
  const [uncompletedSortOrder, setUncompletedSortOrder] = useState('asc');
  const [completedSortOrder, setCompletedSortOrder] = useState('asc');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const filteredTodos = useMemo(() => {
    return selectedUserId
      ? todos.filter(todo => todo.userId === selectedUserId)
      : todos;
  }, [todos, selectedUserId]);

  const handleComplete = (id) => {
    if (!loggedInUser || loggedInUser.id === null) {
      alert("You must be logged into your account to complete your todos.");
      return;
    }

    const todoToComplete = todos.find(todo => todo.id === id);

    if (todoToComplete && todoToComplete.userId !== loggedInUser.id) {
      alert("You can only complete your own todos!");
      return;
    }

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: true, completedDate: Date.now() }
          : todo
      )
    );
  };

  const handleUndo = (id) => {
    if (!loggedInUser || loggedInUser.id === null) {
      alert("You must be logged into your account to uncomplete your todos.");
      return;
    }

    const todoToUncomplete = todos.find(todo => todo.id === id);
    if (todoToUncomplete && todoToUncomplete.userId !== loggedInUser.id) {
      alert("You can only uncomplete your own todos!");
      return;
    }

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: false, completedDate: null }
          : todo
      )
    );
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination)
      return;

    const draggedTodo = todos.find(todo => todo.id.toString() === draggableId);
    if (!draggedTodo)
      return;

    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === 'completed') {
        handleComplete(draggedTodo.id);
      } else if (destination.droppableId === 'uncompleted') {
        handleUndo(draggedTodo.id);
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-6 border-end pe-md-4 mb-4">
            <div className="row g-3 align-items-end mb-4">
              <div className="col-6">
                <FilterByUsername
                  setSelectedUserId={setSelectedUserId}
                  users={users}
                />
              </div>
              <div className="col-6">
                <select
                  className="form-select"
                  value={uncompletedSortOrder}
                  onChange={(e) => setUncompletedSortOrder(e.target.value)}
                >
                  <option value="asc">Title (asc)</option>
                  <option value="desc">Title (desc)</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-white rounded-4 shadow-sm">
              <h5 className="fw-semibold mb-3">Pending:</h5>
              <Droppable droppableId='uncompleted'>
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <UncompletedTodos
                      todos={filteredTodos}
                      onComplete={handleComplete}
                      sortOrder={uncompletedSortOrder}
                      isDragDisabled={false}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          <div className="col-12 col-md-6 ps-md-4">
            <div className="mb-4">
              <select
                className="form-select"
                value={completedSortOrder}
                onChange={(e) => setCompletedSortOrder(e.target.value)}
              >
                <option value="asc">Date (asc)</option>
                <option value="desc">Date (desc)</option>
              </select>
            </div>

            <div className="p-4 bg-white rounded-4 shadow-sm">
              <h5 className="fw-semibold mb-3">Completed:</h5>
              <Droppable droppableId='completed'>
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <CompletedTodos
                      todos={filteredTodos}
                      onUndo={handleUndo}
                      sortOrder={completedSortOrder}
                      isDragDisabled={false}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default TodoContainer;