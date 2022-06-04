import React, { ReactElement } from 'react'
function VideoAside(): ReactElement {
    return (
        <div className='video-section'>
            <div className="container"> 
                <div className="row">
                    <div className="col-lg-6">
                        <div className="video-section-play">
                            <div className="video-section-play-inner" style={{ backgroundImage: `url('/img/metaverse-concept-collage.jpg')` }}>
                                <span className="play-button">
                                    <span className="material-icons">play_arrow</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="video-section-content">
                            <div className="video-section-header">
                                <h3 className="title">
                                    ميزات تيم وورك
                                </h3>
                            </div>
                            <div className="video-section-body">
                                <ul className="video-section-list">
                                    <li>
                                        <h4 className="title">
                                            <span className="material-icons">check_circle</span> هذا النص هو مثال لنص يمكن أن يستبدل
                                        </h4>
                                        <p className="text">
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق 
                                        </p>
                                    </li>
                                    <li>
                                        <h4 className="title">
                                            <span className="material-icons">check_circle</span> هذا النص هو مثال لنص يمكن أن يستبدل
                                        </h4>
                                        <p className="text">
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق 
                                        </p>
                                    </li>
                                    <li>
                                        <h4 className="title">
                                            <span className="material-icons">check_circle</span> هذا النص هو مثال لنص يمكن أن يستبدل
                                        </h4>
                                        <p className="text">
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق 
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoAside