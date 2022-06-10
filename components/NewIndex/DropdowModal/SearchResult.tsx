import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

function SearchResult() {
    return (
        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='nav-profile-list'>
            <div className="nav-profile-list-content">
                <ul className='list-profile-withicons'>
                    <li>
                        <Link href={`/mypurchases`}>
                            <a>
                                <h4 className="title">هذا النص هو مثال لنص يمكن أن يستبدل في نفس</h4>
                                <div className="meta">
                                    <p className="text"></p>
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