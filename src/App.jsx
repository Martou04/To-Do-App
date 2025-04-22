import { useState, useEffect } from 'react'
import TodoContainer from './components/TodoContainer';

function App() {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    return response.json();
                }),
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    return response.json();
                })
        ])
            .then(([todosData, usersData]) => {
                setTodos(todosData);
                setUsers(usersData);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message || "Something went wrong :(");
                setLoading(false);
            });
    }, [])

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center">Error: {error}</div>
        );
    }

    return (
        <TodoContainer todos={todos} setTodos={setTodos} users={users} />
    );
}

export default App
