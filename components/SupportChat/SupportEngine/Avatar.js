import React, { useState } from "react";
import PropTypes from "prop-types";
import { styles } from './styles'

const Avatar = ({ style, onClick }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <div style={style}>
            <div 
                className='transition-3'
                style={{
                    ...styles.avatarHello,
                    ...{ opacity: hovered ? '1' : '0' }
                }}
            >
                Hey it&apos;s Roqaia 🤙
            </div>

            <div 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => onClick && onClick()}
                className='transition-3'
                style={{
                    ...styles.chatWithMeButton,
                    ...{ border: hovered ? '1px solid #FFFF00' : '4px solid #009d00' }
                }}
            />
        </div>
    )
}
Avatar.propTypes = {
    style: PropTypes.any,
    onClick: PropTypes.func,
};
export default Avatar;