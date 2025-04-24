import { useState, useEffect } from 'react'
import TodoContainer from './components/TodoContainer';
import Navbar from './components/Navbar';

function App() {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const saveAppData = (todosData, usersData, loggedInUser) => {
        const appData = {
            todos: todosData,
            users: usersData,
            loggedInUser: loggedInUser,
        };
        localStorage.setItem('appData', JSON.stringify(appData));
    };

    const loadAppData = (forceReload = false) => {
        if (!forceReload) {
            const savedData = localStorage.getItem('appData');
            try {
                const parsed = JSON.parse(savedData);
                if (Array.isArray(parsed.todos) && parsed.todos.length > 0 &&
                    Array.isArray(parsed.users) && parsed.users.length > 0) {
                    setTodos(parsed.todos);
                    setUsers(parsed.users);
                    setLoggedInUser(parsed.loggedInUser || null);
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.error("Invalid JSON in localStorage:", e);
            }
        }

        localStorage.clear();
        setLoading(true);
        setError(null);

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
                setLoggedInUser(null);
                setLoading(false);
                saveAppData(todosData, usersData, null);
            })
            .catch(error => {
                setError(error.message || "Something went wrong :(");
                setLoading(false);
            });
    };

    const resetApp = () => {
        if (window.confirm("Are you sure you want to reset the app? This will clear all your data.")) {
            localStorage.clear();
            loadAppData(true);
        }
    };

    const handleLogin = (user) => {
        setLoggedInUser(user);
    }

    const handleLogout = () => {
        setLoggedInUser(null);
    }

    useEffect(() => {
        loadAppData();
    }, []);

    useEffect(() => {
        if (todos.length > 0 && users.length > 0) {
            saveAppData(todos, users, loggedInUser);
        }
    }, [todos, users, loggedInUser])

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
        <>
            <Navbar
                users={users}
                onLogin={handleLogin}
                onLogout={handleLogout}
                loggedInUser={loggedInUser}
            />
            <TodoContainer
                todos={todos}
                setTodos={setTodos}
                users={users}
                loggedInUser = {loggedInUser}
            />
            <div className="container my-3 d-flex justify-content-center">
                <button
                    className="btn btn-danger"
                    onClick={resetApp}
                >
                    Reset App
                </button>
            </div>
        </>
    );
}

export default App;
