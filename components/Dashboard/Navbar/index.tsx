import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import { motion } from 'framer-motion';

function index({ isDarken, setIsDarkenHandle }): ReactElement {
    return (
        <div className="dashboard-navbar">
            <div className="d-flex">
                <ul className="nav auth-dashboard right-dash-nav">
                    <li className="dash-nav-item">
                        <div className="circular-item">
                            <motion.button whileTap={{ scale: 0.9 }} className="language-nav-butt circular-center small-size">
                                <motion.i className="material-icons material-icons-outlined">notifications</motion.i>
                            </motion.button>
                        </div>
                    </li>
                </ul>
                <ul className="nav auth-dashboard left-dash-nav">
                    <li className="dash-nav-item">
                        <div className="circular-item">
                            <motion.button whileTap={{ scale: 0.9 }} onClick={setIsDarkenHandle} className="language-nav-butt circular-center small-size">
                                {isDarken ?
                                    <motion.i className="material-icons material-icons-outlined">light_mode</motion.i>
                                    :
                                    <motion.i className="material-icons material-icons-outlined">dark_mode</motion.i>
                                }
                            </motion.button>
                        </div>
                    </li>
                    <li className="dash-nav-item">
                        <motion.img src="/avatar.png" whileTap={{ scale: 0.9 }} onClick={setIsDarkenHandle} className="language-nav-butt circular-center semi-small-size"/>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default index
index.propTypes = {
    setIsDarkenHandle: PropTypes.func,
    isDarken: PropTypes.bool,
};