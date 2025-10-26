import React from 'react'
import Link from 'next/link'
import { BlurText } from "../src/components/blur-text"
import { Header } from "../src/components/header"

const About: React.FC = () => {
    return (
        <div>
            <Header currentPage="home" />
            <br/>
            <br/>
            <br/>
            
            <div className="container">
                <h1>About</h1>
                <p>This page is under construction.</p>
            </div>
        </div>
    )
}

export default About
