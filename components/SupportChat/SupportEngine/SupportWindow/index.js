import React, { useState } from "react"
import { styles } from "../styles";
import EmailForm from "./EmailForm";
import ChatEngine from "./ChatEngine";
import PropTypes from "prop-types";

const SupportWindow = ({ visible }) => {
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)

    return (
        <div
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{ opacity: visible ? '1' : '0' }
            }}
        >
            <EmailForm
                visible={user === null || chat === null}
                setUser={user => setUser(user)}
                setChat={chat => setChat(chat)}
            />

            <ChatEngine
                visible={user !== null && chat !== null}
                user={user}
                chat={chat}
            />
        </div>
    )
}
SupportWindow.propTypes = {
    visible: PropTypes.any,
  };
export default SupportWindow;
