 import Layout from '@/components/Layout/HomeLayout'
import React, { useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
//import './index.css';
import NoSsr from '@material-ui/core/NoSsr/NoSsr';
import axios from 'axios';
import Cookies from 'js-cookie';
import Unauthorized from '@/components/Unauthorized';

const REACT_APP_CHAT_ENGINE_ID = "ac320c2f-2637-48b3-879a-3fb1da5dbe03"; 
    const token = Cookies.get('token');
    const email = Cookies.get('_email');
    const username = Cookies.get('_username');
    const id = Cookies.get('_userID');
    const _secret = (email + id);
const Chats = () => {

    if (!token) return <Unauthorized />
    async function getChat() {
        try {
            const res = await axios.get('https://api.chatengine.io/users/me', {
                headers: {
                    "projectID": REACT_APP_CHAT_ENGINE_ID,
                    "user-name": username,
                    "user-secret": _secret,
                }
            })
            if (res.status === 200) {
                console.log(res);
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getChat();

    })

    //chat component
    return (
        <div className="chats-page">
            <NoSsr>
                <ChatEngine
                    height="calc(100vh - 66px)"
                    // project id from chat engine https://chatengine.io 
                    projectID={REACT_APP_CHAT_ENGINE_ID}
                    // user information
                    userName={username}
                    userSecret={_secret}
                />
            </NoSsr>
        </div>
    );

}
Chats.getLayout = function getLayout(page: any) {

    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default Chats;