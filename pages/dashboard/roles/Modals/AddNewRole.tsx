import React from 'react'
import PropTypes from "prop-types";

function AddNewRole({setIsModalHiddenHandle}) {
    return (
        <div>
            bhkshskhdssdk
            <button onClick={setIsModalHiddenHandle}></button>
        </div>
    )
}

export default AddNewRole
AddNewRole.propTypes = {
    setIsModalHiddenHandle: PropTypes.func,
};