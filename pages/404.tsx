import React from 'react'
import Link from 'next/link'
import { BlurText } from "../src/components/blur-text"
import { Header } from "../src/components/header"

const Custom404: React.FC = () => {
    return (
        <div>
            <Header currentPage="home" />
            <br/>
            <br/>
            <br/>
            
            <div className="container">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <Link href="/">
                    Go back home
                </Link>
            </div>
        </div>
    )
}

export default Custom404
