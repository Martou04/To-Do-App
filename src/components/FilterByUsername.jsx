import { useState } from "react";

function FilterByUsername({ todos, setTodos, users }) {
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleFilter = (userId) => {
        setSelectedUserId(userId);
        setTodos(
            todos.filter(todo => !userId || todo.userId === selectedUserId)
        );
    }

    return (
        <select
            className="form-select"
            onChange={(e) => handleFilter(Number(e.target.value) || null)}
        >
            <option value="">All Users</option>
            {users.map(user => (
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
            ))}
        </select>
    )
}

export default FilterByUsername;