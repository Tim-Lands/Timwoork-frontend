import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine'
const REACT_APP_CE_PROJECT_ID = "ac320c2f-2637-48b3-879a-3fb1da5dbe03";

const ChatEngine = ({ visible, user, chat }) => {
    const [showChat, setShowChat] = useState(false)
    const styles = {
        chatEngineWindow: {
            
        }
    }

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setShowChat(true)
            }, 500)
        }
    })

    return (
        <div
            className='transition-5'
            style={{
                ...styles.chatEngineWindow,
                ...{
                    height: visible ? '100%' : '0px',
                    zIndex: visible ? '100' : '0',
                    display:  visible ? 'block' :'none'
                }
            }}
        >
            {
                showChat &&
                <ChatEngineWrapper>
                    <Socket
                        projectID={REACT_APP_CE_PROJECT_ID}
                        userName={user.email}
                        userSecret={user.email}
                    />
                    <ChatFeed activeChat={chat.id} />
                </ChatEngineWrapper>
            }
        </div>
    )
}
ChatEngine.propTypes = {
    visible: PropTypes.any,
    user: PropTypes.any,
    chat: PropTypes.any,
  };
export default ChatEngine;
