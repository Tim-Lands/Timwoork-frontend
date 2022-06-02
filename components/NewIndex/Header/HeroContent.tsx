import React from 'react'
import HeroContainer from './HeroContainer'
import Navbar from './Navbar'
function HeroContent() {
    return (
        <div className='hero-content'>
            <div className="container">
                <Navbar />
                <HeroContainer />
            </div>
        </div>
    )
}

export default HeroContent