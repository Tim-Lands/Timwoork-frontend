import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

function SearchResult() {
    return (
        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='new-search-list'>
            <div className="new-search-list-content">
                <ul className='list-search-items'>
                    <li>
                        <Link href={`/mypurchases`}>
                            <a>
                                <h4 className="title">هذا النص هو مثال لنص يمكن أن يستبدل في نفس</h4>
                                <div className="meta">
                                    <p className="text">
                                        <Image src={`/avatar.png`} width={38} height={38} /> 
                                        <span className="user-fullname">
                                            عبد الحميد بومقواس
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </motion.div>
    )
}

export default SearchResult