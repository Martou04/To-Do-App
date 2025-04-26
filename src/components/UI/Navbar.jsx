import { useState } from "react";
import LoginModal from "./LoginModal";

function Navbar({ users, loggedInUser, saveLoggedInUser, removeLoggedInUser }) {
    const [usernameInput, setUsernameInput] = useState('');
    const [showError, setShowError] = useState(false);

    const handleLogin = () => {
        const user = users.find(
            u => u.username.toLowerCase() === usernameInput.trim().toLowerCase()
        );

        if (user) {
            saveLoggedInUser(user);
            setUsernameInput('');
            setShowError(false);
        } else {
            setShowError(true);
        }
    };

    return (
        <>
            <nav className="navbar navbar-light bg-light px-4 mb-4">
                <span className="navbar-brand mb-0 h1">Todo App</span>
                {!loggedInUser
                    ? (
                        <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal"
                        >
                            Login
                        </button>
                    )
                    : (
                        <div className="d-flex gap-3 align-items-center">
                            <span className="fw-semibold">Welcome, {loggedInUser.name}</span>
                            <button className="btn btn-outline-danger btn-sm" onClick={removeLoggedInUser}>Logout</button>
                        </div>
                    )}
            </nav>

            <LoginModal
                usernameInput={usernameInput}
                setUsernameInput={setUsernameInput}
                handleLogin={handleLogin}
                showError={showError}
                setShowError={setShowError}
            />
        </>
    );
}

export default Navbar;
