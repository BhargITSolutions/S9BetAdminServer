import React from 'react'

function Footer() {
    return (
        <>

            <input type="hidden" id="cricketCount" />
            <input type="hidden" id="tennisCount" />
            <input type="hidden" id="soccerCount" />
            <div className="sweet-container">
                <div className="sweet-overlay" tabIndex={-1} />
                <div className="sweet-alert" style={{ display: "none" }} tabIndex={-1}>
                    <div className="sweet-icon sweet-error">
                        <span className="x-mark">
                            <span className="line left" />
                            <span className="line right" />
                        </span>
                    </div>
                    <div className="sweet-icon sweet-question">?</div>
                    <div className="sweet-icon sweet-warning">!</div>
                    <div className="sweet-icon sweet-info">i</div>
                    <div className="sweet-icon sweet-success">
                        <span className="line tip" />
                        <span className="line long" />
                        <div className="placeholder" />
                        <div className="fix" />
                    </div>
                    <img className="sweet-image" />
                    <h2>Title</h2>
                    <div className="sweet-content">Text</div>
                    <hr className="sweet-spacer" />
                    <button className="sweet-confirm">OK</button>
                    <button className="sweet-cancel">Cancel</button>
                </div>
            </div>

        </>
    )
}

export default Footer