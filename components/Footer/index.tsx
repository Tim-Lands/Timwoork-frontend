import React from 'react'
//import Link from 'next/link'
import BottomFooter from './BottomFooter'
import WebsiteLinksFooter from './WebsiteLinksFooter'
import BlogFooter from './BlogFooter'
import CategoriesFooter from './CategoriesFooter'
import { Menu, Dropdown, Button } from 'antd';
function index() {

    const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://wa.me/+905365435281">
                <i className="fab fa-whatsapp fa-fw"></i>
                واتساب
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://t.me/TimWoork_customers_service">
                <i className="fab fa-telegram fa-fw"></i>
                تيليجرام
            </a>
          </Menu.Item>
        </Menu>
      );

    return (
        <>
            <footer className="app-footer" style={{position: 'relative'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <WebsiteLinksFooter />
                        </div>
                        <div className="col-lg-4">
                            <CategoriesFooter />
                        </div>
                        <div className="col-lg-4">
                            <BlogFooter />
                        </div>
                    </div>
                </div>
                <div className='shadow' style={{position: 'fixed', bottom: '3rem', left: '3rem', borderRadius: '50%'}}>
                    <Dropdown overlay={menu} placement="topCenter" arrow>
                        <Button style={{
                            width: '75px',
                            height: '75px',
                            borderRadius: '50%',
                            padding: '0',
                            color: '#475c80',
                            borderColor: '#475c80',
                        }}><i className="fa fa-comments fa-3x"></i></Button>
                    </Dropdown>
                </div>
            </footer>
            <BottomFooter />
        </>
    )
}

export default index
