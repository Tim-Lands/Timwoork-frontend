import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdLogout, MdOutlineAccountBalanceWallet, MdOutlineInventory2, MdOutlineShop2, MdOutlineShoppingCart } from 'react-icons/md'
import { FiSettings } from 'react-icons/fi'

function ProfileMenu() {
    return (
        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='nav-profile-list'>
            <Link href={`/`}>
                <a className="nav-profile-list-header">
                    <div className="nav-profile-list-header-img">
                        <Image src={`/avatar.png`} width={25} height={25} />
                    </div>
                    <div className="nav-profile-list-header-content">
                        <h4 className="title">عبد الحميد بومقواس</h4>
                    </div>
                </a>
            </Link>
            <div className="nav-profile-list-content">
                <ul className='list-profile-withicons'>
                    <li>
                        <Link href={`/`}>
                            <a>
                                <span className="circul-icon"><IoIosAddCircleOutline /></span>
                                إضافة خدمة جديدة
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/`}>
                            <a>
                                <span className="circul-icon"><MdOutlineAccountBalanceWallet /></span>
                                محفظتي
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/`}>
                            <a>
                                <span className="circul-icon"><MdOutlineInventory2 /></span>
                                خدماتي
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/`}>
                            <a>
                                <span className="circul-icon"><MdOutlineShoppingCart /></span>
                                مشترياتي
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/`}>
                            <a>
                                <span className="circul-icon"><MdOutlineShop2 /></span>
                                مبيعاتي
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/`}>
                            <a>
                                <span className="circul-icon"><FiSettings /></span>
                                الإعدادات
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/`}>
                            <a>
                                <span className="circul-icon"><MdLogout /></span>
                                تسجيل الخروج
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/`}>
                            <a>
                                <span className="circul-icon"><MdLogout /></span>
                                الخروج من جميع الأجهزة
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </motion.div>
    )
}

export default ProfileMenu