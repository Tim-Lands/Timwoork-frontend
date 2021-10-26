import React, { ReactElement, useState } from 'react'
import PropTypes from "prop-types";
import { motion } from 'framer-motion';
import AddCredit from '../Modals/AddCredit';

function index({ isDarken, setIsDarkenHandle, setIsSidebarShowenHandle }: any): ReactElement {
    const [isModalShowen, setIsModalShowen] = useState(false)
    const setIsModalShowenHandle = () => {
        setIsModalShowen(true);
    }
    const setIsModalHiddenHandle = () => {
        setIsModalShowen(false);
    }
    return (
        <>
            {isModalShowen && <AddCredit setIsModalHiddenHandle={setIsModalHiddenHandle} />}
            <div className="dashboard-navbar">
                <div className="d-flex">
                    <ul className="nav auth-dashboard right-dash-nav">
                        <li className="dash-nav-item">
                            <div className="circular-item">
                                <motion.button onClick={setIsSidebarShowenHandle} whileTap={{ scale: 0.9 }} className="language-nav-butt circular-center small-size">
                                    <motion.i className="material-icons material-icons-outlined">menu</motion.i>
                                </motion.button>
                            </div>
                        </li>
                        <li className="dash-nav-item" dir="ltr">

                            <button dir="rtl" onClick={setIsModalShowenHandle} className="btn butt-sm butt-blue flex-center">
                                <span className="material-icons material-icons-outlined">add_circle_outline</span> شحن رصيدك
                            </button>
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
                        <li className="dash-nav-item me-1">
                            <motion.img src="/avatar.png" whileTap={{ scale: 0.9 }} onClick={setIsDarkenHandle} className="language-nav-butt circular-center semi-small-size"/>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default index
index.propTypes = {
    setIsDarkenHandle: PropTypes.func,
    setIsSidebarShowenHandle: PropTypes.func,
    isDarken: PropTypes.bool,
};