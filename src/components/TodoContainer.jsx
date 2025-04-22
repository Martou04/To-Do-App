import { useState, useMemo } from 'react';
import UncompletedTodos from './UncompletedTodos';
import CompletedTodos from './CompletedTodos';
import FilterByUsername from './FilterByUsername';

function TodoContainer({ todos, setTodos, users }) {
  const [uncompletedSortOrder, setUncompletedSortOrder] = useState('asc');
  const [completedSortOrder, setCompletedSortOrder] = useState('asc');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const filteredTodos = useMemo(() => {
    return selectedUserId
    ?todos.filter(todo => todo.userId === selectedUserId)
    :todos;
  }, [todos, selectedUserId]);

  return (
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
            <UncompletedTodos
              todos={filteredTodos}
              setTodos={setTodos}
              sortOrder={uncompletedSortOrder}
            />
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
            <CompletedTodos
              todos={filteredTodos}
              setTodos={setTodos}
              sortOrder={completedSortOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoContainer;