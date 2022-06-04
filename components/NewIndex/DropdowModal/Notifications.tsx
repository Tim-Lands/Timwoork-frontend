import LastSeen from '@/components/LastSeen'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaBell, FaClock } from 'react-icons/fa'

function Notifications() {
  return (
    <div className='nav-popup-dropdown'>
        <div className="popup-dropdown-inner">
            <div className="popup-dropdown-header">
                <h4 className="title">
                 <FaBell />  الإشعارات 
                </h4>
            </div>
            <div className="popup-dropdown-body">
                <div className="popup-dropdown-content">
                    <ul className="popup-dropdown-content-list">
                        <li>
                            <Link href={`/`}>
                                <a className='new-popup-item'>
                                    <div className="new-popup-item-image">
                                        <Image src={`/avatar3.jpg`} width={50} height={50} alt={``} />
                                    </div>
                                    <div className="new-popup-item-content">
                                        <p className="text">قام فلان بن فلان بالتعليق على خدمتك <strong>اكتشف سوق تيم ورك للخدمات الالكترونية</strong></p>
                                        <p className="meta"><FaClock /> <LastSeen date={`2022-04-29T00:53:50.000000Z`} /></p>
                                    </div>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/`}>
                                <a className='new-popup-item'>
                                    <div className="new-popup-item-image">
                                        <Image src={`/avatar3.jpg`} width={50} height={50} alt={``} />
                                    </div>
                                    <div className="new-popup-item-content">
                                        <p className="text">قام فلان بن فلان بالتعليق على خدمتك <strong>اكتشف سوق تيم ورك للخدمات الالكترونية</strong></p>
                                        <p className="meta"><FaClock /> <LastSeen date={`2022-04-29T00:53:50.000000Z`} /></p>
                                    </div>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/`}>
                                <a className='new-popup-item'>
                                    <div className="new-popup-item-image">
                                        <Image src={`/avatar3.jpg`} width={50} height={50} alt={``} />
                                    </div>
                                    <div className="new-popup-item-content">
                                        <p className="text">قام فلان بن فلان بالتعليق على خدمتك <strong>اكتشف سوق تيم ورك للخدمات الالكترونية</strong></p>
                                        <p className="meta"><FaClock /> <LastSeen date={`2022-04-29T00:53:50.000000Z`} /></p>
                                    </div>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/`}>
                                <a className='new-popup-item'>
                                    <div className="new-popup-item-image">
                                        <Image src={`/avatar3.jpg`} width={50} height={50} alt={``} />
                                    </div>
                                    <div className="new-popup-item-content">
                                        <p className="text">قام فلان بن فلان بالتعليق على خدمتك <strong>اكتشف سوق تيم ورك للخدمات الالكترونية</strong></p>
                                        <p className="meta"><FaClock /> <LastSeen date={`2022-04-29T00:53:50.000000Z`} /></p>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="popup-dropdown-footer">
                <Link href={`/`}>
                    <a className='nav-see-more'>
                        مشاهدة جميع الإشعارات
                    </a>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Notifications