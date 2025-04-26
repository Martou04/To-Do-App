import { useEffect } from 'react';

function LoginModal({ usernameInput, setUsernameInput, handleLogin, showError, setShowError }) {
    useEffect(() => {
        const modal = document.getElementById('loginModal');
        const handler = () => {
            setUsernameInput('');
            setShowError(false);
        };

        modal.addEventListener('hidden.bs.modal', handler);

        return () => {
            modal.removeEventListener('hidden.bs.modal', handler);
        };
    }, [setUsernameInput, setShowError]);


    return (
        <div
            className="modal fade"
            id="loginModal"
            tabIndex="-1"
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="loginModalLabel">Login</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="usernameInput" className="form-label">
                            Username:
                        </label>
                        <input
                            id="usernameInput"
                            type="text"
                            className={`form-control ${showError ? 'is-invalid' : ''}`}
                            placeholder="Enter username"
                            value={usernameInput}
                            onChange={e => setUsernameInput(e.target.value)}
                            autoFocus
                        />
                        {showError && (
                            <div className="invalid-feedback animate__animated animate__shakeX">
                                User not found. Please try again.
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
