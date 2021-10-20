import React from 'react'

function StepOne() {
    return (
        <div className="row justify-content-md-center">
            <div className="col-md-9">
                <div className="timlands-step">
                    <div className="timlands-step-nav">
                        <ul className="list-step">
                            <li className="step-item active">
                                <div className="step-count">1</div>
                            </li>
                            <li className="step-item">
                                <div className="step-count">2</div>
                            </li>
                            <li className="step-item">
                                <div className="step-count">3</div>
                            </li>
                            <li className="step-item">
                                <div className="step-count">4</div>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="timlands-step-header">
                        <h3 className="title">Overview: Create Title</h3>
                    </div>
                    <div className="step-item-body">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat suscipit quia magni odit!</p>
                        <button className="btn butt-md butt-primary">Next Step</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepOne
