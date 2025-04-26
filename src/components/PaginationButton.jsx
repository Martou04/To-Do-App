function PaginationButton({ actionText, onAction }) {
    return (
        <button className="btn btn-primary me-2" onClick={() => onAction()}>
            {actionText}
        </button>
    )
}

export default PaginationButton;