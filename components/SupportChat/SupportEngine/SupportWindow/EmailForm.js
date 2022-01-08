import React, { useState } from "react"
import PropTypes from "prop-types";
import { styles } from "../styles"
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
import Avatar from '../Avatar'

const REACT_APP_CE_PROJECT_ID = "ac320c2f-2637-48b3-879a-3fb1da5dbe03";
const REACT_APP_CE_PRIVATE_KEY = "2805db84-87b8-4fef-bb94-7e3c5fd22b37"

const EmailForm = ({ setUser, setChat, visible }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    function getOrCreateUser(callback) {
        axios.put(
            'https://api.chatengine.io/users/',
            { username: email, email: email, secret: email },
            { headers: { "Private-Key": REACT_APP_CE_PRIVATE_KEY } }
        )
            .then(r => callback(r.data))
            .catch(e => console.log('Get or create user error', e))
    }

    function getOrCreateChat(callback) {
        axios.put(
            'https://api.chatengine.io/chats/',
            { usernames: [email, 'Timwoork Support'], is_direct_chat: true },
            {
                headers: {
                    "Project-ID": REACT_APP_CE_PROJECT_ID,
                    "User-Name": email,
                    "User-Secret": email,
                }
            }
        )
            .then(r => callback(r.data))
            .catch(e => console.log('Get or create chat error', e))

    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true)
        getOrCreateUser(
            user => {
                setUser && setUser(user)
                getOrCreateChat(chat => {
                    setLoading(false)
                    setChat && setChat(chat)
                })
            }
        )
    }

    return (
        <div
            style={{
                ...styles.emailFormWindow,
                ...{
                    height: visible ? '100%' : '0px',
                    opacity: visible ? '1' : '0'
                }
            }}
        >
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />
            </div>

            <div
                className='transition-5'
                style={{
                    ...styles.loadingDiv,
                    ...{
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '0.33' : '0',
                    }
                }}
            />
            <LoadingOutlined
                className='transition-5'
                style={{
                    ...styles.loadingIcon,
                    ...{
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '1' : '0',
                        fontSize: '82px',
                        top: 'calc(50% - 41px)',
                        left: 'calc(50% - 41px)',
                    }
                }}
            />

            <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                <Avatar
                    style={{
                        position: 'relative',
                        left: 'calc(50% - 44px)',
                        top: '10%',
                    }}
                />

                <div style={styles.topText}>
                    Welcome to Timwoork <br /> support 👋
                </div>

                <form
                    onSubmit={e => handleSubmit(e)}
                    style={{ position: 'relative', width: '100%', top: '19.75%' }}
                >
                    <input
                        placeholder='Your Email'
                        onChange={e => setEmail(e.target.value)}
                        style={styles.emailInput}
                    />
                </form>
            </div>
        </div>
    )
}
EmailForm.propTypes = {
    visible: PropTypes.any,
    setUser: PropTypes.func,
    setChat: PropTypes.func,
  };
export default EmailForm;