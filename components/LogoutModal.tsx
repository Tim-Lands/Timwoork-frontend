import { Space } from 'antd'
import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import API from "../config";
import {  notification } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons'
import Cookies from "js-cookie";
import { message } from "antd";

function LogoutModal({ setIsLogoutModal }): ReactElement {
    const token = Cookies.get("token");
    const logout = async ()=>{
        try{
        const res = await API.post(
            "api/logout_all",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if(res.status==200){
            message.success('لقد تم تسجيل الخروج بنجاح')
              setIsLogoutModal(false)
          }
        }
        catch(error){
            
                notification.open({
                    message: 'حدث خطأ',
                    icon: <CloseCircleOutlined style={{ color: '#c21c1c' }} />,
                });
            
        }

    }
    return (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='modal-conferm'>
            <div className="modal-conferm-head">
                <h3 className="title">
                    رسالة تأكيد
                </h3>
            </div>
            <div className="modal-conferm-body">
                <p className="text">
                    هل أنت متأكد من أنك تريد تسجيل الخروج من جميع الأجهزة؟
                </p>
            </div>
            <div className="modal-conferm-footer">
                <Space>
                    <button className='btn butt-sm butt-green' onClick={logout}>نعم</button>
                    <button className='btn butt-sm butt-red-text' onClick={() => setIsLogoutModal(false)}>لا</button>
                </Space>
            </div>
        </motion.div>
    )
}

export default LogoutModal
LogoutModal.propTypes = {
    setIsLogoutModal: PropTypes.func,
};