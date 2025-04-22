import UncompletedTodos from './UncompletedTodos';
import CompletedTodos from './CompletedTodos';
import FilterDropdown from './FilterDropdown';

function TodoContainer({ todos, setTodos }) {
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-6 border-end pe-md-4 mb-4">
          <div className="row g-3 align-items-end mb-4">
            <div className="col-6">
              <FilterDropdown todos={todos} setTodos={setTodos} />
            </div>
            <div className="col-6">
              <select className="form-select">
                <option>Sort: Title (asc)</option>
                <option>Title (desc)</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-white rounded-4 shadow-sm">
            <h5 className="fw-semibold mb-3">Pending:</h5>
            <UncompletedTodos todos={todos} setTodos={setTodos} />
          </div>
        </div>

        <div className="col-12 col-md-6 ps-md-4">
          <div className="mb-4">
            <select className="form-select">
              <option>Sort: Date (asc)</option>
              <option>Date (desc)</option>
            </select>
          </div>

          <div className="p-4 bg-white rounded-4 shadow-sm">
            <h5 className="fw-semibold mb-3">Completed:</h5>
            <CompletedTodos todos={todos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoContainer;
