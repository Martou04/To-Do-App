function FilterByUsername({ setSelectedUserId, users }) {
    return (
        <select
            className="form-select"
            onChange={(e) => setSelectedUserId(Number(e.target.value) || null)}
        >
            <option value="">All Users</option>
            {users.map(user => (
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
            ))}
        </select>
    );
}

export default FilterByUsername;