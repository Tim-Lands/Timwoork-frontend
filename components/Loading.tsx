function Loading() {
    return (
        <div className="page-loading-spinner" style={{ height: 300 }}>
            <div className="inner">
                <div className="spinner-border" style={{ width: 50, height: 50 }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loading
